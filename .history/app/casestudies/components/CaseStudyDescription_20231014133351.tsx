"use client"
import React from 'react';

type Props = {
  title: string;
  description: string;
  links?: { text: string; url: string }[];
  imageUrl?: string;
  challenge?: string;
  solution?: string;
};

const CaseStudyDescription: React.FC<Props> = ({ title, description, links, imageUrl, challenge, solution }) => {
  return (
    <div className="p-8 bg-white rounded shadow-md">
      {imageUrl && <img src={imageUrl} alt={title} className="mb-4 w-full h-auto rounded" />}

      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{description}</p>

      {links && links.length > 0 && (
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}

      {challenge && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">The Challenge</h2>
          <p>{challenge}</p>
        </section>
      )}

      {solution && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">The Solution</h2>
          <p>{solution}</p>
        </section>
      )}
    </div>
  );
};

export default CaseStudyDescription;