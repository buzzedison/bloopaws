"use client"
// Client
import { useState } from 'react';
import Link from 'next/link';

/**
 * Dropdown menu component that displays a list of links.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the dropdown menu.
 * @param {Array} props.links - The list of links to display in the dropdown menu.
 */
const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 p-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-lg">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className="block">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * Navigation bar component.
 */
const Navbar = () => {
  // Common properties for menu items
  const menuItemProps = "px-4 py-2 hover:bg-gray-200 rounded-lg text-gray-900";

  // State for mobile navigation menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-gray-100 px-4 py-2">
      <div className="logo text-gray-900 font-bold text-xl">Bloop</div>

      {/* Mobile navigation menu */}
      <div className={`fixed transform top-0 left-0 w-full h-full transition-transform duration-200 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} bg-white p-8`} >
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4">
          Close
        </button>
        <ul className="flex flex-col space-y-4">
          <DropdownMenu
            title="Services"
            links={[
              { path: '/service1', label: 'Service 1' },
              { path: '/service2', label: 'Service 2' },
            ]}
          />
          <DropdownMenu
            title="Resources"
            links={[
              { path: '/resource1', label: 'Resource 1' },
              { path: '/resource2', label: 'Resource 2' },
            ]}
          />
          <li className={menuItemProps}>
            <Link href="/" className="text-gray-900">Portfolio</Link>
          </li>
          <li className={menuItemProps}>
            <Link href="/" className="text-gray-900">Brands</Link>
          </li>

          <li className={menuItemProps}>
            <Link href="/" className="text-gray-900">Fundlab</Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Desktop navigation menu */}
      <ul className="hidden md:flex flex-grow justify-end md:px-8">
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />
        <DropdownMenu
          title="Resources"
          links={[
            { path: '/resource1', label: 'Resource 1' },
            { path: '/resource2', label: 'Resource 2' },
          ]}
        />
        <li className={menuItemProps}>
          <Link href="/" className="text-gray-900">Portfolio</Link>
        </li>
        <li className={menuItemProps}>
          <Link href="/" className="text-gray-900">Brands</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Sign Up</Link>
        </li>
      </ul>

      {/* Mobile navigation button */}
      <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
