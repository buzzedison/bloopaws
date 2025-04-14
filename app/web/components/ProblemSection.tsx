"use client"
import { motion } from 'framer-motion';
import React from 'react';
import Image from "next/image"

const ProblemSection = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="text-center md:text-left p-4 md:w-1/2 md:pr-8">
            <div className="flex items-center mb-3">
              <Image
                src="/images/avatarwonder.png"
                alt="Wondering Avatar"
                width={80}
                height={80}
                className="mr-3"
              />
              <h2 className="text-2xl md:text-3xl font-bold">You are wondering ..</h2>
            </div>
            <p className="text-3xl md:text-5xl">Why are people not coming to my website ?</p>
            <p className="text-lg md:text-xl pt-4">..And to make matters worse, the few visitors you do receive are not converting into enquiries.</p>
          </div>
          <div className="text-center md:text-right p-4 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
            How do you get people to visit your website and then convert those clicks to customers?
            </h1>
           
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemSection;