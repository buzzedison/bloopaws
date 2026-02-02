import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, conversationLength } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Send follow-up email after chat ends
    await resend.emails.send({
      from: 'Bloop Global <noreply@updates.bloopglobal.com>',
      to: [email],
      subject: "Great chatting with you! Let's keep the conversation going 💬",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px;">Thanks for the chat, ${name.split(' ')[0]}! 💬</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95;">Let's turn that idea into reality</p>
            </div>

            <div style="padding: 0 20px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                I hope our conversation was helpful! We're genuinely excited about the possibility of working with you.
              </p>

              <div style="background: #fef2f2; padding: 25px; border-radius: 8px; margin-bottom: 30px; border: 2px solid #fecaca;">
                <h2 style="margin: 0 0 15px 0; font-size: 20px; color: #dc2626;">🚀 Ready for the next step?</h2>
                <p style="margin: 0 0 15px 0; font-size: 16px;">
                  Let's have a real conversation about your project. We'll dive deeper into:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 16px;">
                  <li style="margin-bottom: 8px;">Your vision and goals</li>
                  <li style="margin-bottom: 8px;">Technical requirements and timeline</li>
                  <li style="margin-bottom: 8px;">Budget and investment options</li>
                  <li>How we can help you succeed</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:ask@bloopglobal.com?subject=Following up from chat - ${encodeURIComponent(name)}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px;">
                  📧 Email Us Directly
                </a>
              </div>

              <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #666;">
                or reply directly to this email - we read every message!
              </p>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #111;">📚 While you're thinking it over...</h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                  Check out these resources:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #666;">
                  <li style="margin-bottom: 8px;"><a href="https://bloopglobal.com/casestudies" style="color: #dc2626; text-decoration: none;">Case Studies</a> - See our recent work</li>
                  <li style="margin-bottom: 8px;"><a href="https://bloopglobal.com/insight" style="color: #dc2626; text-decoration: none;">Blog</a> - Insights on building successful businesses</li>
                  <li><a href="https://bloopglobal.com/courses" style="color: #dc2626; text-decoration: none;">Courses</a> - Learn about investment readiness and AI</li>
                </ul>
              </div>

              <p style="font-size: 16px; margin-bottom: 20px;">
                We're here whenever you're ready. No pressure, just genuine excitement to help you succeed!
              </p>

              <p style="font-size: 16px; margin-bottom: 5px;">
                <strong>The Bloop Team</strong>
              </p>
              <p style="font-size: 14px; color: #666; margin-top: 5px;">
                Turning Ideas Into Businesses
              </p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0 0 10px 0;">
                <strong>Bloop Global LLC</strong><br>
                Email: <a href="mailto:ask@bloopglobal.com" style="color: #dc2626; text-decoration: none;">ask@bloopglobal.com</a><br>
                Web: <a href="https://bloopglobal.com" style="color: #dc2626; text-decoration: none;">bloopglobal.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Also send internal notification to the team
    await resend.emails.send({
      from: 'Bloop Chatbot <noreply@updates.bloopglobal.com>',
      to: ['ask@bloopglobal.com'],
      subject: `💬 New Chat Lead: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <h2 style="color: #dc2626;">New Chatbot Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Conversation Length:</strong> ${conversationLength} messages</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 14px;">Follow up with this lead within 24 hours for best conversion!</p>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Send follow-up error:', error);
    return NextResponse.json(
      { error: 'Failed to send follow-up', details: error.message },
      { status: 500 }
    );
  }
}
