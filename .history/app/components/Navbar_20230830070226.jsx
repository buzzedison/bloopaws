"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all ease-in-out duration-300 ${isScrolled ? 'bg-white text-black' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto flex items-center justify-between p-6">
        <div className="text-4xl font-bold">
          <Link href="/">
            <Image
              width={150}
              height={40}
              src="/images/bloop-logo.svg"
              alt="Bloop logo"
            />
          </Link>
        </div>
        <div className={`hidden lg:flex items-center space-x-8 ${isNavOpen ? 'flex' : 'hidden'}`}>
          {/* ... Desktop Links ... */}
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-3xl">
            ☰
          </button>
          {isNavOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-40 flex flex-col items-start justify-start p-4 bg-white text-black">
              <button onClick={() => setIsNavOpen(false)} className="ml-auto text-2xl">
                ✕
              </button>
              <div className="flex flex-col mt-5 space-y-4 text-xl">
                <Link href="/about">About Us</Link>
                <Link href="/services">Services</Link>
                <Link href="/resources">Resources</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        nav div a {
          transition: color 0.3s ease-in-out;
        }
        nav div a:hover {
          color: #42a5f5;
        }
        button {
          transition: transform 0.3s ease-in-out;
        }
        button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </nav>
  );
}
