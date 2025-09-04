import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// In-memory storage for demo - replace with database in production
const submissions: Map<string, any> = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    // First check in-memory storage (for backward compatibility)
    let submission = submissions.get(submissionId);

    // If not found in memory, check Supabase database
    if (!submission) {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from('quiz_submissions')
          .select(`
            id,
            application_email,
            role,
            quiz_token,
            time_limit,
            total_points,
            answers,
            submitted_at,
            mcq_score,
            mcq_total,
            total_score,
            percentage,
            passed,
            graded,
            time_up,
            ip_address,
            user_agent,
            created_at
          `)
          .eq('quiz_token', submissionId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('Database error:', error);
        } else if (data) {
          // Convert Supabase data format to the expected format
          submission = {
            id: data.quiz_token,
            role: data.role,
            answers: data.answers || {},
            score: data.mcq_score || 0,
            totalScore: data.total_points || 0,
            passed: data.passed || false,
            submittedAt: data.submitted_at,
            timeUp: data.time_up || false,
            graded: data.graded || false,
            email: data.application_email
          };

          // Store in memory for faster future access
          submissions.set(submissionId, submission);
        }
      } catch (dbError) {
        console.error('Failed to fetch from database:', dbError);
      }
    }

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);

  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { score, graded, feedback } = body;

    // First check in-memory storage
    let submission = submissions.get(submissionId);

    // If not found in memory, check Supabase database
    if (!submission) {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from('quiz_submissions')
          .select('*')
          .eq('quiz_token', submissionId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Database error:', error);
        } else if (data) {
          // Convert to expected format
          submission = {
            id: data.quiz_token,
            role: data.role,
            answers: data.answers || {},
            score: data.mcq_score || 0,
            totalScore: data.total_points || 0,
            passed: data.passed || false,
            submittedAt: data.submitted_at,
            timeUp: data.time_up || false,
            graded: data.graded || false,
            email: data.application_email
          };
        }
      } catch (dbError) {
        console.error('Failed to fetch from database:', dbError);
      }
    }

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Update submission with manual grading
    const updatedSubmission = {
      ...submission,
      score: score !== undefined ? score : submission.score,
      graded: graded !== undefined ? graded : submission.graded,
      feedback: feedback || submission.feedback,
      gradedAt: new Date().toISOString(),
    };

    // Update in-memory storage
    submissions.set(submissionId, updatedSubmission);

    // Update in Supabase database
    const supabase = createClient();
    try {
      await supabase
        .from('quiz_submissions')
        .update({
          total_score: updatedSubmission.score,
          graded: updatedSubmission.graded,
          graded_at: new Date().toISOString()
        })
        .eq('quiz_token', submissionId);
    } catch (dbError) {
      console.error('Failed to update database:', dbError);
    }

    return NextResponse.json(updatedSubmission);

  } catch (error) {
    console.error('Error updating quiz results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
