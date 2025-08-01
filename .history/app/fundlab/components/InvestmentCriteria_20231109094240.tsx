// components/InvestmentCriteria.tsx
import { FC } from 'react';
import Image from 'next/image';

interface CriteriaProps {
  title: string;
  description: string;
  imagePath: string;
}

const criteriaData: CriteriaProps[] = [
  {
    title: 'Complementary Team',
    description: 'A balanced team with a mix of skills and experiences.',
    imagePath: '/imagesfund/team.png', // Replace with the actual path to your image file within the public directory
  },
  {
    title: 'Market Demand',
    description: 'Evidence of demand for your product or service in the market.',
    imagePath: '/images/market.png', // Replace with the actual path to your image file
  },
  {
    title: 'Sustainable Model',
    description: 'A business model that promises growth and sustainability.',
    imagePath: '/images/sustainable.png', // Replace with the actual path to your image file
  },
  {
    title: 'Synergy with Values',
    description: 'Alignment with our core values.',
    imagePath: '/images/values.png', // Replace with the actual path to your image file
  },
  // Add more criteria as needed
];

const InvestmentCriteria: FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Investment Criteria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {criteriaData.map((criterion, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center items-center">
              <Image src={criterion.imagePath} width={50} height={50} alt={criterion.title} layout="fixed" />
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
