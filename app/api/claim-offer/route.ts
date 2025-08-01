import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();
    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send thank you email to user
    await resend.emails.send({
      from: 'Bloop Global <no-reply@updates.bloopglobal.com>',
      to: email,
      subject: 'Thank you for claiming your 50% offer! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #DC2626; text-align: center;">Thank You for Claiming Your 50% Offer!</h1>
          <p>Hi there,</p>
          <p>We’ve received your request for the 50% discount on your new website. Our team will reach out to you within 24 hours to get started.</p>
          <p><strong>Your Website Goals:</strong></p>
          <blockquote style="background: #f9fafb; border-left: 4px solid #DC2626; padding: 12px 16px;">${message}</blockquote>
          <p>If you have any questions, reply to this email or contact us at <a href="mailto:ask@updates.bloopglobal.com">ask@updates.bloopglobal.com</a>.</p>
          <p>Best,<br>Bloop Global Team</p>
        </div>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: 'Bloop Global <no-reply@updates.bloopglobal.com>',
      to: 'ask@updates.bloopglobal.com',
      subject: 'A user claimed the 50% website offer',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #DC2626;">New 50% Offer Claim</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website Goals:</strong></p>
          <blockquote style="background: #f9fafb; border-left: 4px solid #DC2626; padding: 12px 16px;">${message}</blockquote>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending claim offer thank you email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
