import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateMarketFitPDF, MarketFitResults } from '../generate-report'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, results } = (await request.json()) as {
      email?: string
      results?: MarketFitResults
    }

    if (!email || !results) {
      return NextResponse.json(
        { success: false, error: 'Missing email or results payload' },
        { status: 400 }
      )
    }

    const pdfBuffer = await generateMarketFitPDF(results)

    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      subject: `Your Market-Fit Matrix Results (${results.zone.name})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff; padding: 32px; border-radius: 18px 18px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">Your Market-Fit Matrix Report</h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.85;">${results.zone.name} • Score: ${results.totalScore}/100</p>
          </div>

          <div style="background: #ffffff; border: 1px solid #f3f4f6; border-top: none; padding: 32px; border-radius: 0 0 18px 18px; box-shadow: 0 12px 24px -16px rgba(220, 38, 38, 0.35);">
            <h2 style="margin-top: 0; font-size: 20px; color: #111827;">${results.formData.businessName || 'Your Business Idea'}</h2>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">
              ${results.formData.description || 'No description provided'}
            </p>

            <div style="margin: 28px 0; padding: 20px; background: #f9fafb; border-radius: 12px; text-align: center;">
              <div style="font-size: 36px; font-weight: bold; color: #dc2626; margin-bottom: 8px;">${results.totalScore} / 100</div>
              <div style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 4px;">${results.zone.name}</div>
              <div style="font-size: 14px; color: #6b7280;">${results.zone.description}</div>
            </div>

            <h2 style="margin-top: 28px; font-size: 18px; color: #111827;">Score Breakdown</h2>
            <ul style="padding-left: 20px; color: #4b5563; font-size: 15px;">
              <li>Problem Existence: <strong>${results.scores.problemExistence} / 25</strong></li>
              <li>Active Search: <strong>${results.scores.activeSearch} / 25</strong></li>
              <li>Willingness to Pay: <strong>${results.scores.willingnessToPay} / 25</strong></li>
              <li>Reachability: <strong>${results.scores.reachability} / 25</strong></li>
            </ul>

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
          filename: 'market-fit-matrix-report.pdf',
          content: pdfBuffer.toString('base64'),
          contentType: 'application/pdf',
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send market-fit report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send market-fit report' },
      { status: 500 }
    )
  }
}


