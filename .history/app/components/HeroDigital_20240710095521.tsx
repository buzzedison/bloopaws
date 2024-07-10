'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '../../public/images/digital.png';

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-red-600 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Grow Smarter & Move Faster
          </h1>
          <p className="text-lg mb-8">
            Go Digital with Bloop Global. Unlock the power of digital transformation. We're your partners in building a smarter, more efficient business for the future.
          </p>
          <button className="bg-white text-red-600 hover:bg-red-100 font-bold py-3 px-6 rounded-full transition duration-300">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <Image
          src={heroImage}
          alt="Digital Transformation"
          className="max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}