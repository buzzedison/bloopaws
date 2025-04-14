export default function QuizQuestion({ question, onAnswerClick }) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{question.questionText}</h2>
        <ul>
          {question.answerOptions.map((option) => (
            <li key={option.answerText} className="mb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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