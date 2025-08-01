"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <motion.div className="p-10 bg-white rounded-xl shadow-2xl space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      
      {/* Header */}
      <div className="flex flex-col items-center space-y-6">
        <motion.h1 className="text-5xl font-black text-gray-900" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>{title}</motion.h1>
        <motion.p className="text-xl text-gray-700 max-w-3xl  leading-relaxed" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>{description}</motion.p>
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              <motion.span className="text-xl text-blue-600 hover:text-blue-700 transition-colors duration-300 cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {link.text}
              </motion.span>
            </Link>
          ))}
        </div>
      )}

      {/* Challenge */}
      {challenge && (
        <motion.div className="p-6 rounded-xl shadow-lg space-y-6" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-4xl font-semibold text-gray-900">The Challenge</h2>
          <p className="text-xl text-gray-700">{challenge}</p>
        </motion.div>
      )}

      {/* Solution */}
      {solution && (
        <motion.div className="p-6 rounded-xl shadow-lg space-y-6" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h2 className="text-4xl font-semibold text-gray-900">The Solution</h2>
          <p className="text-xl text-gray-700">{solution}</p>
          {imageUrl && <Image width="800" height={600} src={imageUrl} alt={title} className="rounded-xl object-cover shadow-lg mt-6" />}
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div className="p-6 rounded-xl shadow-lg space-y-6" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h2 className="text-4xl font-semibold text-gray-900">The Results</h2>
          <p className="text-xl text-gray-700">{results}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CaseStudyDescription;