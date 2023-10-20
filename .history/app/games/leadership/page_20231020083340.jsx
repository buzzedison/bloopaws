
"use client"
import React, { useState } from 'react';

// Define the questions and answers
const questions = [
    {
      question: 'When faced with a problem, you tend to:',
      answers: [
        { text: 'Look for input from team members', style: 'Democratic' },
        { text: 'Provide a clear direction for solving the problem', style: 'Authoritative' },
        { text: 'Allow the team to solve it on their own', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you prefer to make decisions?',
      answers: [
        { text: 'Collectively with the team', style: 'Democratic' },
        { text: 'Based on your own expertise', style: 'Authoritative' },
        { text: 'Letting individuals make their own decisions', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you respond to failure?',
      answers: [
        { text: 'Discuss the failure with the team to learn from mistakes', style: 'Democratic' },
        { text: 'Analyze what went wrong and set a new direction', style: 'Authoritative' },
        { text: 'Believe it’s part of the learning process for the team', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you delegate tasks?',
      answers: [
        { text: 'Based on discussion and team consensus', style: 'Democratic' },
        { text: 'Assign tasks based on your understanding of strengths and weaknesses', style: 'Authoritative' },
        { text: 'Allow team members to choose their own tasks', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you prefer to provide feedback?',
      answers: [
        { text: 'In a group setting to promote discussion', style: 'Democratic' },
        { text: 'Individually and directly', style: 'Authoritative' },
        { text: 'On an as-needed basis', style: 'Laissez-faire' },
      ],
    },

    {
        question: 'How do you approach setting goals for your team?',
        answers: [
          { text: 'Collaborate with the team to set achievable goals', style: 'Democratic' },
          { text: 'Set challenging goals to push the team to excel', style: 'Authoritative' },
          { text: 'Allow team members to set their own goals', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you handle conflict within your team?',
        answers: [
          { text: 'Facilitate a discussion to resolve issues collectively', style: 'Democratic' },
          { text: 'Make a decision to resolve the conflict quickly', style: 'Authoritative' },
          { text: 'Allow team members to work it out independently', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you approach communication with your team?',
        answers: [
          { text: 'Maintain open channels for dialogue and feedback', style: 'Democratic' },
          { text: 'Provide clear directives and updates', style: 'Authoritative' },
          { text: 'Keep communication informal and as-needed', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you handle a team member who isn’t meeting expectations?',
        answers: [
          { text: 'Discuss with them and the team to find supportive solutions', style: 'Democratic' },
          { text: 'Provide direct feedback and clear performance objectives', style: 'Authoritative' },
          { text: 'Believe they will improve with time and experience', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you approach innovation and new ideas?',
        answers: [
          { text: 'Encourage team discussion and collaborative brainstorming', style: 'Democratic' },
          { text: 'Provide a vision and challenge the team to innovate', style: 'Authoritative' },
          { text: 'Allow team members to explore new ideas independently', style: 'Laissez-faire' },
        ],
    }
    
    // ...additional questions
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
