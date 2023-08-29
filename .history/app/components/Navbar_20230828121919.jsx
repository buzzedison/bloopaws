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
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />
        <li><Link href="/">Resources</Link></li>
        <li><Link href="/">Brands</Link></li>
        <li><Link href="/">About</Link></li>
        <li><Link href="/">Insight</Link></li>
        <li><Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition duration-300">Sign Up</Link></li>
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
       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40">
       <div className="bg-white rounded-lg w-3/4 h-3/4 overflow-y-auto">
         <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-black">
           Close
         </button>
         <ul className="flex flex-col space-y-4 p-8">
           <DropdownMenu
             title="Services"
             links={[
               { path: '/service1', label: 'Service 1' },
               { path: '/service2', label: 'Service 2' },
             ]}
           />
           <li><Link href="/">Resources</Link></li>
           <li><Link href="/">Brands</Link></li>
           <li><Link href="/">About</Link></li>
           <li><Link href="/">Insight</Link></li>
           <li><Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition duration-300">Sign Up</Link></li>
         </ul>
       </div>
     </div>
      )}
    </nav>
  );
};

export default Navbar;
