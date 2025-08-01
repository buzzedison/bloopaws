"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    title: string;
    description: string;
    links?: { text: string; url: string }[];
    imageUrl: string;
    challenge: string;
    solution: string;
    results: string;
};

const CaseStudyDescription: React.FC<Props> = ({ title, description, links, imageUrl, challenge, solution, results }) => {
  return (
    <div className="p-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl flex flex-col items-center space-y-10">
      
      {/* Header */}
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-6xl font-black text-gray-900 mb-4">{title}</h1>
        <p className="text-2xl text-gray-800 max-w-4xl text-center leading-relaxed">{description}</p>
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              <span className="text-2xl text-blue-600 hover:text-blue-700 transition-transform duration-300 transform cursor-pointer hover:scale-105">
                {link.text}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Cards for Challenge, Solution, Results */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Challenge Card */}
        {challenge && (
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">The Challenge</h2>
            <p className="text-xl text-gray-700">{challenge}</p>
          </div>
        )}
        
        {/* Solution Card */}
       
            {solution && (
        <div className="bg-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6 relative">
          <h2 className="text-4xl font-semibold text-gray-900">The Solution</h2>
          <p className="text-xl text-gray-800">{solution}</p>
          {imageUrl && (
            <div className="mt-6 relative overflow-hidden rounded-xl">
              <Image width="800" height={600} src={imageUrl} alt={title} className="object-cover transform transition-transform hover:scale-110 duration-300" />
            </div>
          )}
        </div>
      )}
            {results && (
        <div className="bg-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6 relative">
          <h2 className="text-4xl font-semibold text-gray-900">The Results</h2>
          <p className="text-xl text-gray-800">{results}</p>
          {/* Optionally, you can add any relevant media (like graphs or charts) related to the results here */}
        </div>
      )}
      </div>
    </div>
  );
};


export default CaseStudyDescription