import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const STRIDE_API_KEY = process.env.STRIDE_API_KEY!
const STRIDE_BASE = 'https://strideos.cloud/api/v1'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json()

    // Basic validation
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Name, email and service are required' },
        { status: 400 }
      )
    }

    // Split full name into first / last
    const parts = name.trim().split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ') || ''

    // ─── 1. Create contact in Stride ────────────────────────────────
    const contactRes = await fetch(`${STRIDE_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'X-API-Key': STRIDE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || '',
        source: 'Website Contact Form',
        tags: ['inbound', service.toLowerCase().replace(/\s+/g, '-')],
        custom_fields: { service, message: message || '' },
      }),
    })

    const contactBody = await contactRes.json().catch(() => ({}))
    const contact = contactBody.data
    console.log('Stride contact status:', contactRes.status, JSON.stringify(contactBody))
    if (!contactRes.ok) {
      console.error('Stride contact creation failed:', contactBody)
    }

    // ─── 2. Create deal in Stride ────────────────────────────────────
    const dealRes = await fetch(`${STRIDE_BASE}/deals`, {
      method: 'POST',
      headers: {
        'X-API-Key': STRIDE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `${name} — ${service}`,
        primary_contact_id: contact?.id || null,
        description: `Service interest: ${service}\n\nMessage:\n${message || 'No message provided'}`,
      }),
    })

    const dealBody = await dealRes.json().catch(() => ({}))
    if (!dealRes.ok) {
      console.error('Stride deal creation failed:', dealBody)
    }

    // ─── 3. Auto-reply to prospect via Resend ───────────────────────
    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      subject: "Got your message — we'll be in touch shortly",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #1a1a2e; padding: 32px 40px;">
            <h2 style="color: #e35d00; margin: 0; font-size: 22px;">Bloop Global</h2>
          </div>
          <div style="padding: 40px;">
            <p style="font-size: 16px;">Hi ${firstName},</p>
            <p style="font-size: 16px; line-height: 1.6;">
              Thanks for reaching out. We've received your message about
              <strong>${service}</strong> and someone from our team will be
              in touch within a few hours.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our work at
              <a href="https://bloopglobal.com" style="color: #e35d00;">bloopglobal.com</a>.
            </p>
            <p style="font-size: 16px; margin-top: 32px;">
              Warm regards,<br/>
              <strong>The Bloop Team</strong>
            </p>
          </div>
          <div style="background: #f7f3ee; padding: 20px 40px; font-size: 13px; color: #999;">
            Bloop Global LLC · bloopglobal.com · ask@bloopglobal.com
          </div>
        </div>
      `,
    })

    // ─── 4. Internal alert to Dennis via Resend ─────────────────────
    await resend.emails.send({
      from: 'Bloop Contact Form <noreply@updates.bloopglobal.com>',
      to: 'ask@bloopglobal.com',
      replyTo: email,
      subject: `🔥 New lead: ${name} — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #1a1a2e; padding: 24px 32px;">
            <h2 style="color: #e35d00; margin: 0; font-size: 18px;">New inbound lead — act fast</h2>
          </div>
          <div style="padding: 32px; background: #fff; border: 1px solid #e0ddd8;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #e35d00;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${phone || '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Service</td><td style="padding: 8px 0;"><strong>${service}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message || '—'}</td></tr>
            </table>
          </div>
          <div style="background: #fff3e0; padding: 20px 32px; border: 1px solid #e0ddd8; border-top: none;">
            <p style="margin: 0; font-size: 14px; color: #1a1a2e;">
              Contact + deal created in Stride. Reply to this email to reach ${firstName} directly.<br/>
              <strong>Respond within 2 hours.</strong>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
