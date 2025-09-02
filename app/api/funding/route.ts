import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, stage, goals, pathways } = body as {
      name?: string;
      email?: string;
      stage?: string;
      goals?: string;
      pathways?: string[];
    };

    if (!name || !email || !stage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const pathwaysText = (pathways && pathways.length) ? pathways.join(', ') : 'Not specified';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>New Funding Application</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 640px; margin: 0 auto; padding: 20px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .pill { display:inline-block; padding:2px 8px; border-radius:12px; background:#eee; margin-right:6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Funding Application</h2>
            <div class="field"><span class="label">Name:</span> ${name}</div>
            <div class="field"><span class="label">Email:</span> ${email}</div>
            <div class="field"><span class="label">Stage:</span> ${stage}</div>
            <div class="field"><span class="label">Goals (90 days):</span><br/>${goals ? goals.replace(/</g, '&lt;') : '—'}</div>
            <div class="field"><span class="label">Interested pathways:</span> ${pathwaysText}</div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Bloop Global <onboarding@resend.dev>',
      to: ['ask@updates.bloopglobal.com'],
      subject: `Funding application: ${name} (${stage})`,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Funding form send error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}


