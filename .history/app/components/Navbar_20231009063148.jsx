"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';  // Import useRouter

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();  // Initialize useRouter

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = router.pathname === '/';  // Check if it's the home page

  return (
    <nav className={`fixed w-full z-50 transition-all ease-in-out duration-300 ${isScrolled || !isHomePage ? 'bg-white text-black' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto flex items-center justify-between p-6">
        <div className="text-4xl font-bold">
          <Link href="/">
            <Image
              width={150}
              height={40}
              src="/images/blooplogo.png"
              alt="Bloop logo"
            />
          </Link>
        </div>
        <div className={`hidden lg:flex items-center space-x-8 ${isNavOpen ? 'flex' : 'hidden'}`}>
          <Link href="/about">
            <a className={`${isHomePage ? 'text-white' : 'text-black'}`}>About</a>
          </Link>
          <Link href="/showcase">
            <a className={`${isHomePage ? 'text-white' : 'text-black'}`}>Showcase</a>
          </Link>
          <Link href="/services">
            <a className={`${isHomePage ? 'text-white' : 'text-black'}`}>Services</a>
          </Link>
          <Link href="/resources">
            <a className={`${isHomePage ? 'text-white' : 'text-black'}`}>Resources</a>
          </Link>
          <Link href="/contact">
            <a className={`${isHomePage ? 'text-white' : 'text-black'}`}>Contact Us</a>
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              {isNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {isNavOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-40 flex flex-col items-start justify-start p-4 bg-white text-black">
              <button onClick={() => setIsNavOpen(false)} className="ml-auto text-2xl">
                ✕
              </button>
              <div className="flex flex-col mt-5 space-y-4 text-lg md:font-extrabold hover:text-red-500">
                <Link href="/about">
                  <a className="text-black">About Us</a>
                </Link>
                <Link href="/services">
                  <a className="text-black">Services</a>
                </Link>
                <Link href="/resources">
                  <a className="text-black">Resources</a>
                </Link>
                <Link href="/contact">
                  <a className="text-black">Contact Us</a>
                </Link>
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
