// components/CaseStudyHero.tsx
import React from 'react';

const CaseStudyHero = ({ title, subtitle, imageUrl, buttonText }: { title: string, subtitle: string, imageUrl: string, buttonText: string }) => {
  return (
    <div className="relative min-h-screen bg-gray-200">
      <img src={imageUrl} alt="Case Study Background" className="absolute inset-0 object-cover w-full h-full opacity-70" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-black">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-center pt-24">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-8">
          {subtitle}
        </p>
        <button className="px-6 py-3 font-semibold rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CaseStudyHero;
