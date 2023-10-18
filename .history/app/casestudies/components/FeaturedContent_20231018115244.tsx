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
          <h1 className="text-4xl font-bold text-gray-900 pt-4">Funddesk to support SMEs</h1>
          <p className="text-lg text-gray-700">
           Funddesk a subset of our fundlab initiatve provided seed funds to a small number of SMEs.
           They showup for a pitch event, we select winners and provide them with softlanding funding.
          </p>
          <Link href="#" className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-300">Rise to the moment →</Link>
        </div>
      </div>

      {/* Second Section - Image Right */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center md:space-y-0">

        {/* Right - Image Section */}
        <div className="w-full md:w-1/2 relative h-56 md:h-96">
          <Image src="/images/real.png" alt="Woman reading" fill={true} 	style={{objectFit: "cover"}} className="" />
        </div>

        {/* Left - Content Section */}
        <div className="w-full md:w-1/2  md:px-10 sm:px-4 py-0 sm:py-4">
          <h1 className="text-4xl font-bold text-gray-900 py-4">Women's Achievements in Tech</h1>
          <p className="text-lg text-gray-700">
            Technology sectors have seen a tremendous surge in female leaders and innovators. These women are not just breaking the glass ceiling; they are reshaping the industry. Dive into the inspiring journey of women in tech.
          </p>
          <Link href="#" className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-300">Discover their stories →</Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedContent;
