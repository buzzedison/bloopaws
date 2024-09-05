"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'How It Works', href: '/' },
    { name: 'Pricing', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Who We Are', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-3xl font-bold text-white">
              Bloop
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                  onHoverStart={() => setActiveItem(item.name)}
                  onHoverEnd={() => setActiveItem('')}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                  {activeItem === item.name && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:block"
          >
            <Link
              href="/contact"
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;