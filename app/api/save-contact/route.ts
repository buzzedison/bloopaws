import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Add contact to Resend audience
    // Note: You'll need to create an audience in Resend dashboard first
    // Replace 'your-audience-id' with your actual audience ID
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (audienceId) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          audienceId: audienceId,
        });
      } catch (resendError: any) {
        // If contact already exists, that's fine - continue
        if (!resendError?.message?.includes('already exists')) {
          console.error('Resend API Error:', resendError);
        }
      }
    }

    // Send admin notification about new chat lead
    await resend.emails.send({
      from: 'Bloop Chatbot <noreply@bloopglobal.com>',
      to: ['ask@bloopglobal.com'], // Your team email
      subject: `🚀 New Chat Started: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <h2 style="color: #dc2626;">New Chatbot Conversation Started</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 14px;">
              💡 <strong>Tip:</strong> This person just started chatting! You'll get another notification when they close the chat with full conversation details.
            </p>
            <p style="color: #666; font-size: 14px;">
              Monitor the conversation and follow up quickly for best conversion!
            </p>
          </body>
        </html>
      `,
    });

    // Send a welcome email to the visitor
    await resend.emails.send({
      from: 'Bloop Global <noreply@bloopglobal.com>', // Update with your verified domain
      to: [email],
      subject: "Thanks for chatting with us! 👋",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px;">Hey ${name.split(' ')[0]}! 👋</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95;">Thanks for reaching out to Bloop Global</p>
            </div>

            <div style="padding: 0 20px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                We're excited to learn more about your idea and explore how we can help turn it into a real business!
              </p>

              <p style="font-size: 16px; margin-bottom: 20px;">
                While you're here, feel free to:
              </p>

              <ul style="font-size: 16px; margin-bottom: 30px; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Check out our <a href="https://bloopglobal.com/casestudies" style="color: #dc2626; text-decoration: none; font-weight: 600;">case studies</a> to see our work</li>
                <li style="margin-bottom: 10px;">Explore our <a href="https://bloopglobal.com/insight" style="color: #dc2626; text-decoration: none; font-weight: 600;">blog</a> for helpful insights</li>
                <li style="margin-bottom: 10px;">Learn about our <a href="https://bloopglobal.com/#services" style="color: #dc2626; text-decoration: none; font-weight: 600;">services</a></li>
              </ul>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 30px;">
                <p style="margin: 0; font-size: 16px;">
                  <strong>Need to talk right away?</strong><br>
                  Email us at <a href="mailto:ask@bloopglobal.com" style="color: #dc2626; text-decoration: none;">ask@bloopglobal.com</a>
                </p>
              </div>

              <p style="font-size: 16px; margin-bottom: 20px;">
                Looking forward to helping you build something amazing!
              </p>

              <p style="font-size: 16px; margin-bottom: 5px;">
                <strong>The Bloop Team</strong>
              </p>
              <p style="font-size: 14px; color: #666; margin-top: 5px;">
                Turning Ideas Into Businesses
              </p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">
                Bloop Global LLC<br>
                <a href="https://bloopglobal.com" style="color: #dc2626; text-decoration: none;">bloopglobal.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Save contact error:', error);
    return NextResponse.json(
      { error: 'Failed to save contact', details: error.message },
      { status: 500 }
    );
  }
}
