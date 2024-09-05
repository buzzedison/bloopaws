"use client"
import { motion } from 'framer-motion';
import React from 'react';
import Image from "next/image"

const ProblemSection = () => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-red-600 to-red-700 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center md:text-right p-10 md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">You have a "people are not coming to my website problem"</h1>
        <p className="text-xl md:text-2xl mb-8">..And to make matters worse, the few visitors you do receive are not converting into enquiries.</p>
      </div>
      <div className="text-center md:text-left p-10 md:w-1/2">
        <div className="flex items-center mb-5">
          <Image
            src="/images/avatarwonder.png"
            alt="Wondering Avatar"
            width={100}
            height={100}
            className="mr-3"
          />
          <h2 className="text-3xl md:text-4xl font-bold">You are wondering ..</h2>
        </div>
        <p className="text-lg md:text-xl">How do you get people to visit your website and then convert those clicks to customers ?</p>
      </div>
    </motion.div>
  );
};

export default ProblemSection;