"use client"
import { useState } from 'react';
import Link from 'next/link';

const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative group">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white hover:text-blue-300 transition duration-200">
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 p-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-lg">
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
    <nav className="fixed w-full z-50 top-0 left-0 flex items-center justify-between bg-opacity-60 backdrop-blur-md px-4 py-2">
      <div className="text-2xl font-bold text-white">Bloop</div>
      <ul className="hidden md:flex flex-grow justify-end md:px-8 space-x-4">
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />
        {/* ... rest of the menu items */}
        <li className="px-4 py-2">
          <Link href="/">
            <a className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200">
              Sign Up
            </a>
          </Link>
        </li>
      </ul>
      <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {/* Mobile Menu */}
      {/* ... */}
    </nav>
  );
};

export default Navbar;
