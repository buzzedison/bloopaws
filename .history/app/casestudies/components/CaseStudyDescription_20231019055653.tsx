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
    results: string[];
    children?: React.ReactNode;
    link:string;
};

const CaseStudyDescription: React.FC<Props> = ({ title, description, links, imageUrl, challenge, solution, results }) => {
  return (
    <div className="container mx-auto md:w-3/4 w-full p-10 bg-gray-50 rounded-lg shadow-md space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
      </div>

      {links && links.length > 0 && (
        <div className="mt-4 flex flex-wrap  gap-4">
          {links.map((link, index) => (
            <Link key={index} href={link.url}className="text-lg text-blue-500 hover:text-blue-600 transition-colors duration-300">
                {link.text}
              
            </Link>
          ))}
        </div>
      )}

      {challenge && (
        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-gray-800 border-b-2 border-gray-200 pb-2">The Challenge</h2>
          <p className="text-lg text-gray-600">{challenge}</p>
        </section>
      )}

      {solution && (
        <section className="space-y-6">
          <h2 className="text-3xl font-medium text-gray-800 border-b-2 border-gray-200 pb-2">The Solution</h2>
          <p className="text-lg text-gray-600">{solution}</p>
          {imageUrl && <Image width="800" height={600} src={imageUrl} alt={title} className="rounded-lg object-cover shadow-lg" />}
        </section>
      )}

       {/* Results Section */}
       {results && results.length > 0 && (
    <section className="space-y-4">
        <h2 className="text-3xl font-medium text-gray-800 border-b-2 border-gray-200 pb-2">The Results</h2>
        <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            {results.map((result, index) => (
                <li key={index}>{result}</li>
            ))}
        </ul>
    </section>
)}

    </div>
  );
};

export default CaseStudyDescription;
