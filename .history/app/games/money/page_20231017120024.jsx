"use client"

// Import necessary libraries
import React, { useState } from 'react';

// Define the questions, answers, and topics
const questions = [
    {
        topic: 'Budgeting',
        question: 'What is a budget?',
        answers: [
            { text: 'A record of past spending', value: 0 },
            { text: 'A plan for future spending', value: 1 },
            { text: 'A type of bank account', value: 0 }
        ],
    },
    {
        topic: 'Saving',
        question: 'Why is having an emergency fund important?',
        answers: [
            { text: 'For vacation planning', value: 0 },
            { text: 'For unexpected expenses', value: 1 },
            { text: 'To buy luxury items', value: 0 }
        ],
    },
    {
        topic: 'Investing',
        question: 'What is a stock?',
        answers: [
            { text: 'A type of bond', value: 0 },
            { text: 'Ownership in a company', value: 1 },
            { text: 'A type of bank account', value: 0 }
        ],
    },

    {
        question: 'What is cash flow?',
        answers: [
            { text: 'Money retained after all expenses', value: 0, topic: 'Cash Flow' },
            { text: 'The total revenue generated', value: 0, topic: 'Cash Flow' },
            { text: 'The movement of money in and out of a business', value: 1, topic: 'Cash Flow' }
        ],
    },
    {
        question: 'What’s the difference between revenue and profit?',
        answers: [
            { text: 'They are the same', value: 0, topic: 'Profit and Revenue' },
            { text: 'Revenue minus expenses equals profit', value: 1, topic: 'Profit and Revenue' },
            { text: 'Profit is the total income before expenses', value: 0, topic: 'Profit and Revenue' }
        ],
    },
    {
        question: 'What is the primary goal of investing for a business?',
        answers: [
            { text: 'Quickly doubling the money', value: 0, topic: 'Investing' },
            { text: 'Long-term growth or income generation', value: 1, topic: 'Investing' },
            { text: 'Avoiding all risks', value: 0, topic: 'Investing' }
        ],
    },
    {
        question: 'What is an asset?',
        answers: [
            { text: 'Something you owe', value: 0, topic: 'Investing' },
            { text: 'Something you own that has value', value: 1, topic: 'Investing' },
            { text: 'A monthly expense', value: 0, topic: 'Investing' }
        ],
    },
    {
        question: 'Why is budgeting important for a business?',
        answers: [
            { text: 'To ensure there are enough funds to cover expenses', value: 1, topic: 'Budgeting' },
            { text: 'To eliminate all expenses', value: 0, topic: 'Budgeting' },
            { text: 'To increase the company’s debt', value: 0, topic: 'Budgeting' }
        ],
    },
    {
        question: 'What is the significance of a positive cash flow?',
        answers: [
            { text: 'The business is in debt', value: 0, topic: 'Cash Flow' },
            { text: 'The business is generating more money than it is spending', value: 1, topic: 'Cash Flow' },
            { text: 'The business has high expenses', value: 0, topic: 'Cash Flow' }
        ],
    },
    {
        question: 'What is considered a good practice for managing business savings?',
        answers: [
            { text: 'Spending all savings on new ventures', value: 0, topic: 'Savings' },
            { text: 'Keeping a reserve for emergencies and future investments', value: 1, topic: 'Savings' },
            { text: 'Investing all savings in high-risk assets', value: 0, topic: 'Savings' }
        ],
    },
];
    // ... Add more questions


// The main quiz component
const Quiz = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [name, setName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    
    const startQuiz = () => {
      setQuizStarted(true);
    };

    const getRecommendations = (scorePercentage) => {
        if (scorePercentage < 50) {
          return 'We recommend studying basic financial concepts, focusing on budgeting and saving.';
        } else if (scorePercentage < 70) {
          return 'Consider exploring investment strategies to improve your financial literacy.';
        } else {
          return 'Keep up the good work! Continue exploring advanced financial concepts to further improve.';
        }
      };
    const handleAnswerOptionClick = (value) => {
        setScore(score + value);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          // Calculate the percentage score
          const scorePercentage = ((score + value) / questions.length) * 100;
          const grade = getGrade(scorePercentage);
    
          // Set the modal content here
          setModalContent({
            score: score + value,
            scorePercentage,
            grade,
          });
          setShowModal(true);
        }
    };
    
    const getGrade = (scorePercentage) => {
        if (scorePercentage >= 90) return 'A';
        if (scorePercentage >= 80) return 'B';
        if (scorePercentage >= 70) return 'C';
        if (scorePercentage >= 60) return 'D';
        if (scorePercentage >= 50) return 'E';
        return 'F';
    };
    return (
        <div className="min-h-screen bg-orange-100 py-20">
          {!quizStarted ? (
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Your Name to Begin</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                placeholder="Full Name"
              />
              <button 
                className="text-white bg-orange-600 rounded px-4 py-2"
                onClick={startQuiz}
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="mt-12 md:mt-24 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
              <div className="mb-4 text-2xl font-bold">
                {questions[currentQuestion].question}
              </div>
              <div>
              {questions[currentQuestion].answers.map((answer, index) => (
    <button
      onClick={() => handleAnswerOptionClick(answer.value)}
      key={index}
      className="mb-2 text-white bg-orange-500 rounded px-4 py-2 block w-full"
    >
      {answer.text}
    </button>
                ))}
              </div>
            </div>
          )}
    
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Your Total Score: {modalContent.score}/{questions.length}</h2>
                <h3 className="text-xl mb-2">Score Percentage: {modalContent.scorePercentage.toFixed(2)}%</h3>
                <h3 className="text-xl mb-4">Your Grade: Grade {modalContent.grade}</h3>
                <button 
                  className="text-white bg-orange-500 rounded px-4 py-2"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
    );
          }
    export default Quiz;