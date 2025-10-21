import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function addToConvertKitNewsletter(email: string) {
  try {
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertKitFormId = process.env.CONVERTKIT_BUILD_SHEET_FORM_ID;

    if (!convertKitApiKey || !convertKitFormId) {
      console.warn('ConvertKit credentials not configured for Build Sheet');
      return null;
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
        fields: {
          subscribed_at: new Date().toISOString(),
          source: 'build_sheet_landing_page'
        },
        tags: ['build_sheet_subscriber', 'newsletter']
      }),
    });

    if (!response.ok) {
      console.error('ConvertKit API error:', await response.text());
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ConvertKit integration error:', error);
    return null;
  }
}

async function sendWelcomeEmail(email: string) {
  try {
    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      replyTo: 'ask@bloopglobal.com',
      subject: 'Welcome to The Build Sheet! 🎯',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to The Build Sheet</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your Friday morning plan for turning ideas into real projects</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Thanks for subscribing! 🎉</h2>

            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              You're now part of a community of builders who get honest lessons and practical guidance every Friday morning.
            </p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">What to expect:</h3>
              <ul style="color: #4b5563; padding-left: 20px;">
                <li><strong>Every Friday at 8 AM:</strong> One email in your inbox</li>
                <li><strong>5 minutes to read:</strong> Short, actionable content</li>
                <li><strong>Real value:</strong> Lessons from people who've been there</li>
                <li><strong>Builder focus:</strong> Practical tools you can use immediately</li>
              </ul>
            </div>

            <p style="color: #4b5563; line-height: 1.6;">
              The Build Sheet is written by builders, for builders. We share what we've learned so you don't have to learn it the hard way.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bloopglobal.com/build-sheet"
                 style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        display: inline-block;">
                Visit Build Sheet
              </a>
            </div>

            <p style="color: #6b7280; font-size: 14px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              Questions? Reply to this email or reach out to us at ask@bloopglobal.com<br>
              You can unsubscribe anytime from any newsletter email.
            </p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Welcome email sending error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Input validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add to ConvertKit newsletter
    const convertKitResult = await addToConvertKitNewsletter(email);

    // Send welcome email
    await sendWelcomeEmail(email);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to The Build Sheet!',
        data: {
          email: email,
          subscribedAt: new Date().toISOString(),
          convertKitAdded: !!convertKitResult
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Build Sheet subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

