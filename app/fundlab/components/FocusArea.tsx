// components/FocusAreas.tsx
import Image from 'next/image';
import { FC } from 'react';

interface FocusArea {
  title: string;
  description: string;
 
}

const focusAreas: FocusArea[] = [
  {
    title: 'Technology Startups',
    description: 'Investing in cutting-edge technology ventures.',
    
  },
  {
    title: 'Sustainable & Green Initiatives',
    description: 'Funding eco-friendly and sustainable projects.',
   
  },
  {
    title: 'E-commerce Innovations',
    description: 'Backing innovative e-commerce solutions.',

  },
  {
    title: 'Software as a Service (SaaS)',
    description: 'Supporting scalable SaaS business models.',

  },
  {
    title: 'Donations for African-led Startups',
    description: 'Empowering African entrepreneurs through donations.',

  }
];

const FocusAreas: FC = () => {
  return (
    <section className="bg-red-900">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Investment & Donation Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => {
              // Destructure the IconComponent for use
              return (
                <div key={index} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out 
                transform hover:-translate-y-1 hover:scale-105
                ">
                
                  <h3 className="font-bold mt-4">{area.title}</h3>
                  <p className="mt-2">{area.description}</p>
                </div>
            )
          })}
        </div>
      </div>
      </div>
    </section>
  );
};

export default FocusAreas;
