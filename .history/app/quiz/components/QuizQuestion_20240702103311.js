export default function QuizQuestion({ question, onAnswerClick }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">{question.questionText}</h2>
      <ul className="grid grid-cols-1 gap-4">
        {question.answerOptions.map((option) => (
          <li key={option.answerText}>
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => onAnswerClick(question.category, option.score)}
            >
              {option.answerText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}