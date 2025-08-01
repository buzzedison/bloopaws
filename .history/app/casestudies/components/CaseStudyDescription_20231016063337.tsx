"use client"
import React from 'react';
import Image from "next/image"
import Link from "next/link"

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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-8">
      
      <h1 className="text-3xl font-extrabold mb-4">{title}</h1>
      <p className="text-gray-600">{description}</p>
    
      {links && links.length > 0 && (
        <ul className="list-disc pl-5 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.url}>
                <a target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {challenge && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">The Challenge</h2>
          <p className="text-gray-600">{challenge}</p>
        </section>
      )}

      {solution && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">The Solution</h2>
          <p className="text-gray-600">{solution}</p>
          {imageUrl && <Image width="800" height={600} src={imageUrl} alt={title} className="mb-4 w-full h-auto rounded-lg object-cover" />}
        </section>
      )}
    </div>
  );
};

export default CaseStudyDescription;
