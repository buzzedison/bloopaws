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
    <div className="p-10 bg-white rounded-xl shadow-2xl space-y-10">
      
      {/* Header */}
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-black text-gray-900">{title}</h1>
        <p className="text-xl text-gray-700 max-w-3xl  leading-relaxed">{description}</p>
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              <span className="text-xl text-blue-600 hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                {link.text}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Challenge */}
      {challenge && (
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold text-gray-900">The Challenge</h2>
          <p className="text-xl text-gray-700">{challenge}</p>
        </section>
      )}

      {/* Solution */}
      {solution && (
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold text-gray-900">The Solution</h2>
          <p className="text-xl text-gray-700">{solution}</p>
          {imageUrl && <Image width="800" height={600} src={imageUrl} alt={title} className="rounded-xl object-cover shadow-lg mt-6" />}
        </section>
      )}

      {/* Results */}
      {results && (
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold text-gray-900">The Results</h2>
          <p className="text-xl text-gray-700">{results}</p>
        </section>
      )}
    </div>
  );
};

export default CaseStudyDescription;
