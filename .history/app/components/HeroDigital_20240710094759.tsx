'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '../../public/images/digital.png';

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-900 text-white">
      <div className="md:w-1/2 p-8 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in animate-delay-200">
          Grow Smarter & Move Faster
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animate-delay-400">
          Go Digital with Bloop Global. Unlock the power of digital transformation. We're your partners in building a smarter, more efficient business for the future.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded animate-fade-in animate-delay-600">
          Schedule a Free Consultation
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center animate-fade-in">
        <Image
          src={heroImage}
          alt="Digital Transformation"
          className="max-h-[80vh]"
        />
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}