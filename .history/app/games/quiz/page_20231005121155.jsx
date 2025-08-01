
export default function QuestionContainer () {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [scores, setScores] = React.useState({
      Innovator: 0,
      Maker: 0,
      Visionary: 0,
      Networker: 0,
    });
  
    const handleNext = () => {
      const selectedAnswer = document.querySelector('input[name="answer"]:checked');
      if (selectedAnswer) {
        setScores({
          ...scores,
          [questions[currentQuestion].answers[selectedAnswer.value].result]:
            scores[questions[currentQuestion].answers[selectedAnswer.value].result] +
            1,
        });
        selectedAnswer.checked = false;
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert('Please select an answer.');
      }
    };
  
    const finishQuiz = () => {
      const result = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );
      document.getElementById('result').textContent =
        'You\'re a(n) ' + result + ' entrepreneur!';
      document.getElementById('question-container').style.display = 'none';
      document.getElementById('result-container').style.display = 'block';
    };
  
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      return (
        <div className="quiz-container">
          <div id="question-container" className="question-container">
            <h2 id="question">{question.question}</h2>
  
            <div id="answer-container" className="answer-container">
              {question.answers.map((answer, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`answer${i + 1}`}
                    name="answer"
                    value={i}
                  />
                  <label htmlFor={`answer${i + 1}`}>{answer.text}</label>
                </div>
              ))}
            </div>
  
            <button id="next-btn" className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="quiz-container">
          <div id="result-container" className="result-container">
            <h2 id="result"></h2>
            <button id="restart-btn" className="restart-btn" onClick={finishQuiz}>
              Restart
            </button>
          </div>
        </div>
      );
    }
  };
  
