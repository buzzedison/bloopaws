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
    // ... Add more questions
];

// The main quiz component
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [topicScores, setTopicScores] = useState({ Budgeting: 0, Saving: 0, Investing: 0 });
    const [showModal, setShowModal] = useState(false);
    const handleAnswerOptionClick = (value, topic) => {
        setScore(prevScore => prevScore + value);
        setTopicScores(prevTopicScores => ({
            ...prevTopicScores,
            [topic]: prevTopicScores[topic] + value
        }));
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowModal(true);
        }
    };

    const calculateGrade = (score) => {
        if (score >= 9) return 'A';
        if (score >= 7) return 'B';
        if (score >= 5) return 'C';
        if (score >= 3) return 'D';
        return 'F';
    };

    return (
        <div className="min-h-screen bg-orange-50 py-20">
            <div className="mt-12 md:mt-24 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="mb-4 text-2xl font-bold text-orange-700">
                    {questions[currentQuestion].question}
                </div>
                <div className="flex flex-col space-y-4">
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <button
                            onClick={() => handleAnswerOptionClick(answer.value, questions[currentQuestion].topic)}
                            key={index}
                            className="text-white bg-orange-500 hover:bg-orange-600 rounded px-4 py-2"
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Your Score: {score}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Grade: {calculateGrade(score)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {/* Display personalized feedback based on topics */}
                                                Areas to improve: {Object.entries(topicScores).filter(([topic, topicScore]) => topicScore < 1).map(([topic]) => topic).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                    <button onClick={() => setShowModal(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                        Close
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;

