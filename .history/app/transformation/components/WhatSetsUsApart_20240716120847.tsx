'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const differentiators = [
  {
    title: "Big-Picture Thinking",
    description: "We consider your people, processes, and culture for holistic transformation.",
    image: "/images/digitald.png"
  },
  {
    title: "Innovation Lab",
    description: "Test-drive cutting-edge technologies in a risk-free environment.",
    image: "/images/digitalb.png"
  },
  {
    title: "Industry Expertise",
    description: "Tailored solutions designed for your specific industry.",
    image: "/images/digitalc.png"
  },
  {
    title: "Always Learning",
    description: "We stay ahead of the curve with the latest digital trends.",
    image: "/images/digitala.png"
  },
  {
    title: "Measurable Results",
    description: "We set clear goals and provide regular reports to track your ROI.",
    image: "/images/measurable-results.jpg"
  }
];

const WhatSetsUsApart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % differentiators.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">What Sets Us Apart</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          We go beyond technology, focusing on the human element and your unique business needs.
        </p>
        <div className="relative h-[500px] overflow-hidden rounded-xl shadow-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={differentiators[currentIndex].image}
                alt={differentiators[currentIndex].title}
                layout="fill"
                objectFit="cover"
                className="brightness-50"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h3 className="text-3xl font-bold mb-4">{differentiators[currentIndex].title}</h3>
                <p className="text-xl max-w-2xl">{differentiators[currentIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-6">
          {differentiators.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                index === currentIndex ? 'bg-red-500 scale-125' : 'bg-gray-500'
              }`}
              aria-label={`Select ${differentiators[index].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;