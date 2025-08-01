"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const faqs = [
    { question: "What is Bloop?", answer: "Bloop is a design and development agency that focuses on delivering cutting-edge websites and apps with an emphasis on user experience." },
    { question: "How long does it take to complete a project?", answer: "For our One-Time Package, we aim to launch projects within 4-6 weeks depending on complexity." },
    { question: "What is included in the One-Time Package?", answer: "Our package includes branding, copywriting, and a conversion-focused landing page, tailored to your business needs." },
    { question: "What is the Monthly Retainer best for?", answer: "The Monthly Retainer is ideal for businesses needing ongoing design, development, and support for scaling." },
    { question: "How do revisions work?", answer: "We offer 2 rounds of revisions for the One-Time Package, and unlimited revisions for the Retainer to ensure your satisfaction." },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-red-800 text-white p-10 overflow-hidden flex items-center justify-center">
      {/* Dynamic Background with subtle motion */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-900 to-red-950 opacity-50"
        style={{
          transform: `translate(${mousePosition.x / 40}px, ${mousePosition.y / 40}px)`,
        }}
      />
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
       Have Questions?
        </motion.h1>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-opacity-20 bg-red-700 rounded-lg backdrop-blur-lg shadow-xl transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              layout
            >
              <motion.h2
                className="text-2xl font-semibold cursor-pointer mb-4"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                whileHover={{ color: "#FF006E" }}
              >
                {faq.question}
              </motion.h2>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-100"
                    transition={{ duration: 0.5 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
