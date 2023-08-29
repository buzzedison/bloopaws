"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all ease-in-out duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between p-6 text-white font-roboto">
        <div className="text-4xl font-bold tracking-wide">
          <Link href="/">
            <Image
              width={150}
              height={40}
              src="/images/bloop-logo.svg"
              alt="Bloop logo"
            />
          </Link>
        </div>
        <div className={`hidden lg:flex items-center space-x-8 ${isNavOpen && 'lg:hidden'}`}>
          <Link href="/about">About</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/services">Services</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              {isNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {isNavOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-40 flex flex-col items-start justify-start p-4 bg-black text-white">
              <button onClick={() => setIsNavOpen(false)} className="ml-auto text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
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
