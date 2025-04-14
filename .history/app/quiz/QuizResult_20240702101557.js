export default function QuizResult({ scores }) {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = 40;
    const percentage = (totalScore / maxScore) * 100;
  
    let resultText = '';
    if (percentage >= 80) {
      resultText = 'Congratulations! Your business is a digital transformation rockstar.';
    } else if (percentage >= 60) {
      resultText = 'Well done! Your business is making great strides in its digital transformation journey.';
    } else if (percentage >= 40) {
      resultText = 'Your business is on the right track, but there\'s still room for improvement in your digital transformation efforts.';
    } else {
      resultText = 'Your business has significant opportunities to embrace digital transformation and unlock its benefits.';
    }
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p className="mb-4">{resultText}</p>
        <p className="mb-4">Your score: {totalScore} out of {maxScore}</p>
        {/* Add personalized insights based on the user's scores */}
      </div>
    );
  }