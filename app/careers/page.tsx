import type { Metadata } from 'next/types';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import CareersList from './components/CareersList';
import { Building2, Globe2, Users2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Bloop Global',
  description: 'Join our team and help shape the future of technology',
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
  
  // Debug logs will now only show active careers
  console.log('Fetched active careers:', careers);
  console.log('Number of active careers:', careers.length);

  // Group active careers by department
  const careersByDepartment = careers.reduce((acc: any, career: any) => {
    if (!acc[career.department]) {
      acc[career.department] = [];
    }
    acc[career.department].push(career);
    return acc;
  }, {});

  // Debug grouped careers
  console.log('Careers by department:', careersByDepartment);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center">
            <h1 className="mt-24 md:mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Join Our Team at</span>
              <span className="block text-red-600 mt-2">Bloop Global</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Help us build the future of business and technology. We're looking for exceptional people who are passionate about making a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-red-100 rounded-full">
                <Globe2 className="w-8 h-8 text-red-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Results Oriented</h3>
                <p className="mt-2 text-sm text-gray-500">No Excuses. Extreme Bias for Action.</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-red-100 rounded-full">
                <Users2 className="w-8 h-8 text-red-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Great Culture</h3>
                <p className="mt-2 text-sm text-gray-500">Collaborative and inclusive environment</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-red-100 rounded-full">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Growth Focus</h3>
                <p className="mt-2 text-sm text-gray-500">Opportunities for career advancement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find your next opportunity at Bloop Global
          </p>
        </div>

        {Object.entries(careersByDepartment).map(([department, departmentCareers]: [string, any]) => (
          <div key={department} className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">
              {department}
            </h3>
            <CareersList careers={departmentCareers} />
          </div>
        ))}

        {careers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No open positions at the moment. Please check back later or follow us on social media for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 