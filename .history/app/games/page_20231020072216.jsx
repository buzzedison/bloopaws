"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';

const Games = () => {
  return (
    <div className="pt-24 min-h-screen bg-wine-100 py-20">
      <div className="text-center mb-12 mt-12">
        <h1 className="text-4xl font-bold text-wine-900">Business Games</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-wine-900">Know Your Entrepreneur Type</h2>
          <p className="mb-8 text-wine-700">Discover what type of entrepreneur you are.</p>
          <Link href="/entrepreneur-quiz">
            <button className="bg-wine-600 text-white rounded px-4 py-2">Go to Game</button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-wine-900">Test Your Financial Literacy</h2>
          <p className="mb-8 text-wine-700">Evaluate your understanding of basic financial concepts.</p>
          <Link href="/financial-literacy-quiz">
            <button className="bg-wine-600 text-white rounded px-4 py-2">Go to Game</button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-wine-900">Check Your Personality Type</h2>
          <p className="mb-8 text-wine-700">Uncover insights into your personality and how it affects your business decisions.</p>
          <Link href="/personality-quiz">
            <button className="bg-wine-600 text-white rounded px-4 py-2">Go to Game</button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Games;