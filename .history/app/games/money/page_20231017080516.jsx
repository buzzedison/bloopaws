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

    const handleAnswerOptionClick = (value, topic) => {
        setScore(score + value);
        setTopicScores({ ...topicScores, [topic]: topicScores[topic] + value });
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            // Display the results
            // For now, let's just log the results to the console
            console.log(`Overall Score: ${score + value}`);
            console.log(`Topic Scores:`, topicScores);
        }
    };

    return (
        <div>
            <div>
                {questions[currentQuestion].question}
            </div>
            <div>
                {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                        onClick={() => handleAnswerOptionClick(answer.value, questions[currentQuestion].topic)}
                        key={index}
                    >
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
