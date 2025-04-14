"use client"
// Import necessary libraries
import React, { useState } from 'react';

// Define the questions and answers
const questions = [
    {
      question: 'How do you handle risk in business ventures?',
      answers: [
        { text: 'Avoid it at all costs', value: 1 },
        { text: 'Calculate and take if warranted', value: 2 },
        { text: 'Embrace and charge forward', value: 3 }
      ],
    },
    {
      question: 'When faced with a tough business decision, you usually:',
      answers: [
        { text: 'Seek advice from mentors or advisors', value: 1 },
        { text: 'Analyze the data and make an informed choice', value: 2 },
        { text: 'Go with your gut feeling', value: 3 }
      ],
    },
    {
      question: 'How would you describe your leadership style?',
      answers: [
        { text: 'Authoritative', value: 1 },
        { text: 'Democratic', value: 2 },
        { text: 'Laissez-faire', value: 3 }
      ],
    },
    {
      question: 'When a problem arises in your business, your first reaction is to:',
      answers: [
        { text: 'Find who is responsible', value: 1 },
        { text: 'Look for a solution', value: 2 },
        { text: 'Evaluate the impact on the business', value: 3 }
      ],
    },
    {
      question: 'How important is innovation in your business model?',
      answers: [
        { text: 'Crucial, always looking for the next big thing', value: 3 },
        { text: 'Important, but not at the cost of current operations', value: 2 },
        { text: 'Not as important as stability and consistency', value: 1 }
      ],
    },
    {
      question: 'How do you manage finances in your business?',
      answers: [
        { text: 'Very conservatively, avoiding debt', value: 1 },
        { text: 'Wisely, with a balance of debt and equity', value: 2 },
        { text: 'Aggressively, leveraging debt for growth', value: 3 }
      ],
    },
    {
      question: 'What’s more important when building a team?',
      answers: [
        { text: 'Skill and expertise', value: 1 },
        { text: 'Cultural fit', value: 2 },
        { text: 'A balance of both', value: 3 }
      ],
    },
    {
      question: 'How do you handle negative customer feedback?',
      answers: [
        { text: 'Take it personally and feel discouraged', value: 1 },
        { text: 'Analyze it for constructive feedback', value: 2 },
        { text: 'See it as an opportunity for improvement', value: 3 }
      ],
    },
    {
      question: 'Where do you see your business in 10 years?',
      answers: [
        { text: 'Dominating the market', value: 3 },
        { text: 'Having a loyal customer base', value: 2 },
        { text: 'Making a difference in the community', value: 1 }
      ],
    },
    {
      question: 'How do you balance work and personal life?',
      answers: [
        { text: 'Work always comes first', value: 3 },
        { text: 'Strive for a healthy balance', value: 2 },
        { text: 'Ensure personal life is prioritized', value: 1 }
      ],
    },
  ];
  
const entrepreneurialTypes = [
  {
    minScore: 10,
    maxScore: 15,
    type: 'The Conservative',
    description: 'You prefer a steady and secure approach, valuing stability over high-risk opportunities.'
  },
  {
    minScore: 16,
    maxScore: 20,
    type: 'The Balanced',
    description: 'You strike a balance between risk and reward, making calculated decisions to grow your venture.'
  },
  {
    minScore: 21,
    maxScore: 25,
    type: 'The Go-Getter',
    description: 'Your proactive and ambitious nature drives you to chase down opportunities and achieve lofty goals.'
  },
  {
    minScore: 26,
    maxScore: 30,
    type: 'The All-In Entrepreneur',
    description: 'With an all-or-nothing attitude, you’re ready to invest heavily and take bold actions to realize your vision.'
  }
];

// The main quiz component
// The main quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [entrepreneurialType, setEntrepreneurialType] = useState({});
  const [name, setName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  
  const handleAnswerOptionClick = (value) => {
    setScore(score + value);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Find the entrepreneurial type based on score
      const foundType = entrepreneurialTypes.find(
        type => score + value >= type.minScore && score + value <= type.maxScore
      );
      setEntrepreneurialType(foundType);
      setShowModal(true);
    }
  };

  const startQuiz = () => {
    if (name) {
      setQuizStarted(true);
    } else {
      alert('Please enter your name to start the quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {!quizStarted ? (
        <div className="pt-24 max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Your Name to Begin</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Full Name"
          />
          <button 
            className="text-white bg-blue-500 rounded px-4 py-2"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mb-4">
            {questions[currentQuestion].question}
          </div>
          <div>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                onClick={() => handleAnswerOptionClick(answer.value)}
                key={index}
                className="mb-2 text-white bg-blue-500 rounded px-4 py-2"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{name}, your Entrepreneurial Type is: {entrepreneurialType.type}</h2>
            <p className="text-lg text-gray-600 mb-4">{entrepreneurialType.description}</p>
            <button 
              className="text-white bg-blue-500 rounded px-4 py-2" 
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;