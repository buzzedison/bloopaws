import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateDiagnosticPDF } from '../generate-report'

interface DiagnosticAnswers {
  stage: string
  biggest_challenge: string
  technical_capability: number
  needs: string[]
  timeline: string
  budget: string
  confidence: number
  priority: string
}

interface Recommendation {
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
}

function analyzeAnswers(answers: DiagnosticAnswers) {
  const recommendations: Recommendation[] = []
  let profile = ''
  let urgency = 'medium'
  let readiness = 0

  // Analyze stage
  switch (answers.stage) {
    case 'idea':
      profile = 'Visionary'
      recommendations.push({
        title: 'Validate Before You Build',
        description: 'You have an idea, but building without validation is risky. Start with customer interviews and a landing page to test demand.',
        action: 'Book a Strategy Session',
        priority: 'high',
      })
      readiness = 20
      break
    case 'prototype':
      profile = 'Builder'
      recommendations.push({
        title: 'Polish Your MVP',
        description: 'You\'ve built something - that\'s huge! Now it\'s time to refine it based on real user feedback and prepare for launch.',
        action: 'Get a Technical Audit',
        priority: 'high',
      })
      readiness = 50
      break
    case 'launched':
      profile = 'Launcher'
      recommendations.push({
        title: 'Focus on Growth',
        description: 'You\'re live! Now the challenge is scaling user acquisition and improving retention. Time to double down on what works.',
        action: 'Explore Growth Services',
        priority: 'high',
      })
      readiness = 70
      break
    case 'scaling':
      profile = 'Scaler'
      recommendations.push({
        title: 'Scale Infrastructure',
        description: 'Growing pains are real. You need robust systems, automation, and a team that can handle the load.',
        action: 'Talk to Our Scale Team',
        priority: 'high',
      })
      readiness = 85
      break
  }

  // Analyze biggest challenge
  switch (answers.biggest_challenge) {
    case 'technical':
      recommendations.push({
        title: 'Technical Co-Founder or Dev Team',
        description: 'Building the product is your bottleneck. You need experienced developers who can execute your vision.',
        action: 'View Development Services',
        priority: 'high',
      })
      break
    case 'funding':
      recommendations.push({
        title: 'Funding Strategy',
        description: 'Capital is crucial, but so is knowing when and how to raise. We can help you prepare pitch decks and connect with investors.',
        action: 'Explore Funding Support',
        priority: 'high',
      })
      break
    case 'customers':
      recommendations.push({
        title: 'Customer Acquisition',
        description: 'Finding customers is the lifeblood of any business. Let\'s build a marketing engine that actually converts.',
        action: 'Get Marketing Help',
        priority: 'high',
      })
      break
    case 'team':
      recommendations.push({
        title: 'Build Your Team',
        description: 'You can\'t do it alone. Finding the right co-founder or early team members is critical to success.',
        action: 'Join Our Network',
        priority: 'medium',
      })
      break
    case 'strategy':
      recommendations.push({
        title: 'Business Model Clarity',
        description: 'A great product without a business model is a hobby. Let\'s nail down your revenue strategy and go-to-market plan.',
        action: 'Book Strategy Session',
        priority: 'high',
      })
      break
  }

  // Analyze technical capability
  if (answers.technical_capability <= 3) {
    recommendations.push({
      title: 'Full Development Partnership',
      description: 'You\'re non-technical, and that\'s okay. We\'ll handle all the technical heavy lifting while you focus on the business.',
      action: 'See Our Dev Services',
      priority: 'high',
    })
  } else if (answers.technical_capability <= 6) {
    recommendations.push({
      title: 'Technical Support & Guidance',
      description: 'You know some tech, but need expert help to avoid costly mistakes. We can fill the gaps and accelerate your progress.',
      action: 'Get Technical Consultation',
      priority: 'medium',
    })
  } else {
    recommendations.push({
      title: 'Strategic Technical Partnership',
      description: 'You can build, but you need strategic guidance on architecture, scaling, and best practices.',
      action: 'Talk to Our Architects',
      priority: 'low',
    })
  }

  // Analyze needs
  const needsMap: Record<string, string> = {
    web_dev: 'Web Development',
    mobile_dev: 'Mobile App Development',
    saas: 'SaaS Platform Development',
    ai: 'AI/ML Integration',
    design: 'UI/UX Design',
    strategy: 'Business Strategy',
    funding: 'Funding & Investment',
    marketing: 'Marketing & Growth',
  }

  const topNeeds = answers.needs.slice(0, 3).map(need => needsMap[need] || need)

  // Analyze timeline
  switch (answers.timeline) {
    case 'urgent':
      urgency = 'high'
      recommendations.push({
        title: 'Fast-Track Development',
        description: 'You need to move fast. We can prioritize your project and deliver an MVP in weeks, not months.',
        action: 'Request Rush Timeline',
        priority: 'high',
      })
      break
    case 'soon':
      urgency = 'medium'
      break
    case 'flexible':
      urgency = 'low'
      recommendations.push({
        title: 'Phased Approach',
        description: 'With a flexible timeline, we can build iteratively, testing and refining as we go for the best outcome.',
        action: 'Discuss Phased Development',
        priority: 'medium',
      })
      break
  }

  // Analyze confidence
  if (answers.confidence <= 4) {
    recommendations.push({
      title: 'Confidence Building',
      description: 'Execution uncertainty is normal. Let\'s start with a discovery phase to build a clear roadmap and boost your confidence.',
      action: 'Start with Discovery',
      priority: 'high',
    })
  } else if (answers.confidence >= 8) {
    recommendations.push({
      title: 'Execution Partner',
      description: 'You\'re confident and ready to execute. You just need the right team to make it happen. Let\'s do this.',
      action: 'Let\'s Build Together',
      priority: 'high',
    })
  }

  // Analyze priority
  let approach = ''
  switch (answers.priority) {
    case 'speed':
      approach = 'We\'ll focus on rapid MVP development to get you to market fast.'
      break
    case 'quality':
      approach = 'We\'ll build it right the first time with robust architecture and best practices.'
      break
    case 'cost':
      approach = 'We\'ll optimize for cost-effectiveness while maintaining quality standards.'
      break
    case 'validation':
      approach = 'We\'ll start with low-cost validation experiments before committing to full development.'
      break
  }

  // Calculate readiness score
  readiness += answers.technical_capability * 2
  readiness += answers.confidence * 2
  if (answers.budget !== 'bootstrap') readiness += 10
  if (answers.needs.length >= 3) readiness -= 10
  readiness = Math.min(100, Math.max(0, readiness))

  return {
    profile,
    urgency,
    readiness,
    topNeeds,
    approach,
    recommendations: recommendations.slice(0, 4), // Top 4 recommendations
  }
}

export async function POST(request: NextRequest) {
  try {
    const { answers, email } = await request.json()

    if (!answers) {
      return NextResponse.json(
        { success: false, error: 'No answers provided' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required to deliver your report' },
        { status: 400 }
      )
    }

    const results = analyzeAnswers(answers as DiagnosticAnswers)

    // Generate PDF report
    let pdfBuffer: Buffer | null = null
    try {
      pdfBuffer = await generateDiagnosticPDF(results)
    } catch (err) {
      console.error('Failed to generate diagnostic PDF:', err)
    }

    // Send detailed email via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

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
        attachments: pdfBuffer
          ? [
              {
                filename: 'disruptors-diagnostic-report.pdf',
                content: pdfBuffer.toString('base64'),
                contentType: 'application/pdf',
              },
            ]
          : undefined,
      })
    } catch (emailErr) {
      console.error('Failed to send diagnostic email:', emailErr)
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('Error processing diagnostic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process diagnostic' },
      { status: 500 }
    )
  }
}
