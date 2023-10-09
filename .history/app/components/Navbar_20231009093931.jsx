"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BloopNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = router.pathname === '/';

  function getLinkClass(path) {
    return router.pathname === path ? (isHomePage ? 'text-white' : 'text-black') : 'text-black';
  }

  return (
    <nav className={`fixed w-full z-50 transition-all ease-in-out duration-300 ${isHomePage ? 'bg-transparent text-white' : (isScrolled ? 'bg-white text-black' : 'bg-transparent text-white')}`}>
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
            <Link className="text-white" href="/about" >
                <span className={getLinkClass('/about')}>About</span>
            </Link>
            <Link href="/showcase">
                <span className={getLinkClass('/showcase')}>Showcase</span>
            </Link>
            <Link href="/services">
                <span className={getLinkClass('/services')}>Services</span>
            </Link>
            <Link href="/resources">
                <span className={getLinkClass('/resources')}>Resources</span>
            </Link>
            <Link href="/contact">
                <span className={getLinkClass('/contact')}>Contact Us</span>
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
                <Link href="/about" className="text-black">About Us</Link>
                <Link href="/services" className="text-black">Services</Link>
                <Link href="/resources" className="text-black">Resources</Link>
                <Link href="/contact" className="text-black">Contact Us</Link>
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
