import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateDiagnosticPDF, DiagnosticResults } from '../generate-report'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, results } = (await request.json()) as {
      email?: string
      results?: DiagnosticResults
    }

    if (!email || !results) {
      return NextResponse.json(
        { success: false, error: 'Missing email or results payload' },
        { status: 400 }
      )
    }

    const pdfBuffer = await generateDiagnosticPDF(results)

    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      subject: `Your Disruptor's Diagnostic Results (${results.profile})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff; padding: 32px; border-radius: 18px 18px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">Your Disruptor's Diagnostic Report</h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.85;">Profile: ${results.profile} • Readiness: ${results.readiness}%</p>
          </div>

          <div style="background: #ffffff; border: 1px solid #f3f4f6; border-top: none; padding: 32px; border-radius: 0 0 18px 18px; box-shadow: 0 12px 24px -16px rgba(220, 38, 38, 0.35);">
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              You're officially in the build zone. Here's the personalized breakdown of what to tackle next and where to focus.
            </p>

            <h2 style="margin-top: 28px; font-size: 18px; color: #111827;">Priority Stack</h2>
            <ul style="padding-left: 20px; color: #4b5563; font-size: 15px;">
              ${results.recommendations
                .map(
                  (rec) => `
                    <li style="margin-bottom: 10px;">
                      <strong style="color: #dc2626;">${rec.title}</strong>: ${rec.description}
                    </li>
                  `
                )
                .join('')}
            </ul>

            <h2 style="margin-top: 28px; font-size: 18px; color: #111827;">Recommended Move</h2>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">
              ${results.approach}
            </p>

            <div style="margin-top: 32px; text-align: center;">
              <a href="https://bloopglobal.com/contact" style="display: inline-block; background: #dc2626; color: #fff; padding: 14px 28px; border-radius: 9999px; font-weight: 600; text-decoration: none;">Book a Strategy Call</a>
            </div>

            <p style="margin-top: 32px; font-size: 13px; color: #9ca3af; text-align: center;">
              Your full PDF report is attached for easy sharing with your team.
            </p>
          </div>
        </div>
      `.trim(),
      attachments: [
        {
          filename: 'disruptors-diagnostic-report.pdf',
          content: pdfBuffer.toString('base64'),
          contentType: 'application/pdf',
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send diagnostic report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send diagnostic report' },
      { status: 500 }
    )
  }
}
