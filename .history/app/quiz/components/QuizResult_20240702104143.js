export default function QuizResult({ scores }) {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = 40;
  const percentage = (totalScore / maxScore) * 100;

  let resultText = '';
  let resultColor = '';
  if (percentage >= 80) {
    resultText = 'Congratulations! Your business is a digital transformation rockstar.';
    resultColor = 'text-green-600';
  } else if (percentage >= 60) {
    resultText = 'Well done! Your business is making great strides in its digital transformation journey.';
    resultColor = 'text-blue-600';
  } else if (percentage >= 40) {
    resultText = 'Your business is on the right track, but there\'s still room for improvement in your digital transformation efforts.';
    resultColor = 'text-yellow-600';
  } else {
    resultText = 'Your business has significant opportunities to embrace digital transformation and unlock its benefits.';
    resultColor = 'text-red-600';
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#4A044E]">Quiz Result</h2>
      <div className="mb-8">
        <p className={`text-2xl font-semibold mb-4 ${resultColor}`}>{resultText}</p>
        <p className="text-lg">Your score: {totalScore} out of {maxScore}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Personalized Insights:</h3>
        <ul className="list-disc list-inside">
          {/* Add personalized insights based on the user's scores */}
          <li>Insight 1</li>
          <li>Insight 2</li>
          <li>Insight 3</li>
        </ul>
      </div>
    </div>
  );
}