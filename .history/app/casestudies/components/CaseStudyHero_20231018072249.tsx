// components/CaseStudyHero.tsx
import React from 'react';
import Image from "next/image";

const CaseStudyHero = ({ title, subtitle, imageUrl, buttonText }: { title: string, subtitle: string, imageUrl: string, buttonText: string }) => {
  return (
    <div className="relative min-h-screen bg-black">
      <Image width={1200} height={450} src={imageUrl} alt="Case Study Background" className="absolute inset-0 object-cover w-full h-full opacity-70" />

      {/* This div contains the text and button, now placed bottom-left */}
      <div className="absolute bottom-0 left-0 z-10 flex flex-col p-8 text-white space-y-4">
        <h1 className="text-4xl md:text-6xl mr-0 md:mr-24 font-extrabold leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl">
          {subtitle}
        </p>
        <button className="w-1/2 px-6 py-3 font-semibold rounded bg-purple-900 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CaseStudyHero;
