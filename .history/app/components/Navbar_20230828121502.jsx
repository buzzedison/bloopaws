"use client"
// Client
import { useState } from 'react';
import Link from 'next/link';

const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white hover:text-blue-400 transition duration-300">
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 p-2 space-y-2 text-white bg-black border border-gray-800 rounded-md shadow-xl">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-opacity-80 backdrop-blur-md px-4 py-2 text-white">
      <div className="text-3xl font-semibold">
        <Link href="/">Bloop</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-grow justify-end space-x-10">
        {/* ... existing desktop menu items ... */}
      </ul>

      {/* Hamburger Icon */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
        <div className="flex flex-col space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-3/4 h-3/4 bg-white rounded-lg overflow-y-auto p-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-black">
              Close
            </button>
            <ul className="flex flex-col space-y-4">
              {/* ... existing mobile menu items ... */}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
