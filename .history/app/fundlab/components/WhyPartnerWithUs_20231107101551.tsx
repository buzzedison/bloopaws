// components/WhyPartnerWithUs.tsx
import { FC } from 'react';

interface PartnerPoint {
  title: string;
  description: string;
}

const points: PartnerPoint[] = [
  {
    title: 'Expertise and Resources',
    description: 'Backed by Bloop Global, we have the expertise and resources to set you up for success.',
  },
  // ... Add other points here
];

const WhyPartnerWithUs: FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Why Partner With FundLab</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((point, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
            <p>{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPartnerWithUs;
