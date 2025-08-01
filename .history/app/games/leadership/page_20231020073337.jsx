
"use client"
import React, { useState } from 'react';

// Define the questions and answers
const questions = [
  {
    question: 'When faced with a problem, you tend to:',
    answers: [
      { text: 'Look for input from team members.', style: 'Democratic' },
      { text: 'Provide a clear direction for solving the problem.', style: 'Authoritative' },
      // ... other options
    ],
  },
  // ... other questions
];

const LeadershipQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [styleScores, setStyleScores] = useState({
    Authoritative: 0,
    Democratic: 0,
    // ... other styles
  });

  const handleAnswerOptionClick = (style) => {
    setStyleScores((prevScores) => ({
      ...prevScores,
      [style]: prevScores[style] + 1,
    }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Calculate the result and display the modal
    }
  };

  return (
    <div>
      <div>
        {questions[currentQuestion].question}
      </div>
      <div>
        {questions[currentQuestion].answers.map((answer, index) => (
          <button onClick={() => handleAnswerOptionClick(answer.style)} key={index}>
            {answer.text}
          </button>
        ))}
      </div>
      {/* ... modal code */}
    </div>
  );
};

export default LeadershipQuiz;
