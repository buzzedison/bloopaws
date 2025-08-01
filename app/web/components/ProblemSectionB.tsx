"use client"
import { motion } from 'framer-motion';
import React from 'react';

const ConversionChallenges = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-red-700 to-red-800 text-white py-32" // Increased padding top and bottom
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-white font-semibold tracking-wide uppercase">Conversion Killers</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Don't Let These Mistakes Ruin Your Conversions
          </p>
        </div>

        <div className="mt-16"> {/* Increased top margin for better spacing */}
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-red-500 text-xl font-bold">
                  1
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Poor Loading Speeds</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-white">
                If your site takes too long to load, visitors will leave before they can see what you have to offer. Slow websites reduce conversions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-red-500 text-xl font-bold">
                  2
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Unintuitive Design</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-white">
                Aesthetics alone will not be enough for a design that was not built with the user in mind. If your website is not intuitive and does not guide users, they will leave out of frustration.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-red-500 text-xl font-bold">
                  3
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Ineffective Copy</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-white">
                Pretty design is pointless if your messaging is bland or disjointed. Your content must engage, inspire, and clearly communicate to visitors what benefits they will gain.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversionChallenges;