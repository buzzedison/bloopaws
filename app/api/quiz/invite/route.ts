import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getQuizConfig } from '../../../lib/quiz-data';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface QuizInvitation {
  applicantName: string;
  applicantEmail: string;
  role: string;
  applicationId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuizInvitation = await request.json();
    const { applicantName, applicantEmail, role, applicationId } = body;

    // Validate input
    if (!applicantName || !applicantEmail || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: applicantName, applicantEmail, role' },
        { status: 400 }
      );
    }

    // Validate role
    const quizConfig = getQuizConfig(role);
    if (!quizConfig) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // Generate quiz link with unique token and email
    const quizToken = generateQuizToken();
    const quizUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz/${role}?token=${quizToken}&email=${encodeURIComponent(applicantEmail)}`;

    // Update application status in database if applicationId is provided
    if (applicationId) {
      const supabase = createClient();
      try {
        await supabase
          .from('applications')
          .update({
            status: 'quiz_sent',
            quiz_invited_at: new Date().toISOString()
          })
          .eq('id', applicationId);
      } catch (dbError) {
        console.error('Failed to update application status:', dbError);
        // Don't fail the invitation if DB update fails
      }
    }

    // Send invitation email
    await sendQuizInvitationEmail({
      applicantName,
      applicantEmail,
      role,
      quizUrl,
      quizConfig,
      applicationId
    });

    return NextResponse.json({
      success: true,
      message: 'Quiz invitation sent successfully',
      quizToken,
      quizUrl
    });

  } catch (error) {
    console.error('Error sending quiz invitation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateQuizToken(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function sendQuizInvitationEmail({
  applicantName,
  applicantEmail,
  role,
  quizUrl,
  quizConfig,
  applicationId
}: {
  applicantName: string;
  applicantEmail: string;
  role: string;
  quizUrl: string;
  quizConfig: any;
  applicationId?: string;
}) {
  const roleTitles: Record<string, string> = {
    mobile: 'Mobile Engineering Intern',
    business: 'Business Development & Sales Intern',
    investment: 'Investment Analyst Intern'
  };

  const roleDescriptions: Record<string, string> = {
    mobile: 'React Native, Flutter, Supabase integration, and mobile development best practices',
    business: 'Sales pipeline management, business development, and client acquisition strategies',
    investment: 'Financial modeling, market analysis, and investment evaluation frameworks'
  };

  await resend.emails.send({
    from: 'Bloop Global <noreply@updates.bloopglobal.com>',
    to: applicantEmail,
    replyTo: 'ask@bloopglobal.com',
    subject: `🎯 Your Assessment Quiz: ${roleTitles[role]} - The Vanguard Program`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to The Vanguard Program</h1>
          <p style="color: white; margin: 10px 0 0 0;">Your Assessment Quiz is Ready</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 10px 0;">Hi ${applicantName}!</h2>
            <p style="color: #6b7280; margin: 0;">
              Congratulations! Your application for <strong>${roleTitles[role]}</strong> has been approved.
              The next step is to complete our assessment quiz.
            </p>
          </div>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">📋 Quiz Overview</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Role:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${roleTitles[role]}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Duration:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${quizConfig.timeLimit} minutes</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Total Points:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${quizConfig.totalPoints}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Passing Score:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${quizConfig.passingScore}% (${Math.ceil(quizConfig.totalPoints * quizConfig.passingScore / 100)} points)</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Format:</td>
                <td style="padding: 8px 0;">Multiple Choice + Short Answer</td>
              </tr>
            </table>
          </div>

          <div style="background: #ecfdf5; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">🎯 What This Quiz Tests</h3>
            <p style="color: #166534; margin: 0; line-height: 1.5;">
              ${roleDescriptions[role]}
            </p>
          </div>

          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">⚠️ Important Instructions</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">You have <strong>one attempt</strong> to complete this quiz</li>
              <li style="margin-bottom: 8px;">The quiz is <strong>timed</strong> - don't start until you're ready</li>
              <li style="margin-bottom: 8px;">Find a quiet place with stable internet</li>
              <li style="margin-bottom: 8px;">Short answer questions will be manually graded</li>
              <li style="margin-bottom: 8px;">Results will be emailed within 2-3 business days</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${quizUrl}" style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              🚀 Start Your Assessment Quiz
            </a>
          </div>

          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #6b7280; margin: 0; text-align: center; font-size: 14px;">
              <strong>Quiz Link:</strong> ${quizUrl}
            </p>
            <p style="color: #6b7280; margin: 5px 0 0 0; text-align: center; font-size: 12px;">
              (Copy this link if the button doesn't work)
            </p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Questions about the quiz? Reply to this email or contact us at ask@bloopglobal.com
            </p>
            ${applicationId ? `<p style="color: #6b7280; font-size: 12px; text-align: center; margin: 10px 0 0 0;">Application ID: ${applicationId}</p>` : ''}
          </div>
        </div>
      </div>
    `
  });
}
