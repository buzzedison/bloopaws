import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import crypto from 'crypto'
import { HIGH_INTENT_TIERS } from '../../lib/leadQualify'

const resend = new Resend(process.env.RESEND_API_KEY)
const STRIDE_API_KEY = process.env.STRIDE_API_KEY!
const STRIDE_BASE = process.env.STRIDE_BASE_URL || 'https://strideos.cloud/api/v1'
const QUALIFY_SECRET = process.env.QUALIFY_SECRET || 'bloop-qualify-secret'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bloopglobal.com'
const CALENDLY_URL = 'https://calendly.com/bloopglobal/discovery'

async function stridePost(path: string, body: object) {
  const res = await fetch(`${STRIDE_BASE}${path}`, {
    method: 'POST',
    headers: { 'X-API-Key': STRIDE_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json().catch(() => ({}))
}

async function stridePatch(path: string, body: object) {
  const res = await fetch(`${STRIDE_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'X-API-Key': STRIDE_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json().catch(() => ({}))
}

function verifyToken(email: string, question: string, answer: string, token: string): boolean {
  const expected = crypto
    .createHmac('sha256', QUALIFY_SECRET)
    .update(`${email}:${question}:${answer}`)
    .digest('hex')
    .slice(0, 16)
  return expected === token
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email   = searchParams.get('email') || ''
  const question = searchParams.get('q') || ''
  const answer  = searchParams.get('a') || ''
  const token   = searchParams.get('token') || ''

  // Verify HMAC token to prevent spoofing
  if (!email || !question || !answer || !verifyToken(email, question, answer, token)) {
    return NextResponse.redirect(`${BASE_URL}/?qualify=invalid`)
  }

  // ─── Update Stride contact with qualifier answer ──────────────────
  try {
    // Find contact by email
    const searchRes = await fetch(
      `${STRIDE_BASE}/contacts?email=${encodeURIComponent(email)}`,
      { headers: { 'X-API-Key': STRIDE_API_KEY } }
    )
    const searchData = await searchRes.json().catch(() => ({}))
    const contact = searchData?.data?.[0]

    if (contact?.id) {
      // Update custom fields with qualifier answer
      const fieldKey = `qualify_${question}`
      await stridePatch(`/contacts/${contact.id}`, {
        custom_fields: { [fieldKey]: answer },
      })

      // Add a note so team can see it in timeline
      await stridePost('/activities', {
        type: 'note',
        subject: `Qualifier: ${question} → ${answer}`,
        notes: `Lead answered qualifying question.\nQuestion: ${question}\nAnswer: ${answer}`,
        contact_id: contact.id,
        status: 'completed',
      })
    }
  } catch (err) {
    console.error('Stride qualify update failed:', err)
  }

  // ─── Send internal Slack/Discord-style alert ──────────────────────
  await resend.emails.send({
    from: 'Bloop Qualifier <noreply@updates.bloopglobal.com>',
    to: 'ask@bloopglobal.com',
    subject: `📋 Qualifier answered: ${email} — ${question}: ${answer}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a2e;">
        <div style="background: #1a1a2e; padding: 20px 28px;">
          <h3 style="color: #dc2626; margin: 0; font-size: 16px;">Qualifying answer received</h3>
        </div>
        <div style="padding: 24px 28px; border: 1px solid #e0e0e0;">
          <table style="font-size: 14px; width: 100%;">
            <tr><td style="color:#999; padding: 6px 0; width: 100px;">Email</td><td>${email}</td></tr>
            <tr><td style="color:#999; padding: 6px 0;">Question</td><td>${question}</td></tr>
            <tr><td style="color:#999; padding: 6px 0;">Answer</td><td><strong>${answer}</strong></td></tr>
          </table>
        </div>
      </div>
    `,
  }).catch(console.error)

  // ─── Route based on answer ────────────────────────────────────────

  // Budget: high intent → Calendly
  if (question === 'budget' && HIGH_INTENT_TIERS.has(answer)) {
    // Send a "book your call" email
    await resend.emails.send({
      from: 'Dennis at Bloop <dennis@updates.bloopglobal.com>',
      to: email,
      subject: "Let's get you booked in",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #1a1a2e; padding: 32px 40px;">
            <h2 style="color: #dc2626; margin: 0; font-size: 20px;">Bloop Global</h2>
          </div>
          <div style="padding: 40px;">
            <p style="font-size: 16px; margin-top: 0;">Great — sounds like you're ready to move.</p>
            <p style="font-size: 15px; line-height: 1.7; color: #444;">
              Pick a time that works for you and we'll jump on a 45-minute discovery call.
              No commitment, no hard sell — just a real conversation about what you're building.
            </p>
            <a href="${CALENDLY_URL}" style="display: inline-block; margin-top: 16px; background: #dc2626; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
              Book your free discovery call →
            </a>
            <p style="font-size: 13px; color: #aaa; margin-top: 16px;">45 minutes · No commitment</p>
          </div>
          <div style="background: #f7f3ee; padding: 20px 40px; font-size: 12px; color: #aaa;">
            Bloop Global LLC · bloopglobal.com
          </div>
        </div>
      `,
    }).catch(console.error)

    return NextResponse.redirect(CALENDLY_URL)
  }

  // Budget: low/exploring → nurture page
  if (question === 'budget') {
    await resend.emails.send({
      from: 'Dennis at Bloop <dennis@updates.bloopglobal.com>',
      to: email,
      subject: 'Here\'s how we work with early-stage founders',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #1a1a2e; padding: 32px 40px;">
            <h2 style="color: #dc2626; margin: 0; font-size: 20px;">Bloop Global</h2>
          </div>
          <div style="padding: 40px;">
            <p style="font-size: 16px; margin-top: 0;">No problem at all — budget is always a consideration.</p>
            <p style="font-size: 15px; line-height: 1.7; color: #444;">
              Here's how we typically help founders at your stage:
            </p>
            <ul style="font-size: 15px; line-height: 1.9; color: #444;">
              <li>We scope MVPs to fit real budgets — not dream budgets</li>
              <li>We offer phased builds so you can start lean and grow</li>
              <li>We help you figure out what to build first vs. what to skip</li>
            </ul>
            <p style="font-size: 15px; line-height: 1.7; color: #444;">
              A quick call costs nothing and often saves months of building the wrong thing.
            </p>
            <a href="${CALENDLY_URL}" style="display: inline-block; margin-top: 16px; background: #dc2626; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
              Book a free 45-min call →
            </a>
          </div>
          <div style="background: #f7f3ee; padding: 20px 40px; font-size: 12px; color: #aaa;">
            Bloop Global LLC · bloopglobal.com
          </div>
        </div>
      `,
    }).catch(console.error)

    return NextResponse.redirect(`${BASE_URL}/how-it-works`)
  }

  // Timeline: ASAP → push to Calendly
  if (question === 'timeline' && answer === 'asap') {
    return NextResponse.redirect(CALENDLY_URL)
  }

  // Stage: existing product → different framing
  if (question === 'stage' && answer === 'existing-product') {
    return NextResponse.redirect(`${BASE_URL}/services`)
  }

  // Default: thank you + redirect home
  return NextResponse.redirect(`${BASE_URL}/?qualify=thanks`)
}
