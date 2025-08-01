"use client"
import React from 'react';
import Image from "next/image";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
    links?: { text: string; url: string }[];
    imageUrl: string;
    challenge: string;
    solution: string;
    children?: React.ReactNode;
};

const CaseStudyDescription: React.FC<Props> = ({ title, description, links, imageUrl, challenge, solution }) => {
  return (
    <div className="p-10 bg-white rounded-lg shadow-xl space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    
      {links && links.length > 0 && (
        <div className="flex flex-wrap justify-center space-x-4">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              <span className="cursor-pointer text-blue-600 underline hover:text-blue-800">{link.text}</span>
            </Link>
          ))}
        </div>
      )}

      {challenge && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">The Challenge</h2>
          <p className="text-gray-600">{challenge}</p>
        </section>
      )}

      {solution && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">The Solution</h2>
          <p className="text-gray-600">{solution}</p>
          {imageUrl && <Image width="800" height={600} src={imageUrl} alt={title} className="w-full h-auto rounded-lg object-cover shadow-md" />}
        </section>
      )}
    </div>
  );
};

export default CaseStudyDescription;
