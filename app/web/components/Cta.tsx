"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link"

const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 to-red-900 min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Real talk! stop overthinking and start making moves.
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Hit that button, book a call, and let's get this show on the road!
        </p>
        <Link prefetch={false} href="/contact">
        <motion.button
          className="bg-gradient-to-r from-red-800 to-red-900 text-white text-lg md:text-xl font-semibold py-4 px-8 rounded-full hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
     Hit Me Now !
        </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CTA;