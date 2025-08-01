"use client"
import { motion } from 'framer-motion';
import React from 'react';

const SolutionHead = () => {
  return (
    <motion.section 
      className="min-h-screen flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white md:w-1/2 flex items-center justify-center">
        <motion.div 
          className="p-10 md:p-20 text-center"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            The Solution? <br/> <span className="text-3xl md:text-4xl">Get More People to Your Website and Turn Them Into Customers.</span>
          </h1>
        </motion.div>
      </div>
      
      <div className="bg-white text-gray-800 md:w-1/2 flex items-center">
        <motion.div 
          className="p-10 md:p-20"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-xl md:text-3xl mb-8">
            Attract visitors, keep them engaged, and convert them with the right approach:
          </p>
          <ul className="text-lg md:text-2xl space-y-4 mb-8">
            <li>
              <span className="font-bold text-red-600 text-2xl md:text-4xl">1.</span> Optimize for speed and performance
            </li>
            <li>
              <span className="font-bold text-red-600 text-2xl md:text-4xl">2.</span> Create an intuitive, user-focused design 
            </li>
            <li>
              <span className="font-bold text-red-600 text-2xl md:text-4xl">3.</span> Craft compelling, benefit-driven copy
            </li>
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl hover:from-red-700 hover:to-red-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Transform Your Website Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SolutionHead;