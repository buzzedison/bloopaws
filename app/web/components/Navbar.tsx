"use client"

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: 'How It Works', href: '/' },
    { name: 'Pricing', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Who We Are', href: '/about' },
    { name: 'Education', href: '/education' },
    { name: 'Blog', href: '/blog' },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div ref={navRef}>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/10 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Bloop</span>
                <div className="ml-1 w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
              </Link>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                    onHoverStart={() => setActiveItem(item.name)}
                    onHoverEnd={() => setActiveItem('')}
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                    >
                      {item.name}
                    </Link>
                    <motion.div
                      layoutId={`underline-${item.name}`}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                      initial={{ opacity: 0, width: '0%' }}
                      animate={{ 
                        opacity: activeItem === item.name ? 1 : 0,
                        width: activeItem === item.name ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:block"
            >
              <Link
                href="/contact"
                className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black/90 transition duration-300 shadow-md hover:shadow-lg border border-transparent hover:border-red-600"
              >
                Get in Touch
              </Link>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-red-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none`}
                aria-label="Toggle menu"
              >
                {!isMobileMenuOpen ? (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden pt-20 bg-black/80 backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="px-6 py-8 space-y-3">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={menuItemVariants}
                  className="block w-full"
                >
                  <Link 
                    href={item.href}
                    className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                variants={menuItemVariants}
                className="pt-4 mt-4 border-t border-white/20"
              >
                <Link 
                  href="/contact"
                  className="block w-full text-center bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-black/90 transition-colors duration-200 border border-transparent hover:border-red-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;