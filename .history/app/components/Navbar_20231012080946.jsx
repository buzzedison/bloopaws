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

  function getLinkClass() {
    if (isHomePage) {
      return isScrolled ? 'text-black' : 'text-white';
    }
    return 'text-black';
  }

  return (
    <nav className={`fixed w-full z-50 transition-all ease-in-out duration-300 ${isHomePage ? (isScrolled ? 'bg-white' : 'bg-transparent') : 'bg-white'}`}>
      <div className="container mx-auto flex items-center justify-between p-6">
        <div className="text-4xl font-bold">
          <Link href="/">
            <Image
              width={150}
              height={40}
              src="/images/logo.png"
              alt="Bloop logo"
            />
          </Link>
        </div>
        <div className={`hidden lg:flex items-center space-x-8 ${isNavOpen ? 'flex' : 'hidden'}`}>
          <Link href="/about">
            <span className={getLinkClass()}>About</span>
          </Link>
          <Link href="/showcase">
            <span className={getLinkClass()}>Showcase</span>
          </Link>
          <Link href="/services">
            <span className={getLinkClass()}>Services</span>
          </Link>
          <Link href="/resources">
            <span className={getLinkClass()}>Resources</span>
          </Link>
          <Link href="/contact">
            <span className={getLinkClass()}>Contact Us</span>
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            {/* Hamburger icon here */}
          </button>
          {isNavOpen && (
            <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 bg-black bg-opacity-90 text-white">
              <button onClick={() => setIsNavOpen(false)} className="ml-auto text-4xl">
                ✕
              </button>
              <div className="flex flex-col mt-5 space-y-8 text-2xl">
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
        // ... (styles remain unchanged)
      `}</style>
    </nav>
  );
}
