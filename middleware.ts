import { NextRequest, NextResponse } from 'next/server';

// Public endpoints that send email, call paid APIs, or write leads.
// Every POST to these needs: same-origin request, a valid Cloudflare Turnstile
// token (header `x-turnstile-token`), and to be under the per-IP rate limit.
const PROTECTED_API = [
  '/api/anniversary',
  '/api/build-sheet/subscribe',
  '/api/chat',
  '/api/claim-offer',
  '/api/contact',
  '/api/diagnostic/send-report',
  '/api/diagnostic/submit',
  '/api/founder-scorecard/subscribe',
  '/api/funding',
  '/api/market-fit/send-report',
  '/api/mediabrain/waitlist',
  '/api/quiz/invite',
  '/api/quiz/submit',
  '/api/quote-builder/enquiry',
  '/api/repackage',
  '/api/save-contact',
  '/api/send-email',
  '/api/send-followup',
  '/api/vanguard/apply',
];

const hits = new Map<string, number[]>();
function rateLimited(ip: string, max = 20, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    });
  }
  return recent.length > max;
}

function block(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

async function guardApi(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.nextUrl.host;
  const source = request.headers.get('origin') || request.headers.get('referer');
  let sourceHost = '';
  try {
    sourceHost = source ? new URL(source).host : '';
  } catch {}
  if (!sourceHost || sourceHost !== host) {
    return block(403, 'Please submit from the Bloop website.');
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) return block(429, 'Too many requests. Please try again later.');

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = request.headers.get('x-turnstile-token');
    if (!token) return block(403, 'Verification failed. Please refresh and try again.');
    try {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      });
      const data = await res.json();
      if (!data.success) return block(403, 'Verification failed. Please refresh and try again.');
    } catch {
      return block(503, 'Verification unavailable. Please try again.');
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('TURNSTILE_SECRET_KEY is not set: bot challenge is NOT enforced');
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    if (request.method === 'POST' && PROTECTED_API.some((p) => pathname === p)) {
      const blocked = await guardApi(request);
      if (blocked) return blocked;
    }
    return NextResponse.next();
  }

  const ref = searchParams.get('ref');
  const response = NextResponse.next();

  if (ref) {
    // Store the partner code for 90 days (non-httpOnly so the client tracker can read it)
    response.cookies.set('ref_code', ref, {
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Page routes plus API routes; skip static assets and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
