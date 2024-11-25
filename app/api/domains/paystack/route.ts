import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// USD to GHS conversion rate (you might want to use a real forex API)
const USD_TO_GHS_RATE = 12.50; // Example rate: 1 USD = 12.50 GHS

export async function POST(req: Request) {
  try {
    const { domain, price, email, name } = await req.json();

    // Convert USD price to GHS and then to pesewas
    const priceInGHS = price * USD_TO_GHS_RATE;
    const amountInPesewas = Math.round(priceInGHS * 100);

    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amountInPesewas,
          currency: 'GHS', // Changed to GHS (Ghana Cedis)
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/domains/success`,
          metadata: {
            domain,
            customerName: name,
            originalAmountUSD: price,
          },
        }),
      });

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return NextResponse.json({
        authorization_url: data.data.authorization_url,
      });

    } catch (paystackError) {
      console.error('Paystack API error:', paystackError);
      throw paystackError;
    }

  } catch (error) {
    console.error('Payment session error:', error);
    return NextResponse.json(
      { error: 'Error creating payment session' },
      { status: 500 }
    );
  }
} 