import Image from 'next/image';
import React from 'react';

const FeaturedContent: React.FC = () => {
 
  return (
    <div className="bg-red-50 ">
      {/* First Section - Image Left */}
      <div className="flex flex-col md:flex-row justify-between items-center p-10 space-y-6 md:space-y-0">
      
        {/* Left - Image Section */}
        <div className="w-full md:w-1/2 relative h-56 md:h-96">
          <Image src="/images/workwoman.jpg" alt="Woman reading" fill={true} 	style={{objectFit: "cover"}} className="rounded-lg" />
        </div>

        {/* Right - Content Section */}
        <div className="w-full md:w-1/2 space-y-6 px-10">
          <h1 className="text-4xl font-bold text-gray-900">Women in the Workplace 2023</h1>
          <p className="text-lg text-gray-700">
            Women are more ambitious than ever, and workplace flexibility is fueling them. Yet despite some hard-fought gains, women’s representation is not keeping pace. That’s according to the latest Women in the Workplace report from McKinsey, in partnership with LeanIn.org.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-300">Rise to the moment →</a>
        </div>
      </div>

      {/* Second Section - Image Right */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center md:space-y-0">

        {/* Right - Image Section */}
        <div className="w-full md:w-1/2 relative h-56 md:h-98">
          <Image src="/images/workwoman.jpg" alt="Woman reading" fill={true} 	style={{objectFit: "cover"}} className="" />
        </div>

        {/* Left - Content Section */}
        <div className="w-full md:w-1/2  px-10">
          <h1 className="text-4xl font-bold text-gray-900">Women's Achievements in Tech</h1>
          <p className="text-lg text-gray-700">
            Technology sectors have seen a tremendous surge in female leaders and innovators. These women are not just breaking the glass ceiling; they are reshaping the industry. Dive into the inspiring journey of women in tech.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-300">Discover their stories →</a>
        </div>
      </div>
    </div>
  );
}

export default FeaturedContent;
