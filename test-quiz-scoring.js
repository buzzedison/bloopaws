// Quick test to verify quiz scoring is working
const { getQuizConfig, calculateScore } = require('./app/lib/quiz-data.ts');

// Test with mobile quiz
const mobileConfig = getQuizConfig('mobile');
if (!mobileConfig) {
  console.error('Mobile quiz config not found');
  process.exit(1);
}

console.log('Testing Mobile Quiz Scoring...');
console.log('Quiz Total Points:', mobileConfig.totalPoints);
console.log('Passing Score:', mobileConfig.passingScore);
console.log('Sections:', mobileConfig.sections.map(s => `${s.id} (${s.type}): ${s.totalPoints}pts`));

// Test answers - simulate some correct answers and short answers
const testAnswers = {
  // MCQ Section 1 - correct answers
  'q1': 'b', // correct
  'q2': 'c', // correct
  'q3': 'a', // correct
  'q4': 'b', // correct
  'q5': 'c', // correct
  'q6': 'a', // correct

  // Short Answer Section 2
  'debugging-snippet': 'This code has issues with infinite loops and performance',

  // Short Answer Section 3
  'saved-articles-design': 'Design a saved articles feature with offline support...',

  // Short Answer Section 4
  'testing-deployment': 'Testing strategy and deployment hygiene...'
};

const result = calculateScore(testAnswers, mobileConfig);

console.log('\n=== SCORING RESULT ===');
console.log('Total Score:', result.totalScore);
console.log('Percentage:', Math.round((result.totalScore / mobileConfig.totalPoints) * 100) + '%');
console.log('Passed:', result.passed);
console.log('\nSection Breakdown:');
Object.entries(result.breakdown).forEach(([sectionId, breakdown]) => {
  console.log(`${sectionId}: ${breakdown.earned}/${breakdown.total} (${breakdown.percentage}%)`);
});

console.log('\n=== EXPECTED BEHAVIOR ===');
console.log('- MCQ questions: 6 questions × 5pts each = 30pts (if all correct)');
console.log('- Short answer questions: 3 sections × 50% credit = ~37.5pts total');
console.log('- Total expected: ~67.5pts (should pass if >= 70pts total, but this shows the logic works)');

