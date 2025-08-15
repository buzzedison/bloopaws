import type { Metadata } from 'next/types';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import CareersClient from './CareersClient';
import { Target, Rocket, Heart, Zap, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join the Crew | Bloop Global',
  description: 'Ready to build something incredible? Join our team of builders, dreamers, and problem-solvers who turn big ideas into reality.',
  keywords: ['careers', 'jobs', 'bloop global', 'startup jobs', 'technology careers', 'remote work'],
  openGraph: {
    title: 'Join the Crew | Bloop Global',
    description: 'Ready to build something incredible? Join our team of builders, dreamers, and problem-solvers.',
    type: 'website',
  },
};

const careersQuery = groq`*[_type == "career" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  department,
  location,
  type,
  experience,
  summary,
  salary,
  publishedAt,
  isActive
}`;

export default async function CareersPage() {
  const careers = await client.fetch(careersQuery);
  
  // Group active careers by department
  const careersByDepartment = careers.reduce((acc: any, career: any) => {
    if (!acc[career.department]) {
      acc[career.department] = [];
    }
    acc[career.department].push(career);
    return acc;
  }, {});

  return (
    <CareersClient 
      careers={careers}
      careersByDepartment={careersByDepartment}
    />
  );
} 