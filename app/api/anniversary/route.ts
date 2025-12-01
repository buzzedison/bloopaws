import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, package: packageType, howDidYouHear, howDidYouHearOther, message } = body;

    // Input validation
    if (!name || !email || !phone || !packageType || !howDidYouHear) {
      return NextResponse.json(
        { error: 'Name, email, phone, package, and how you heard about us are required' },
        { status: 400 }
      );
    }

    // If "other" is selected, require the other field
    if (howDidYouHear === 'other' && !howDidYouHearOther) {
      return NextResponse.json(
        { error: 'Please specify where you heard about us' },
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

    const packagePrices: Record<string, string> = {
      website: 'GHC 1,500',
      'pitch-deck': 'GHC 1,500',
      'business-plan': 'GHC 1,500'
    };

    const packagePrice = packagePrices[packageType] || 'Contact for pricing';

    // Map howDidYouHear values to readable labels
    const howDidYouHearLabels: Record<string, string> = {
      'social-media': 'Social Media (Facebook, Instagram, Twitter, LinkedIn)',
      'google-search': 'Google Search',
      'friend-referral': 'Friend/Colleague Referral',
      'email-marketing': 'Email Marketing',
      'website': 'Our Website',
      'blog-article': 'Blog Article or Content',
      'podcast': 'Podcast',
      'youtube': 'YouTube',
      'other': 'Other'
    };

    const howDidYouHearLabel = howDidYouHear === 'other' 
      ? `Other: ${howDidYouHearOther || 'Not specified'}`
      : (howDidYouHearLabels[howDidYouHear] || howDidYouHear);

    // Send email to admin
    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: ['ask@bloopglobal.com'],
      subject: `🎉 New Anniversary Deal Claim: ${packageType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Anniversary Deal Claim</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; background: #f9fafb; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 24px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; }
              .field { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb; }
              .field:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #374151; display: block; margin-bottom: 4px; }
              .value { color: #1f2937; }
              .package-badge { display: inline-block; background: #dc2626; color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; margin-top: 4px; }
              .price { color: #dc2626; font-size: 18px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🎉 New Anniversary Deal Claim</h1>
              </div>
              <div class="field">
                <span class="label">Package:</span>
                <div class="package-badge">${packageType.charAt(0).toUpperCase() + packageType.slice(1).replace('-', ' ')}</div>
                <div class="price" style="margin-top: 8px;">${packagePrice}</div>
                <div class="value" style="font-size: 12px; color: #6b7280;">Offer ends 30 December 2025.</div>
              </div>
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <span class="label">How they heard about us:</span>
                <div class="value">${howDidYouHearLabel}</div>
              </div>
              ${message ? `
              <div class="field">
                <span class="label">Additional Message:</span>
                <div class="value">${message}</div>
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: email,
      subject: 'Thank you for claiming your anniversary deal! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Thank You</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; background: #f9fafb; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 24px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; text-align: center; }
              .content { padding: 20px 0; }
              .package-info { background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; border-radius: 4px; }
              .next-steps { background: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 20px; }
              .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Thank You for Claiming Your Anniversary Deal! 🎉</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>We've received your request for our <strong>${packageType.charAt(0).toUpperCase() + packageType.slice(1).replace('-', ' ')}</strong> package at the special anniversary price of <strong>${packagePrice}</strong> (offer ends 30 December 2025).</p>
                
                <div class="package-info">
                  <strong>What happens next?</strong>
                  <ul style="margin: 12px 0 0 0; padding-left: 20px;">
                    <li>Our team will review your submission</li>
                    <li>We'll contact you within 24 hours to discuss your project</li>
                    <li>We'll confirm your package details and get started</li>
                  </ul>
                </div>

                <div class="next-steps">
                  <strong>Need to reach us?</strong>
                  <p style="margin: 8px 0 0 0;">Reply to this email or contact us at <a href="mailto:ask@bloopglobal.com">ask@bloopglobal.com</a></p>
                </div>

                <p>We're excited to work with you!</p>
                <p>Best regards,<br><strong>The Bloop Global Team</strong></p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

