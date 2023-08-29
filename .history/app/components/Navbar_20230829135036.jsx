"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="container">
      <div className="flex items-center justify-between p-6 text-black font-roboto">
        <div className="text-4xl text-white font-bold tracking-wide">
         <Link href="/"> <Image className="w-75"
                 width={150}
                 height={40}
                 src="/images/logo.svg"/>
                 </Link>
        </div>
        <div className={`lg:flex items-center space-x-8 ${isNavOpen ? 'hidden lg:block' : 'hidden'}`}>
          <Link href="/about" className="hover:text-gray-700 transition ease-in-out duration-200 text-white">
              About Us
          </Link>
          <Link href="/showcase" className="hover:text-gray-700 transition ease-in-out duration-200 text-white">
              Showcase
          </Link>
          <div className="relative group">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="hover:text-gray-700 transition ease-in-out duration-200 text-white" role="button">
              Occasions
            </button>
            <div className={`py-2 px-5 absolute left-0 z-10 mt-2 space-y-2 bg-white rounded shadow-lg ${isDropdownOpen ? 'block' : 'hidden'} group-hover:block`}>
              <Link href="/weddings" className="block px-4 py-2 hover:bg-gold hover:text-wine transition ease-in-out duration-200">
                  Weddings
              </Link>
              <Link href="/birthdays" className="block px-4 py-2 hover:bg-gold hover:text-wine transition ease-in-out duration-200">
                  Birthdays
              </Link>
              <Link href="/special-occasions" className="block px-4 py-2 hover:bg-gold hover:text-wine transition ease-in-out duration-200">
                  Special Occasions
              </Link>
              <Link href="/asian" className="block px-4 py-2 hover:bg-gold hover:text-wine transition ease-in-out duration-200">
                  Asian
              </Link>
            </div>
          </div>
          <div>
            <button className="bg-wine text-white hover:bg-gold hover:text-wine transition ease-in-out duration-200 rounded mt-0 px-4 py-2" style={{backgroundColor:"4D2C32"}} role="button">
              <Link href="/request">Request A Quote </Link>
            </button>
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)} role="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFD700" className="h-6 w-6">
              {isNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {isNavOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-start justify-start p-4 bg-gray-900 bg-opacity-75 text-white">
              <button onClick={() => setIsNavOpen(!isNavOpen)} className="ml-auto" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link href="/about" onClick={() => setIsNavOpen(false)} className="hover:text-gray-700 hover:bg-gold hover:px-3 transition ease-in-out duration-200 block py-2 text-white">
                  About Us
              </Link>
              <Link href="/showcase" onClick={() => setIsNavOpen(false)} className="hover:text-gray-700 hover:bg-gold hover:px-3 transition ease-in-out duration-200 block py-2 text-white">
                  Showcase
              </Link>
              <Link href="/weddings" onClick={() => setIsNavOpen(false)} className="block py-2 hover:bg-gold hover:px-3 hover:text-wine transition ease-in-out duration-200">
                  Weddings
              </Link>
              <Link href="/birthdays" onClick={() => setIsNavOpen(false)} className="block py-2 hover:bg-gold hover:px-3 hover:text-wine transition ease-in-out duration-200">
                  Birthdays
              </Link>
              <Link href="/special-occasions" onClick={() => setIsNavOpen(false)} className="block py-2 hover:bg-gold hover:px-3 hover:text-wine transition ease-in-out duration-200">
                  Special Occasions
              </Link>
              <Link href="/asian" onClick={() => setIsNavOpen(false)} className="block py-2 hover:bg-gold hover:px-3 hover:text-wine transition ease-in-out duration-200">
                  Asian
              </Link>
              <div>
                <button className=" mt-2 bg-wine text-white hover:bg-gold hover:text-wine transition ease-in-out duration-200 rounded px-4 py-2" style={{backgroundColor:"4D2C32"}} role="button">
                <Link href="/request" onClick={() => setIsNavOpen(false)}>Request A Quote </Link> 
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}