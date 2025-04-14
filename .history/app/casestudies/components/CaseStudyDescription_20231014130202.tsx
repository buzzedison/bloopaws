"use client"
import React from 'react';

type Props = {
  title: string;
  description: string;
  links?: { text: string; url: string }[];
};

const CaseStudyDescription: React.FC<Props> = ({ title, description, links }) => {
  return (
    <div className="p-8 bg-white rounded shadow-md">
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
    </div>
  );
};

export default CaseStudyDescription;
