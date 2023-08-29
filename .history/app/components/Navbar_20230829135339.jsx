"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="container">
      <div className="flex items-center justify-between p-6 text-black font-roboto">
        <div className="text-4xl text-white font-bold tracking-wide">
          <Link href="/"> 
            <Image 
              className="w-75"
              width={150}
              height={40}
              src="/images/bloop-logo.svg"
            />
          </Link>
        </div>
        <div className={`lg:flex items-center space-x-8 ${isNavOpen ? 'hidden lg:block' : 'hidden'}`}>
          {/* Desktop Menu Links */}
          <Link href="/about">About Us</Link>
          <Link href="/showcase">Showcase</Link>
          {/* Add your desktop menu links here */}
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
              {/* Mobile Menu Links */}
              <button onClick={() => setIsNavOpen(!isNavOpen)} className="ml-auto" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link href="/about">About Us</Link>
              <Link href="/services">Services</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
