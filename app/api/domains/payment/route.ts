import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  try {
    const { domain, price, email, name } = await req.json();

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Domain: ${domain}`,
              description: 'Domain Registration Fee',
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/domains/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/domains`,
      customer_email: email,
      metadata: {
        domain,
        customerName: name,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Payment session error:', error);
    return NextResponse.json(
      { error: 'Error creating payment session' },
      { status: 500 }
    );
  }
}