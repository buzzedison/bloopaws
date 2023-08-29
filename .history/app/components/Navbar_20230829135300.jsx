"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="container mx-auto">
      <div className="flex items-center justify-between p-6 text-white font-roboto bg-blue-600">
        <div className="text-4xl font-bold tracking-wide">
          <Link href="/"> 
            <a>
              <Image 
                width={150}
                height={40}
                src="/images/bloop-logo.svg"
                alt="Bloop logo"
              />
            </a>
          </Link>
        </div>
        <div className={`hidden lg:flex items-center space-x-8 ${isNavOpen && 'lg:hidden'}`}>
          <Link href="/about">About Us</Link>
          <Link href="/showcase">Showcase</Link>
          {/* Additional menu links here */}
        </div>
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="lg:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            {isNavOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {isNavOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-start justify-start p-4 bg-blue-700 text-white lg:hidden">
            <button onClick={() => setIsNavOpen(!isNavOpen)} className="ml-auto" role="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="/about">About Us</Link>
            <Link href="/showcase">Showcase</Link>
            {/* Additional mobile menu links here */}
          </div>
        )}
      </div>
    </nav>
  );
}
