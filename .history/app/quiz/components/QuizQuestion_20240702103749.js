export default function QuizQuestion({ question, onAnswerClick }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#4A044E]">{question.questionText}</h2>
      <ul className="grid grid-cols-1 gap-6">
        {question.answerOptions.map((option) => (
          <li key={option.answerText}>
            <button
              className="w-full bg-gradient-to-r from-[#4A044E] to-[#6A0572] hover:from-[#6A0572] hover:to-[#8B0596] text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
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