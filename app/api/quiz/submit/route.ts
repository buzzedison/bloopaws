import { NextRequest, NextResponse } from 'next/server';
import { getQuizConfig, calculateScore } from '../../../lib/quiz-data';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface QuizSubmission {
  id: string;
  role: string;
  answers: Record<string, Record<string, any>>;
  score: number;
  totalScore: number;
  passed: boolean;
  submittedAt: string;
  timeUp: boolean;
  graded: boolean;
}

// In-memory storage for demo - replace with database in production
const submissions: Map<string, QuizSubmission> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, answers, timeUp, completedAt, email } = body;

    // Validate input
    if (!role || !answers || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: role, answers, email' },
        { status: 400 }
      );
    }

    // Get quiz configuration
    const quizConfig = getQuizConfig(role);
    if (!quizConfig) {
      return NextResponse.json(
        { error: 'Invalid quiz role' },
        { status: 400 }
      );
    }

    // Flatten nested answers structure for scoring
    const flattenedAnswers: Record<string, any> = {};
    Object.values(answers).forEach((sectionAnswers: any) => {
      Object.entries(sectionAnswers).forEach(([questionId, answer]) => {
        flattenedAnswers[questionId] = answer;
      });
    });

    // Calculate score
    const scoreResult = calculateScore(flattenedAnswers, quizConfig);

    // Debug logging
    console.log('Quiz Scoring Debug:', {
      role,
      totalQuestions: Object.keys(flattenedAnswers).length,
      scoreResult,
      quizConfig: {
        totalPoints: quizConfig.totalPoints,
        passingScore: quizConfig.passingScore,
        sectionsCount: quizConfig.sections.length
      }
    });

    // Create submission
    const submissionId = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const submission: QuizSubmission = {
      id: submissionId,
      role,
      answers: flattenedAnswers,
      score: scoreResult.totalScore,
      totalScore: quizConfig.totalPoints,
      passed: scoreResult.passed,
      submittedAt: completedAt || new Date().toISOString(),
      timeUp: timeUp || false,
      graded: false, // Short answers need manual grading
    };

    // Store submission in database
    const supabase = createClient();
    let quizSubmissionRecord = null;
    let applicationRecord = null;

    try {
      // Save quiz submission
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_submissions')
        .insert({
          application_email: email,
          role: role as any,
          quiz_token: submissionId, // Use submissionId as token for now
          time_limit: quizConfig.timeLimit,
          total_points: quizConfig.totalPoints,
          answers: flattenedAnswers,
          submitted_at: completedAt || new Date().toISOString(),
          mcq_score: scoreResult.totalScore,
          mcq_total: quizConfig.totalPoints,
          total_score: scoreResult.totalScore,
          percentage: Math.round((scoreResult.totalScore / quizConfig.totalPoints) * 100),
          passed: scoreResult.passed,
          graded: false,
          time_up: timeUp || false,
          ip_address: request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown',
          user_agent: request.headers.get('user-agent') || null
        })
        .select()
        .single();

      if (quizError) throw quizError;
      quizSubmissionRecord = quizData;

      // Update application record if it exists
      const { data: appData } = await supabase
        .from('applications')
        .select('*')
        .eq('email', email)
        .eq('role', role)
        .single();

      if (appData) {
        applicationRecord = appData;
        await supabase
          .from('applications')
          .update({
            status: scoreResult.passed ? 'quiz_completed' : 'rejected',
            quiz_completed_at: completedAt || new Date().toISOString(),
            quiz_score: Math.round((scoreResult.totalScore / quizConfig.totalPoints) * 100),
            quiz_passed: scoreResult.passed
          })
          .eq('id', appData.id);
      }

    } catch (dbError) {
      console.error('Database error saving quiz submission:', dbError);
      // Continue with email sending even if DB fails
    }

    // Store in memory as backup (for the existing in-memory system)
    submissions.set(submissionId, submission);

    // Send confirmation email
    try {
      await sendQuizConfirmationEmail(submission, quizConfig, email);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the submission if email fails
    }

    // Send internal notification
    try {
      await sendInternalQuizNotification(submission, quizConfig);
    } catch (emailError) {
      console.error('Failed to send internal notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Quiz submitted successfully'
    });

  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendQuizConfirmationEmail(submission: QuizSubmission, quizConfig: any, email: string) {
  const roleTitles: Record<string, string> = {
    mobile: 'Mobile Engineering Intern',
    business: 'Business Development & Sales Intern',
    investment: 'Investment Analyst Intern'
  };

  const percentage = Math.round((submission.score / submission.totalScore) * 100);
  const status = submission.passed ? 'PASSED' : 'UNDER REVIEW';

  // Use the email passed as parameter
  const applicantEmail = email;

  await resend.emails.send({
    from: 'Bloop Global <noreply@updates.bloopglobal.com>',
    to: applicantEmail,
    replyTo: 'ask@bloopglobal.com',
    subject: `Quiz Results: ${roleTitles[submission.role]} - ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ec4899 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Quiz Results</h1>
          <p style="color: white; margin: 10px 0 0 0;">${roleTitles[submission.role]}</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; font-weight: bold; color: ${submission.passed ? '#16a34a' : '#dc2626'}; margin: 20px 0;">
              ${percentage}%
            </div>
            <p style="color: #6b7280; margin: 0;">
              ${submission.score} out of ${submission.totalScore} points
            </p>
            ${submission.timeUp ? '<p style="color: #f59e0b; margin: 10px 0;">⏰ Submitted due to time limit</p>' : ''}
          </div>

          <div style="background: ${submission.passed ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${submission.passed ? '#bbf7d0' : '#fecaca'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: ${submission.passed ? '#166534' : '#991b1b'}; margin: 0 0 10px 0;">
              ${submission.passed ? '🎉 Congratulations!' : '📋 Under Review'}
            </h2>
            <p style="color: ${submission.passed ? '#166534' : '#7f1d1d'}; margin: 0;">
              ${submission.passed
                ? 'You have passed the initial screening quiz! Your application will be reviewed by our team.'
                : 'Your quiz results are being reviewed. We\'ll provide detailed feedback and next steps within 2-3 business days.'
              }
            </p>
          </div>

          <div style="margin: 30px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">What Happens Next?</h3>
            <ul style="color: #6b7280; padding-left: 20px;">
              ${submission.passed
                ? `
                  <li style="margin-bottom: 8px;">Your application will be reviewed by our hiring team</li>
                  <li style="margin-bottom: 8px;">If selected, you'll receive an interview invitation</li>
                  <li style="margin-bottom: 8px;">Final decisions are made within 1 week</li>
                `
                : `
                  <li style="margin-bottom: 8px;">We'll review your detailed answers and provide feedback</li>
                  <li style="margin-bottom: 8px;">You may retake the quiz after 30 days if desired</li>
                  <li style="margin-bottom: 8px;">Additional opportunities may be available</li>
                `
              }
            </ul>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Questions about your results? Reply to this email or contact us at ask@bloopglobal.com
            </p>
          </div>
        </div>
      </div>
    `
  });
}

async function sendInternalQuizNotification(submission: QuizSubmission, quizConfig: any) {
  const roleTitles: Record<string, string> = {
    mobile: 'Mobile Engineering Intern',
    business: 'Business Development & Sales Intern',
    investment: 'Investment Analyst Intern'
  };

  const percentage = Math.round((submission.score / submission.totalScore) * 100);

  await resend.emails.send({
    from: 'Bloop Global <noreply@updates.bloopglobal.com>',
    to: 'ask@bloopglobal.com',
    replyTo: 'noreply@updates.bloopglobal.com',
    subject: `New Quiz Submission: ${roleTitles[submission.role]} - ${percentage}% (${submission.passed ? 'PASSED' : 'REVIEW'})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">New Quiz Submission</h2>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin: 0 0 15px 0;">Submission Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Role:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${roleTitles[submission.role]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Score:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${submission.score}/${submission.totalScore} (${percentage}%)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Status:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                <span style="color: ${submission.passed ? '#16a34a' : '#dc2626'}; font-weight: bold;">
                  ${submission.passed ? 'PASSED' : 'REQUIRES REVIEW'}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Time Up:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${submission.timeUp ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${new Date(submission.submittedAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Submission ID:</td>
              <td style="padding: 8px 0;">${submission.id}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #374151;">Section Breakdown</h3>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            ${quizConfig.sections.map((section: any) => `
              <div style="margin-bottom: 10px;">
                <strong>${section.title}:</strong> ${section.type === 'mcq' ? 'Auto-graded' : 'Manual review needed'}
              </div>
            `).join('')}
          </div>
        </div>

        ${!submission.graded ? `
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong style="color: #92400e;">Action Required:</strong>
            <p style="color: #92400e; margin: 5px 0 0 0;">
              Short answer questions require manual grading. Please review and finalize the score.
            </p>
          </div>
        ` : ''}

        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            View full submission details in the admin panel or database.
          </p>
        </div>
      </div>
    `
  });
}
