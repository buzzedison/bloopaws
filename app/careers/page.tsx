import { Metadata } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import CareersList from './components/CareersList';
import DepartmentFilter from './components/DepartmentFilter';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Careers | Bloop Global',
  description: 'Join our team and help shape the future of technology',
};

const careersQuery = groq`
*[_type == "career" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  department,
  location,
  type,
  experience,
  summary,
  salary,
  publishedAt
}`;

export default async function CareersPage() {
  const careers = await client.fetch(careersQuery);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Join Our Team at</span>
                  <span className="block text-red-600">Bloop Global</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Join us in our mission to revolutionize the digital landscape. We're looking for passionate individuals who want to make a difference.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Work With Us?
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              We offer competitive benefits and a culture that promotes growth and innovation.
            </p>
          </div>
        </div>
        <div className="mt-10 pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Remote First
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-red-600">
                      100%
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Team Members
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-red-600">
                      50+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Countries
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-red-600">
                      15
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <DepartmentFilter careers={careers} />
          </div>
          <main className="lg:col-span-9">
            <CareersList careers={careers} />
          </main>
        </div>
      </div>
    </div>
  );
} 