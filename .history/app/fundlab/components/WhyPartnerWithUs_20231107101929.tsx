// components/WhyPartnerWithUs.tsx
import { FC } from 'react';

interface PartnerPoint {
  title: string;
  description: string;
}

const points: PartnerPoint[] = [
    {
      title: 'Expertise and Resources',
      description: 'Backed by Bloop Global, so we have the expertise and resources to set you up for success.',
    },
    {
      title: 'Proven Business Models',
      description: 'We work with businesses every day, so we know what models thrive vs. fail.',
    },
    {
      title: 'Robust Network',
      description: 'Robust network of partners and mentors to accelerate your growth.',
    },
    {
      title: 'Dedicated Fund',
      description: 'Dedicated fund for venture investments, set at 10% of Bloop Global’s revenue.',
    },
    {
      title: 'Hands-on Support',
      description: 'Hands-on support at every step, from idea to launch to scaling.',
    },
    {
      title: 'Proven Track Record',
      description: 'We’ve helped 100+ startups optimize operations, enter new markets, and build winning teams.',
    },
    {
      title: 'Experienced Advisors',
      description: 'Our advisors have decades of experience guiding businesses through different challenges.',
    },
    {
      title: 'Essential Resources',
      description: 'We offer workspaces, tech, and tools needed to turn ideas into reality.',
    },
    {
      title: 'Focused on Your Success',
      description: 'Partner with us for the knowledge, connections, and capital to take your startup to the next level. We have an expert team focused on your success.',
    }
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
