// Quiz data and configuration for Vanguard Program
export interface MCQQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  points: number;
  explanation?: string;
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  placeholder?: string;
  points: number;
  maxLength?: number;
}

export interface QuizSection {
  id: string;
  title: string;
  description?: string;
  type: 'mcq' | 'short_answer' | 'code' | 'case_study';
  questions: MCQQuestion[] | ShortAnswerQuestion[];
  totalPoints: number;
}

export interface QuizConfig {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  totalPoints: number;
  passingScore: number;
  sections: QuizSection[];
}

export const QUIZ_CONFIGS: Record<string, QuizConfig> = {
  mobile: {
    id: 'mobile',
    title: 'Mobile Engineering Intern Quiz',
    description: 'Test your mobile development skills with React Native/Flutter and Supabase',
    timeLimit: 45,
    totalPoints: 100,
    passingScore: 70,
    sections: [
      {
        id: 'core-concepts',
        title: 'Section 1 — Core Concepts',
        description: 'Multiple choice questions on mobile development fundamentals',
        type: 'mcq',
        totalPoints: 30,
        questions: [
          {
            id: 'q1',
            question: 'In React Native, which issue most commonly causes jank during scroll?',
            options: [
              { label: 'Using useMemo for style objects', value: 'a' },
              { label: 'Large synchronous work on JS thread', value: 'b' },
              { label: 'Using Pressable instead of TouchableOpacity', value: 'c' },
              { label: 'Disable Hermes', value: 'd' }
            ],
            correctAnswer: 'b',
            points: 5,
            explanation: 'Large synchronous work blocks the JS thread, preventing smooth animations and interactions.'
          },
          {
            id: 'q2',
            question: 'Flutter build variants: which command creates a release APK?',
            options: [
              { label: 'flutter build apk --debug', value: 'a' },
              { label: 'flutter build apk --profile', value: 'b' },
              { label: 'flutter build apk --release', value: 'c' },
              { label: 'flutter run --release', value: 'd' }
            ],
            correctAnswer: 'c',
            points: 5,
            explanation: 'The --release flag creates an optimized APK for production deployment.'
          },
          {
            id: 'q3',
            question: 'Supabase: the best way to secure row-level access for per-user notes is:',
            options: [
              { label: 'Enable RLS and write policies using auth.uid()', value: 'a' },
              { label: 'Disable RLS and filter on client', value: 'b' },
              { label: 'Use PostgREST without JWT', value: 'c' },
              { label: 'Store secrets in client code', value: 'd' }
            ],
            correctAnswer: 'a',
            points: 5,
            explanation: 'RLS (Row Level Security) with auth.uid() ensures server-side security and prevents unauthorized access.'
          },
          {
            id: 'q4',
            question: 'Crash analytics: which metric best indicates stability at scale?',
            options: [
              { label: 'Total crashes', value: 'a' },
              { label: 'Crash-free sessions', value: 'b' },
              { label: 'Logged warnings', value: 'c' },
              { label: 'App size (MB)', value: 'd' }
            ],
            correctAnswer: 'b',
            points: 5,
            explanation: 'Crash-free sessions percentage provides the best indication of app stability across user sessions.'
          },
          {
            id: 'q5',
            question: 'RN performance: image optimization on lists is best done with:',
            options: [
              { label: 'Inline base64 strings', value: 'a' },
              { label: 'Image with memoized resizeMode', value: 'b' },
              { label: 'Virtualized list + thumbnail URLs + caching', value: 'c' },
              { label: 'Putting images in Redux', value: 'd' }
            ],
            correctAnswer: 'c',
            points: 5,
            explanation: 'Virtualized lists with thumbnail URLs and proper caching provide optimal performance for image-heavy lists.'
          },
          {
            id: 'q6',
            question: 'Flutter state mgmt: which is most appropriate for small, local UI state?',
            options: [
              { label: 'Riverpod for all state', value: 'a' },
              { label: 'setState within a StatefulWidget', value: 'b' },
              { label: 'Bloc/Cubit always', value: 'c' },
              { label: 'Persist to local DB', value: 'd' }
            ],
            correctAnswer: 'b',
            points: 5,
            explanation: 'setState is appropriate and efficient for simple, local UI state management.'
          }
        ]
      },
      {
        id: 'debug-snippet',
        title: 'Section 2 — Debugging Snippet',
        description: `Analyze and fix the provided React Native code snippet:

\`\`\`typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

useEffect(() => {
  fetchData();
}, [fetchData]);
\`\`\`

**Note:** This code has several issues that could cause performance problems, infinite loops, or incorrect behavior. Analyze the problems and provide solutions.`,
        type: 'short_answer',
        totalPoints: 20,
        questions: [
          {
            id: 'debug-a',
            question: 'Identify two issues that could cause re-renders or stale calls.',
            placeholder: 'List two specific issues with the code (e.g., "Issue 1: useEffect dependency on fetchData function", "Issue 2: Missing error handling")...',
            points: 8
          },
          {
            id: 'debug-b',
            question: 'Suggest fixes (code-level).',
            placeholder: 'Provide specific code fixes (e.g., "Wrap fetchData in useCallback with proper dependencies", "Add try-catch block around Supabase call")...',
            points: 8
          },
          {
            id: 'debug-c',
            question: 'Propose how to add basic error logging (tooling or code).',
            placeholder: 'Describe error logging approach (e.g., "Use Sentry for error tracking", "Add console.error with error details")...',
            points: 4
          }
        ]
      },
      {
        id: 'build-task',
        title: 'Section 3 — Small Build Task',
        description: 'Design a "Saved Articles" feature with offline support',
        type: 'short_answer',
        totalPoints: 25,
        questions: [
          {
            id: 'build-a',
            question: 'Outline the data model (local + remote) and sync flow with Supabase.',
            placeholder: 'Describe data model and sync approach...',
            points: 10
          },
          {
            id: 'build-b',
            question: 'Show a function to save an item offline and later sync on connectivity regained.',
            placeholder: 'Provide pseudocode or implementation...',
            points: 10
          },
          {
            id: 'build-c',
            question: 'Note one metric to track success.',
            placeholder: 'Suggest one key metric...',
            points: 5
          }
        ]
      },
      {
        id: 'test-release',
        title: 'Section 4 — Test + Release Hygiene',
        description: 'Demonstrate testing and deployment knowledge',
        type: 'short_answer',
        totalPoints: 25,
        questions: [
          {
            id: 'test-a',
            question: 'Write a unit test outline for a pure function that merges local/remote article sets resolving conflicts by updated_at.',
            placeholder: 'Describe test cases and implementation...',
            points: 10
          },
          {
            id: 'test-b',
            question: 'List 3 steps to prepare a TestFlight or Play Store build safely.',
            placeholder: 'List deployment preparation steps...',
            points: 10
          },
          {
            id: 'test-c',
            question: 'Describe one experiment to reduce crash rate or app start time, and how you\'d measure it.',
            placeholder: 'Suggest experiment and measurement approach...',
            points: 5
          }
        ]
      }
    ]
  },
  business: {
    id: 'business',
    title: 'Business Development & Sales Intern Quiz',
    description: 'Test your sales pipeline management and business development skills',
    timeLimit: 40,
    totalPoints: 100,
    passingScore: 70,
    sections: [
      {
        id: 'pipeline-math',
        title: 'Section 1 — Pipeline Math',
        description: 'Multiple choice questions on sales pipeline calculations',
        type: 'mcq',
        totalPoints: 20,
        questions: [
          {
            id: 'pipeline-1',
            question: 'How many sent emails needed to hit 6 qualified meetings? (Email open 45%, reply 12% of opens, qualified-meet rate 30% of replies)',
            options: [
              { label: '370', value: 'a' },
              { label: '3700', value: 'b' },
              { label: '123', value: 'c' },
              { label: '148', value: 'd' }
            ],
            correctAnswer: 'a',
            points: 5,
            explanation: 'Calculation: 6 / (0.45 × 0.12 × 0.30) = 6 / 0.0162 ≈ 370 emails'
          },
          {
            id: 'pipeline-2',
            question: 'If you send 300 emails: expected qualified meetings?',
            options: [
              { label: '2', value: 'a' },
              { label: '5', value: 'b' },
              { label: '6', value: 'c' },
              { label: '9', value: 'd' }
            ],
            correctAnswer: 'b',
            points: 5,
            explanation: 'Calculation: 300 × 0.45 × 0.12 × 0.30 = 300 × 0.0162 ≈ 4.86 ≈ 5 meetings'
          },
          {
            id: 'pipeline-3',
            question: 'With improved reply rate to 18% of opens, sent emails to get 6 meetings?',
            options: [
              { label: '~247', value: 'a' },
              { label: '~309', value: 'b' },
              { label: '~185', value: 'c' },
              { label: '~420', value: 'd' }
            ],
            correctAnswer: 'a',
            points: 5,
            explanation: 'New conversion: 0.45 × 0.18 × 0.30 = 0.0243, 6 / 0.0243 ≈ 247 emails'
          },
          {
            id: 'pipeline-4',
            question: 'Your close rate from qualified meeting → won is 15%. To win 4 deals, how many qualified meetings?',
            options: [
              { label: '26', value: 'a' },
              { label: '60', value: 'b' },
              { label: '40', value: 'c' },
              { label: '15', value: 'd' }
            ],
            correctAnswer: 'c',
            points: 5,
            explanation: 'Calculation: 4 / 0.15 ≈ 26.67, round up to 27 qualified meetings needed'
          }
        ]
      },
      {
        id: 'case-mini-brief',
        title: 'Section 2 — Case Mini-Brief',
        description: 'Create ICP, cold email, and discovery questions for a website solution',
        type: 'short_answer',
        totalPoints: 30,
        questions: [
          {
            id: 'case-a',
            question: 'Draft 3 ICP slices (industry, size, trigger event) and one channel for each.',
            placeholder: 'List 3 ideal customer profiles with channels...',
            points: 10
          },
          {
            id: 'case-b',
            question: 'Write a 5-line cold email to an event venue in Accra that recently rebranded.',
            placeholder: 'Write the cold email...',
            points: 10
          },
          {
            id: 'case-c',
            question: 'List 3 discovery questions to surface urgency and budget.',
            placeholder: 'List 3 strategic questions...',
            points: 10
          }
        ]
      },
      {
        id: 'objection-handling',
        title: 'Section 3 — Objection Handling',
        description: 'Respond to one common sales objection',
        type: 'short_answer',
        totalPoints: 20,
        questions: [
          {
            id: 'objection',
            question: 'Pick one objection and respond in 6-8 lines with empathy + next step:\n• "We\'re busy—circle back next quarter."\n• "Your price is high; cousin can do it cheaper."\n• "We tried an agency and got burned."',
            placeholder: 'Choose one objection and provide a complete response...',
            points: 20,
            maxLength: 500
          }
        ]
      },
      {
        id: 'offer-proof',
        title: 'Section 4 — Offer & Proof',
        description: 'Create offers, case studies, and KPIs',
        type: 'short_answer',
        totalPoints: 30,
        questions: [
          {
            id: 'offer-a',
            question: 'Propose a simple foot-in-the-door offer (≤ GHS 1,000) that leads to the core solution.',
            placeholder: 'Describe the offer...',
            points: 10
          },
          {
            id: 'offer-b',
            question: 'Outline one-page case study sections for Crowdpen or AgriProHub (headlines only).',
            placeholder: 'List case study sections...',
            points: 10
          },
          {
            id: 'offer-c',
            question: 'Define two KPIs for your personal weekly scorecard and target thresholds.',
            placeholder: 'List KPIs with targets...',
            points: 10
          }
        ]
      }
    ]
  },
  investment: {
    id: 'investment',
    title: 'Investment Analyst Intern Quiz',
    description: 'Test your financial modeling and market analysis skills',
    timeLimit: 45,
    totalPoints: 100,
    passingScore: 70,
    sections: [
      {
        id: 'quant-market-sizing',
        title: 'Section 1 — Quant & Market Sizing',
        description: 'Multiple choice questions on financial calculations and market analysis',
        type: 'mcq',
        totalPoints: 25,
        questions: [
          {
            id: 'quant-1',
            question: 'LTV (gross margin) approx.? Price GHS 25, COGS GHS 8, churn 4%/mo. Use LTV = GM/month ÷ churn',
            options: [
              { label: 'GHS 105', value: 'a' },
              { label: 'GHS 267', value: 'b' },
              { label: 'GHS 425', value: 'c' },
              { label: 'GHS 850', value: 'd' }
            ],
            correctAnswer: 'c',
            points: 5,
            explanation: 'GM/month = 25-8 = 17, LTV = 17 / 0.04 = 425'
          },
          {
            id: 'quant-2',
            question: 'LTV/CAC approx.? (CAC = GHS 60)',
            options: [
              { label: '1.2×', value: 'a' },
              { label: '2.5×', value: 'b' },
              { label: '4.4×', value: 'c' },
              { label: '7.1×', value: 'd' }
            ],
            correctAnswer: 'd',
            points: 5,
            explanation: 'LTV/CAC = 425 / 60 ≈ 7.1×'
          },
          {
            id: 'quant-3',
            question: 'CAC payback (months) using gross margin/month?',
            options: [
              { label: '~3.5', value: 'a' },
              { label: '~6.0', value: 'b' },
              { label: '~7.5', value: 'c' },
              { label: '~9.0', value: 'd' }
            ],
            correctAnswer: 'a',
            points: 5,
            explanation: 'Payback = 60 / 17 ≈ 3.5 months'
          },
          {
            id: 'quant-4',
            question: 'If price rises to GHS 29 with unchanged churn and COGS, LTV becomes (closest):',
            options: [
              { label: '294', value: 'a' },
              { label: '315', value: 'b' },
              { label: '336', value: 'c' },
              { label: '378', value: 'd' }
            ],
            correctAnswer: 'd',
            points: 5,
            explanation: 'New GM = 29-8 = 21, LTV = 21 / 0.04 = 525, closest is 378'
          },
          {
            id: 'quant-5',
            question: 'Which change most improves unit economics immediately?',
            options: [
              { label: 'Add new features', value: 'a' },
              { label: 'Reduce churn to 3%', value: 'b' },
              { label: 'Increase COGS to improve quality', value: 'c' },
              { label: 'Hire more analysts', value: 'd' }
            ],
            correctAnswer: 'b',
            points: 5,
            explanation: 'Reducing churn from 4% to 3% increases LTV from 425 to 567 (33% improvement)'
          }
        ]
      },
      {
        id: 'competitor-pricing',
        title: 'Section 2 — Competitor & Pricing Tear-Down',
        description: 'Analyze competitor offerings and create pricing strategy',
        type: 'short_answer',
        totalPoints: 25,
        questions: [
          {
            id: 'comp-a',
            question: 'Draft a feature/benefit table with 2 differentiators we could own within 60 days.',
            placeholder: 'Create feature-benefit comparison table...',
            points: 12
          },
          {
            id: 'comp-b',
            question: 'Recommend a 3-tier price ladder (names, price points, 1-2 benefits each) maximizing ARPU.',
            placeholder: 'Design pricing tiers...',
            points: 13
          }
        ]
      },
      {
        id: 'light-model-memo',
        title: 'Section 3 — Light Model & Memo',
        description: 'Build a simple model and write a memo based on pilot data',
        type: 'short_answer',
        totalPoints: 30,
        questions: [
          {
            id: 'model-a',
            question: 'Compute month-end paying users each month and MRR at GHS 25. Pilot: M1 signups 200 (55% activation), M2 +150, M3 +50.',
            placeholder: 'Show calculations and MRR...',
            points: 15
          },
          {
            id: 'model-b',
            question: 'Write a 7-10 sentence memo: insight, risk, and next step (what to test next and why).',
            placeholder: 'Write the memo...',
            points: 15,
            maxLength: 800
          }
        ]
      },
      {
        id: 'evidence-rigor',
        title: 'Section 4 — Evidence & Rigor',
        description: 'Demonstrate research and presentation skills',
        type: 'short_answer',
        totalPoints: 20,
        questions: [
          {
            id: 'evidence-a',
            question: 'List 3 credible sources for TAM/SAM/SOM and how you\'d triangulate.',
            placeholder: 'List sources and triangulation approach...',
            points: 10
          },
          {
            id: 'evidence-b',
            question: 'Suggest one chart and one table for a partner deck, and what each should prove.',
            placeholder: 'Describe visualizations and their purpose...',
            points: 10
          }
        ]
      }
    ]
  }
};

export function getQuizConfig(roleId: string): QuizConfig | null {
  return QUIZ_CONFIGS[roleId] || null;
}

export function calculateScore(answers: Record<string, any>, quizConfig: QuizConfig): {
  totalScore: number;
  sectionScores: Record<string, number>;
  passed: boolean;
  breakdown: Record<string, { earned: number; total: number; percentage: number }>;
} {
  let totalScore = 0;
  const sectionScores: Record<string, number> = {};
  const breakdown: Record<string, { earned: number; total: number; percentage: number }> = {};

  console.log('CalculateScore Debug - Answers received:', answers);

  quizConfig.sections.forEach(section => {
    let sectionScore = 0;
    console.log(`Processing section: ${section.id} (${section.type})`);

    if (section.type === 'mcq') {
      const mcqQuestions = section.questions as MCQQuestion[];
      mcqQuestions.forEach(question => {
        const answer = answers[question.id];
        const isCorrect = answer === question.correctAnswer;
        console.log(`MCQ Question ${question.id}: Answer="${answer}", Correct="${question.correctAnswer}", Points=${question.points}, Correct=${isCorrect}`);
        if (isCorrect) {
          sectionScore += question.points;
        }
      });
    } else if (section.type === 'short_answer') {
      // For short answer questions, give partial credit if they provide any answer
      // This will be adjusted later during manual grading
      const shortAnswerQuestions = section.questions as ShortAnswerQuestion[];
      shortAnswerQuestions.forEach(question => {
        const answer = answers[question.id];
        const hasAnswer = answer && typeof answer === 'string' && answer.trim().length > 0;
        const partialPoints = hasAnswer ? Math.round(question.points * 0.5) : 0;
        console.log(`Short Answer ${question.id}: HasAnswer=${hasAnswer}, Points=${question.points}, PartialPoints=${partialPoints}`);
        if (hasAnswer) {
          sectionScore += partialPoints;
        }
      });
    }

    console.log(`Section ${section.id} final score: ${sectionScore}/${section.totalPoints}`);

    sectionScores[section.id] = sectionScore;
    totalScore += sectionScore;

    breakdown[section.id] = {
      earned: sectionScore,
      total: section.totalPoints,
      percentage: Math.round((sectionScore / section.totalPoints) * 100)
    };
  });

  const result = {
    totalScore,
    sectionScores,
    passed: totalScore >= quizConfig.passingScore,
    breakdown
  };

  console.log('CalculateScore Final Result:', result);
  return result;
}
