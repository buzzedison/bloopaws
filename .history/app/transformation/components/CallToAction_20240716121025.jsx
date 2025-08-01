"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Ready to Grow Smarter & Move Faster?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Contact Bloop Global today for a free consultation and discover how we can help you unlock your digital potential.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Get Started
                </motion.button>
              </form>
            </div>
            <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-12">
              <motion.img
                src="/images/digitala.png"
                alt="Growth Illustration"
                className="max-w-full h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;