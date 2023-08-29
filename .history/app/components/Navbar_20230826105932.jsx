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
      <ul className="hidden md:flex flex-grow justify-end space-x-10">
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />
        {/* ... other menu items */}
        <li>
          <Link href="/">Resources</Link>
        </li>
        <li>
          <Link href="/">Brands</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/">Insight</Link>
        </li>
        <li>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Sign Up
          </Link>
        </li>
      </ul>
      {/* Add your mobile menu button and the actual mobile menu here... */}
    </nav>
  );
};

export default Navbar;
