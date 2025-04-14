import React from 'react';
import Image from 'next/image';
import heroImage from '../public/hero-image.jpg';

export default function HeroSection() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="animate-fade-in"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-8">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in animate-delay-200">
          Grow Smarter & Move Faster: Go Digital with Bloop Global.
        </h1>
        <p className="text-lg mb-8 animate-fade-in animate-delay-400">
          Unlock the power of digital transformation. We're your partners in
          building a smarter, more efficient business for the future.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-fade-in animate-delay-600">
          Schedule a Free Consultation
        </button>
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