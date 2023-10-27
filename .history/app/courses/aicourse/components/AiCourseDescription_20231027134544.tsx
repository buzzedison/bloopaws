"use client"
// components/AICourseDescription.tsx
import Image from "next/image";
import { motion } from "framer-motion";

export default function AICourseDescription() {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">Course Description</h2>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <motion.p className="mb-8 text-2xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              What if AI could 2x your business growth in 12 months? This exclusive training shows you how...
            </motion.p>
            {/* ...rest of your text content */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <a href="#signup" className="inline-block px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded-md shadow-lg hover:bg-red-800 transition-all">Sign Up</a>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Image className="rounded-2xl" src="/images/aievent.png" width={500} height={500} alt="AI Event" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
