import { NextRequest, NextResponse } from 'next/server'

// Best-effort, per-instance limiter. Good enough to blunt bots; swap for
// Upstash/Redis if abuse persists across serverless instances.
const hits = new Map<string, number[]>()

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  return (fwd?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown').trim()
}

function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (!v.some((t) => now - t < windowMs)) hits.delete(k)
    })
  }
  return recent.length > max
}

const URL_RE = /(https?:\/\/|www\.)/gi
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

/**
 * Returns a NextResponse to short-circuit with, or null if the submission looks legitimate.
 * Bots tripping the honeypot get a fake success so they don't adapt.
 */
export function checkSpam(
  request: NextRequest | Request,
  body: Record<string, unknown>,
  opts: { scope: string; max?: number; windowMs?: number } = { scope: 'form' }
): NextResponse | null {
  const ip = clientIp(request)
  if (rateLimited(`${opts.scope}:${ip}`, opts.max ?? 5, opts.windowMs ?? 10 * 60_000)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    )
  }

  // Honeypot: hidden field real users never fill
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  // Time trap: humans take more than 3s to fill a form
  const started = Number(body._t)
  if (started && Date.now() - started < 3000) {
    return NextResponse.json({ success: true })
  }

  if (typeof body.email === 'string' && !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Names with links are almost always spam; messages with several links too
  if (typeof body.name === 'string' && (URL_RE.test(body.name) || body.name.length > 100)) {
    return NextResponse.json({ success: true })
  }
  URL_RE.lastIndex = 0
  if (typeof body.message === 'string') {
    const links = body.message.match(URL_RE)?.length ?? 0
    if (links > 2 || body.message.length > 5000) {
      return NextResponse.json({ success: true })
    }
  }

  return null
}
