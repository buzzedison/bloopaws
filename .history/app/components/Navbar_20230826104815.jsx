"use client"
// Client
// Client
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
  const menuItemProps = "px-4 py-2 hover:bg-transparent rounded-lg text-white";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-transparent px-4 py-2 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">Bloop</Link>
      </div>
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
          <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200">
            Sign Up
          </Link>
        </li>
      </ul>
      <button className="md:hidden text-white">
        {/* Mobile Menu Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
