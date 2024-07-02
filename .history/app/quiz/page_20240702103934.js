'use client';

import { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';

const quizQuestions = [
  {
    questionText: 'How would you describe your company\'s website?',
    answerOptions: [
      { answerText: 'Outdated and difficult to navigate.', score: 1 },
      { answerText: 'Functional, but not particularly engaging.', score: 2 },
      { answerText: 'Mobile-friendly and visually appealing, but lacking some key features.', score: 3 },
      { answerText: 'A high-performing, conversion-optimized machine!', score: 4 },
    ],
    category: 'websiteExperience',
  },
  {
    questionText: 'How do you track the performance of your website?',
    answerOptions: [
      { answerText: 'We don\'t really track website performance.', score: 1 },
      { answerText: 'We occasionally look at basic metrics like website traffic.', score: 2 },
      { answerText: 'We use website analytics to track key metrics like bounce rate and conversion rates.', score: 3 },
      { answerText: 'We have a robust system for tracking website data and use it to make continuous improvements.', score: 4 },
    ],
    category: 'websiteExperience',
  },
  {
    questionText: 'How does your business manage customer interactions and data?',
    answerOptions: [
      { answerText: 'We rely on spreadsheets and manual processes.', score: 1 },
      { answerText: 'We use a basic CRM system, but it\'s not fully integrated with other systems.', score: 2 },
      { answerText: 'We have a CRM system in place and are working on improving its integration and utilization.', score: 3 },
      { answerText: 'Our CRM is a central hub for managing all customer interactions and data, providing a 360-degree view of our customers.', score: 4 },
    ],
    category: 'crm',
  },
  {
    questionText: 'How effectively do you use data to personalize customer interactions?',
    answerOptions: [
      { answerText: 'We don\'t personalize interactions; we treat all customers the same.', score: 1 },
      { answerText: 'We segment our audience based on basic demographics.', score: 2 },
      { answerText: 'We try to personalize some communications, but it\'s not always consistent.', score: 3 },
      { answerText: 'We use data to tailor every interaction to individual customer preferences and needs.', score: 4 },
    ],
    category: 'crm',
  },
  {
    questionText: 'How does your business leverage data to make decisions?',
    answerOptions: [
      { answerText: 'We don\'t really use data to inform our decisions.', score: 1 },
      { answerText: 'We occasionally look at basic sales and marketing data.', score: 2 },
      { answerText: 'We use data analytics tools to track key performance indicators (KPIs) and identify trends.', score: 3 },
      { answerText: 'Data is at the heart of everything we do. We use advanced analytics to gain insights, optimize processes, and drive strategic decision-making.', score: 4 },
    ],
    category: 'dataAnalytics',
  },
  {
    questionText: 'Which of these best describes your company\'s data analytics capabilities?',
    answerOptions: [
      { answerText: 'We struggle to collect and organize our data effectively.', score: 1 },
      { answerText: 'We can generate basic reports, but struggle to extract meaningful insights.', score: 2 },
      { answerText: 'We use data visualization and some analysis to inform decisions.', score: 3 },
      { answerText: 'We have dedicated data professionals and tools to predict future trends and opportunities.', score: 4 },
    ],
    category: 'dataAnalytics',
  },
  {
    questionText: 'To what extent has your business automated its processes?',
    answerOptions: [
      { answerText: 'We haven\'t implemented any automation yet.', score: 1 },
      { answerText: 'We have automated a few basic tasks, but there\'s still a lot of manual work.', score: 2 },
      { answerText: 'We\'re actively exploring automation opportunities and have implemented some solutions.', score: 3 },
      { answerText: 'We\'ve embraced automation across our operations, freeing up our team to focus on higher-value tasks.', score: 4 },
    ],
    category: 'automation',
  },
  {
    questionText: 'What types of automation are you currently using (or considering)?',
    answerOptions: [
      { answerText: 'We\'re not using or considering automation at this time.', score: 1 },
      { answerText: 'Primarily basic marketing automation (e.g., email sequences).', score: 2 },
      { answerText: 'We\'re exploring automation for tasks like data entry, customer support, and social media.', score: 3 },
      { answerText: 'We use a combination of tools and platforms to automate across various departments.', score: 4 },
    ],
    category: 'automation',
  },
  {
    questionText: 'What is your biggest obstacle to implementing automation?',
    answerOptions: [
      { answerText: 'Lack of awareness about the benefits of automation.', score: 1 },
      { answerText: 'Budget constraints and limited resources.', score: 2 },
      { answerText: 'Concerns about the complexity of implementation.', score: 3 },
      { answerText: 'We don\'t see any obstacles; we\'re ready to automate!', score: 4 },
    ],
    category: 'automation',
  },
  {
    questionText: 'How do you envision automation impacting your business in the next 2-3 years?',
    answerOptions: [
      { answerText: 'Automation isn\'t a priority for us right now.', score: 1 },
      { answerText: 'We believe automation can improve efficiency in a few areas of our business.', score: 2 },
      { answerText: 'We see automation as a key driver of growth and competitive advantage.', score: 3 },
      { answerText: 'We\'re preparing for a future where automation is fully integrated into all aspects of our operations.', score: 4 },
    ],
    category: 'automation',
  },
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({
      websiteExperience: 0,
      crm: 0,
      dataAnalytics: 0,
      automation: 0,
    });
  
    const handleAnswerOptionClick = (category, score) => {
        setScores((prevScores) => {
          const updatedScores = {
            ...prevScores,
            [category]: prevScores[category] + score,
          };
          console.log('Previous scores:', prevScores);
          console.log('Updated scores:', updatedScores);
          return updatedScores;
        });
      
        const nextQuestion = currentQuestion + 1;
        console.log('Next question:', nextQuestion);
        if (nextQuestion < quizQuestions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          console.log('Quiz completed');
          setCurrentQuestion(nextQuestion);
        }
      };
    console.log('Current question:', currentQuestion);
    console.log('Total questions:', quizQuestions.length);
    console.log('Scores:', scores);
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mt-12">
          {currentQuestion < quizQuestions.length ? (
            <QuizQuestion
              question={quizQuestions[currentQuestion]}
              onAnswerClick={handleAnswerOptionClick}
            />
          ) : (
            <QuizResult scores={scores} />
          )}
        </div>
      </div>
    );
  }