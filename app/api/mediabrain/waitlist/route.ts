import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface WaitlistPayload {
  name: string
  email: string
  url?: string
  businessType?: string
  adSpend?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistPayload = await request.json()
    const { name, email, url, businessType, adSpend } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Send notification email via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Notify internal team
      await resend.emails.send({
        from: 'MediaBrain Waitlist <noreply@updates.bloopglobal.com>',
        to: ['ask@bloopglobal.com'],
        subject: `New MediaBrain waitlist signup — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff; padding: 24px; border-radius: 14px 14px 0 0;">
              <h1 style="margin: 0; font-size: 22px;">New MediaBrain Waitlist Signup</h1>
            </div>
            <div style="background: #ffffff; border: 1px solid #f3f4f6; border-top: none; padding: 28px; border-radius: 0 0 14px 14px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111827;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Landing Page</td><td style="padding: 8px 0; color: #dc2626;">${url || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Business Type</td><td style="padding: 8px 0; color: #111827;">${businessType || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Monthly Ad Spend</td><td style="padding: 8px 0; color: #111827;">${adSpend || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Submitted</td><td style="padding: 8px 0; color: #111827;">${new Date().toUTCString()}</td></tr>
              </table>
            </div>
          </div>
        `.trim(),
      })

      // Confirmation email to the user
      await resend.emails.send({
        from: 'MediaBrain by Bloop <noreply@updates.bloopglobal.com>',
        to: [email],
        subject: "You're on the MediaBrain waitlist",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #111827, #1f2937); color: #fff; padding: 32px; border-radius: 18px 18px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">You're on the list, ${name.split(' ')[0]}.</h1>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 15px;">MediaBrain — by Bloop Global</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #f3f4f6; border-top: none; padding: 32px; border-radius: 0 0 18px 18px;">
              <p style="font-size: 16px; color: #374151; line-height: 1.7;">
                We'll reach out with install instructions when MediaBrain launches. In the meantime, here's how the workflow works:
              </p>
              <ol style="font-size: 15px; color: #4b5563; line-height: 2; padding-left: 20px;">
                <li>Claude fetches your landing page and extracts brand identity</li>
                <li>You answer 9 targeted questions (takes ~5 minutes)</li>
                <li>Claude roleplays as your buyer — writing a 200-word internal monologue</li>
                <li>Reddit research for real ICP language</li>
                <li>Competitor gap analysis</li>
                <li>16 creatives delivered across 4 angles and 4 formats</li>
              </ol>
              ${url ? `<p style="font-size: 15px; color: #374151; margin-top: 24px;">We noted your page: <strong style="color: #dc2626;">${url}</strong> — we'll pre-run the brand extraction when you're first in queue.</p>` : ''}
              <div style="margin-top: 32px; text-align: center;">
                <a href="https://bloopglobal.com/mediabrain" style="display: inline-block; background: #dc2626; color: #fff; padding: 14px 28px; border-radius: 9999px; font-weight: 600; text-decoration: none;">Learn More About MediaBrain</a>
              </div>
              <p style="margin-top: 28px; font-size: 13px; color: #9ca3af; text-align: center;">
                Questions? Reply to this email or reach us at ask@bloopglobal.com
              </p>
            </div>
          </div>
        `.trim(),
      })
    } catch (emailErr) {
      console.error('Failed to send MediaBrain waitlist emails:', emailErr)
      // Don't fail the request if email fails — still return success
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MediaBrain waitlist error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
