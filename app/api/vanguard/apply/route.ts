import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ApplicationData {
  role: string
  fullName: string
  email: string
  phone: string
  location: string
  experience: string
  portfolio: string
  linkedin: string
  github?: string
  motivation: string
  availability: string
  referralSource: string
}

const roleTitles = {
  mobile: 'Mobile Engineering Intern',
  'bd-sales': 'Business Development & Sales Intern',
  investment: 'Investment Analyst Intern'
}

async function addToConvertKit(email: string, firstName: string, role: string) {
  try {
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY
    const convertKitFormId = process.env.CONVERTKIT_VANGUARD_FORM_ID

    if (!convertKitApiKey || !convertKitFormId) {
      console.warn('ConvertKit credentials not configured')
      return null
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
        first_name: firstName,
        fields: {
          role: role,
          application_date: new Date().toISOString(),
          status: 'applied'
        },
        tags: ['vanguard_applicant', `role_${role}`]
      }),
    })

    if (!response.ok) {
      console.error('ConvertKit API error:', await response.text())
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('ConvertKit integration error:', error)
    return null
  }
}

async function sendConfirmationEmail(email: string, firstName: string, role: string) {
  try {
    const roleTitle = roleTitles[role as keyof typeof roleTitles] || 'Vanguard Program'

    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      replyTo: 'ask@bloopglobal.com',
      subject: `Application Received - ${roleTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to The Vanguard Program</h1>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${firstName}!</h2>

            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Thank you for applying to join The Vanguard Program as a <strong>${roleTitle}</strong>.
              We've received your application and are excited about your interest in building with us.
            </p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
              <ul style="color: #4b5563; padding-left: 20px;">
                <li>We'll review your application within 48 hours</li>
                <li>If shortlisted, you'll receive a role-specific challenge</li>
                <li>Complete the challenge within 48 hours</li>
                <li>Successful candidates will be invited for an interview</li>
              </ul>
            </div>

            <p style="color: #4b5563; line-height: 1.6;">
              We're looking for makers who show up and ship. If you're selected for the next round,
              we'll send you a link to complete our assessment quiz that tests real-world skills.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bloopglobal.com/vanguard"
                 style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%);
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        display: inline-block;">
                View Program Details
              </a>
            </div>

            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Questions? Reply to this email or reach out to us at ask@bloopglobal.com
            </p>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

async function sendInternalNotification(applicationData: ApplicationData) {
  try {
    const roleTitle = roleTitles[applicationData.role as keyof typeof roleTitles] || 'Vanguard Program'

    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: 'ask@bloopglobal.com',
      replyTo: applicationData.email,
      subject: `New Vanguard Application: ${applicationData.fullName} - ${roleTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">New Vanguard Program Application</h2>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Applicant Details</h3>
            <p><strong>Name:</strong> ${applicationData.fullName}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phone}</p>
            <p><strong>Location:</strong> ${applicationData.location}</p>
            <p><strong>Role Applied:</strong> ${roleTitle}</p>
            <p><strong>Experience:</strong> ${applicationData.experience}</p>
            <p><strong>Availability:</strong> ${applicationData.availability}</p>
            <p><strong>Referral Source:</strong> ${applicationData.referralSource || 'Not specified'}</p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Links</h3>
            <p><strong>Portfolio:</strong> <a href="${applicationData.portfolio}" target="_blank">${applicationData.portfolio}</a></p>
            ${applicationData.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${applicationData.linkedin}" target="_blank">${applicationData.linkedin}</a></p>` : ''}
            ${applicationData.github ? `<p><strong>GitHub:</strong> <a href="${applicationData.github}" target="_blank">${applicationData.github}</a></p>` : ''}
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Motivation</h3>
            <p style="white-space: pre-wrap;">${applicationData.motivation}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${applicationData.email}"
               style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%);
                      color: white;
                      padding: 12px 24px;
                      text-decoration: none;
                      border-radius: 6px;
                      font-weight: bold;
                      display: inline-block;">
              Reply to Applicant
            </a>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Internal notification error:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const applicationData: ApplicationData = await request.json()

    // Validate required fields
    const requiredFields = ['role', 'fullName', 'email', 'phone', 'location', 'experience', 'portfolio', 'motivation', 'availability']
    const missingFields = requiredFields.filter(field => !applicationData[field as keyof ApplicationData])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const firstName = applicationData.fullName.split(' ')[0]

    // Add to ConvertKit (don't fail if this doesn't work)
    await addToConvertKit(applicationData.email, firstName, applicationData.role)

    // Send confirmation email to applicant
    await sendConfirmationEmail(applicationData.email, firstName, applicationData.role)

    // Send internal notification
    await sendInternalNotification(applicationData)

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data: {
          role: applicationData.role,
          email: applicationData.email,
          submittedAt: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
