// components/FocusAreas.tsx
import Image from 'next/image';
import { FC } from 'react';
import TechIcon from './icons/TechIcon';

interface FocusArea {
  title: string;
  description: string;
  IconComponent: FC;
}

const focusAreas: FocusArea[] = [
  {
    title: 'Technology Startups',
    description: 'Investing in cutting-edge technology ventures.',
    IconComponent: TechIcon,// Replace with your actual icon path
  },
  {
    title: 'Sustainable & Green Initiatives',
    description: 'Funding eco-friendly and sustainable projects.',
    IconComponent: TechIcon,// Replace with your actual icon path
  },
  {
    title: 'E-commerce Innovations',
    description: 'Backing innovative e-commerce solutions.',
    IconComponent: TechIcon, // Replace with your actual icon path
  },
  {
    title: 'Software as a Service (SaaS)',
    description: 'Supporting scalable SaaS business models.',
    IconComponent: TechIcon, // Replace with your actual icon path
  },
  {
    title: 'Donations for African-led Startups',
    description: 'Empowering African entrepreneurs through donations.',
    IconComponent: TechIcon, // Replace with your actual icon path
  }
];

const FocusAreas: FC = () => {
  return (
    <section className="bg-red-900">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Investment & Donation Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <Image src={area.iconPath} width={50} height={50} alt={area.title} />
                <h3 className="font-bold mt-4">{area.title}</h3>
                <p className="mt-2">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
