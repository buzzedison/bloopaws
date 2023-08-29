"use client"
// Client
import { useState } from 'react';
import Link from 'next/link';

const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white hover:text-blue-400 transition duration-300">
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 p-2 space-y-2 text-white bg-black border border-gray-800 rounded-md shadow-xl">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>
                {link.label}
              </Link>
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
      <ul className="hidden md:flex flex-grow justify-end space-x-6">
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />

<li>
          <Link href="/" className=" text-white space-x-6">
           Resources
          </Link>
        </li>
        {/* ... other menu items */}
        <li>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Sign Up
          </Link>
        </li>
      </ul>
      <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white">
        {/* Mobile Menu Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {/* Add your mobile menu here... */}
    </nav>
  );
};

export default Navbar;
