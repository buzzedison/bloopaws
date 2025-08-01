import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const USD_TO_GHS_RATE = 12.50;

export async function POST(req: Request) {
  try {
    // Verify environment variables
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY is not configured');
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not configured');
    }

    const { domain, price, email, name } = await req.json();

    // Validate required fields
    if (!email || !domain || !price) {
      throw new Error('Missing required fields');
    }

    const priceInGHS = price * USD_TO_GHS_RATE;
    const amountInPesewas = Math.round(priceInGHS * 100);

    try {
      console.log('Initializing Paystack transaction...', {
        email,
        amount: amountInPesewas,
        currency: 'GHS',
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/domains/success`,
      });

      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amountInPesewas,
          currency: 'GHS',
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/domains/success`,
          metadata: {
            domain,
            customerName: name,
            originalAmountUSD: price,
          },
        }),
      });

      const data = await response.json();
      console.log('Paystack API response:', data);

      if (!data.status) {
        throw new Error(data.message || 'Paystack initialization failed');
      }

      if (!data.data?.authorization_url) {
        throw new Error('No authorization URL received from Paystack');
      }

      return NextResponse.json({
        authorization_url: data.data.authorization_url,
      });

    } catch (paystackError: any) {
      console.error('Detailed Paystack error:', {
        message: paystackError.message,
        stack: paystackError.stack,
        response: paystackError.response,
      });
      
      return NextResponse.json(
        { 
          error: `Paystack API error: ${paystackError.message}`,
          details: process.env.NODE_ENV === 'development' ? paystackError : undefined,
        },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('Payment session error:', {
      message: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Error creating payment session',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
} 