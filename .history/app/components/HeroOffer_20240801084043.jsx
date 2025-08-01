'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroOffer() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="md:w-1/2 flex flex-col justify-center px-8 py-16 bg-purple-600 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in animate-delay-200">
            Don't Miss Out!
            <span className="block text-yellow-300 mt-2">50% Off Website Design & Development</span>
          </h1>
          <p className="text-lg mb-8 animate-fade-in animate-delay-400">
            Our biggest sale ever ends soon. Get the website you deserve at a price you'll love.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="https://airtable.com/appN08604EcWr0e4L/pagPlniVKUdd9LlZZ/form">
              <button className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out animate-fade-in animate-delay-600">
                Grab This Deal
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <Image
          src="/images/websiteoffer.png"
          alt="Website Design Offer"
          width={500}
          height={500}
          className="max-h-[100vh] object-contain animate-fade-in"
        />
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
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