// components/FeaturedContent.tsx

import Image from 'next/image';
import React from 'react';

const FeaturedContent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-10 bg-white space-y-6 md:space-y-0">
      
      {/* Left - Image Section */}
      <div className="w-full md:w-1/2 relative h-56 md:h-full">
        <Image src="/images/workwoman.jpg" alt="Woman reading" layout="fill" objectFit="contain" className="rounded-lg" />
      </div>

      {/* Right - Content Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Women in the Workplace 2023</h1>
        <p className="text-lg text-gray-700">
          Women are more ambitious than ever, and workplace flexibility is fueling them. Yet despite some hard-fought gains, women’s representation is not keeping pace. That’s according to the latest Women in the Workplace report from McKinsey, in partnership with LeanIn.org.
        </p>
        <a href="#" className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-300">Rise to the moment →</a>
      </div>
    </div>
  );
}

export default FeaturedContent;
