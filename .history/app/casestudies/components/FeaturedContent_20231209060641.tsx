import Image from 'next/image';
import React from 'react';
import Link from "next/link"

const FeaturedContent: React.FC = () => {
 
  return (
    <div className="bg-red-50 ">
      {/* First Section - Image Left */}
      <div className="flex flex-col md:flex-row justify-between items-center p-0 space-y-6 md:space-y-0">
      
        {/* Left - Image Section */}
        <div className="w-full md:w-1/2 relative h-56 md:h-96">
          <Image src="/images/workwoman.jpg" alt="Woman reading" fill={true} 	style={{objectFit: "cover"}} className="" />
        </div>

        {/* Right - Content Section */}
        <div className="w-full md:w-1/2 space-y-6 md:px-10 sm:px-4 py-0 sm:py-4">
          <h1 className="text-4xl font-bold text-gray-900 pt-4">Fundlab to support SMEs</h1>
          <p className="text-lg text-gray-700">
          FundLab is the investment arm of Bloop Global.
Elevating African startups through investment, guidance, and resources.
          </p>
          {/* <Link href="#" className="text-red-600 font-medium hover:underline hover:text-red-800 transition duration-300">Rise to the moment →</Link> */}
        </div>
      </div>

      {/* Second Section - Image Right */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center md:space-y-0">

        {/* Right - Image Section */}
        <div className="w-full md:w-1/2 relative h-56 md:h-96">
          <Image src="/images/crowd.jpg" alt="Woman reading" fill={true} 	style={{objectFit: "cover"}} className="" />
        </div>

        {/* Left - Content Section */}
        <div className="w-full md:w-1/2  md:px-10 sm:px-4 py-0 sm:py-4">
          <h1 className="text-4xl font-bold text-gray-900 py-4">Discover the World
Through Stories</h1>
          <p className="text-lg text-gray-700">
          A visionary platform designed to empower creators by providing a space to showcase their work, earn from their creativity, and connect with like-minded individuals. 
          </p>
          <Link href="https://crowdpen.co" className="text-red-600 font-medium hover:underline hover:text-red-800 transition duration-300">Learn more →</Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedContent;
