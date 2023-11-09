// components/InvestmentCriteria.tsx
import { FC } from 'react';
import Image from 'next/image';

interface CriteriaProps {
  title: string;
  description: string;
  iconPath: string;
}

const criteriaData: CriteriaProps[] = [
  {
    title: 'Complementary Team',
    description: 'A balanced team with a mix of skills and experiences.',
    iconPath: '/icons/team.svg', // replace with your path to icon
  },
  {
    title: 'Market Demand',
    description: 'Evidence of demand for your product or service in the market.',
    iconPath: '/icons/market.svg', // replace with your path to icon
  },
  {
    title: 'Sustainable Model',
    description: 'A business model that promises growth and sustainability.',
    iconPath: '/icons/sustainable.svg', // replace with your path to icon
  },
  {
    title: 'Synergy with Values',
    description: 'Alignment with FundLab and Bloop Global\'s core values.',
    iconPath: '/icons/values.svg', // replace with your path to icon
  },
];

const InvestmentCriteria: FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Investment Criteria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {criteriaData.map((criterion, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center">
              <Image src={criterion.iconPath} width={50} height={50} alt={criterion.title} />
            </div>
            <h3 className="text-lg font-semibold text-center mt-4">{criterion.title}</h3>
            <p className="text-center mt-2">{criterion.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentCriteria;
