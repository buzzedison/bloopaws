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

    // Add to ConvertKit newsletter (This triggers the Kit flow)
    const convertKitResult = await addToConvertKitNewsletter(email);

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

