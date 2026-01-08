"use client"
import { useState, useEffect, useRef } from 'react';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BloopNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClient();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    // Check authentication status
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        setUserEmail(data.session.user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
    };

    checkAuth();

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHomePage = router.pathname === '/';

  const navItems = [
    { name: 'How We Help', href: '/services' },
    { name: 'Our Stories', href: '/casestudies' },
    { name: 'The Playbook', href: '/playbook' },
    { name: 'About Us', href: '/about' },
    { name: 'Join the Crew', href: '/careers' },
    { name: 'The Vanguard Program', href: '/vanguard' },
  ];

  const adminItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Applications', href: '/admin/applications' },
    { name: 'Quiz Invitations', href: '/admin/quiz-invitations' },
    { name: 'Referrals', href: '/admin/referrals' },
  ];

  return (
    <div ref={navRef}>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/10 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* User Authentication Status */}
            {isAuthenticated && (
              <div className="absolute top-0 right-0 mt-2 mr-4 text-xs text-gray-600">
                <span className="mr-2">{userEmail}</span>
                <Link href="/dashboard" className="text-red-600 hover:text-red-800">Dashboard</Link>
              </div>
            )}
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  width={150}
                  height={40}
                  src="/images/blooplogo2.png"
                  alt="Bloop logo"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="ml-1 w-2 h-2 rounded-full bg-red-600 animate-pulse hidden md:block"></div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navItems.map((item) => (
                  item.submenu ? (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setActiveItem(item.name)}
                      onMouseLeave={() => setActiveItem('')}
                    >
                      <button
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-300 text-gray-800 flex items-center`}
                        type="button"
                      >
                        {item.name}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2 ${activeItem === item.name ? '' : 'hidden'}`}>
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300"
                        style={{
                          transform: activeItem === item.name ? 'scaleX(1)' : 'scaleX(0)'
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setActiveItem(item.name)}
                      onMouseLeave={() => setActiveItem('')}
                    >
                      <Link
                        href={item.href}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-300 text-gray-800`}
                      >
                        {item.name}
                      </Link>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300"
                        style={{
                          transform: activeItem === item.name ? 'scaleX(1)' : 'scaleX(0)'
                        }}
                      />
                    </div>
                  )
                ))}

                {/* Admin Dropdown - Only show for authenticated users */}
                {isAuthenticated && (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveItem('admin')}
                    onMouseLeave={() => setActiveItem('')}
                  >
                    <button
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-300 text-gray-800 flex items-center`}
                      type="button"
                    >
                      Admin
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20 py-2 ${activeItem === 'admin' ? '' : 'hidden'}`}>
                      {adminItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300"
                      style={{
                        transform: activeItem === 'admin' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="relative bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 inline-block"
              >
                Let's Chat
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-gray-800 hover:text-red-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-transform duration-300 hover:scale-105"
                aria-label="Toggle menu"
              >
                {!isNavOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-20 bg-black/90 backdrop-blur-md">
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="block w-full">
                  <div className="text-white text-lg font-medium py-3 px-4">{item.name}</div>
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="block text-white text-base font-normal py-2 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  key={item.name}
                  className="block w-full"
                >
                  <Link
                    href={item.href}
                    className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              )
            ))}

            {/* Admin Links - Mobile */}
            {isAuthenticated && (
              <div className="pt-4 mt-4 border-t border-white/20">
                <div className="text-white text-lg font-medium py-3 px-4">Admin</div>
                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-white text-base font-normal py-2 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-white/20">
              <Link
                href="/contact"
                className="block w-full text-center bg-red-600 text-white py-3 px-4 rounded-full font-medium hover:bg-red-700 transition-colors duration-200"
                onClick={() => setIsNavOpen(false)}
              >
                Let's Chat
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
