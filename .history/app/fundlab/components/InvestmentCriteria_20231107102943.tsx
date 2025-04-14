// components/InvestmentCriteria.tsx
import { FC } from 'react';

const investmentCriteria: string[] = [
  'Complementary founding team',
  'Demonstrable market demand',
  'Scalable and sustainable business model',
  'Synergy with FundLab and Bloop Global\'s values'
];

const InvestmentCriteria: FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Investment Criteria</h2>
        <ul className="list-disc list-inside space-y-4 text-lg text-gray-800 mx-auto md:w-3/4">
          {investmentCriteria.map((criterion, index) => (
            <li key={index}>{criterion}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InvestmentCriteria;
