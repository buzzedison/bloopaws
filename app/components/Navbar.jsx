"use client"
import { useState, useEffect, useRef } from 'react';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function BloopNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClient();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const isBuzzEdisonFunnel = pathname?.startsWith('/founder-scorecard') || pathname?.startsWith('/master-the-system');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        setUserEmail(data.session.user.email);

        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.session.user.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
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

  const navItems = [
    { name: 'Work', href: '/launchpad' },
    { name: 'Services', href: '/services' },
    { name: 'AI Services', href: '/services/ai' },
    { name: 'Promo Packages', href: '/repackage' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Insights', href: '/playbook' },
    { name: 'About Us', href: '/about' },
  ];

  const adminItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Applications', href: '/admin/applications' },
    { name: 'Quiz Invitations', href: '/admin/quiz-invitations' },
    { name: 'Referrals', href: '/admin/referrals' },
  ];

  const isPlaybookRoute = pathname?.startsWith('/playbook') || pathname?.startsWith('/insight');

  if (isBuzzEdisonFunnel) {
    return null;
  }

  if (isPlaybookRoute) {
    return (
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-zinc-100' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link prefetch={false} href="/" className="flex items-center">
                <Image
                  width={130}
                  height={34}
                  src="/images/blooplogo2.png"
                  alt="Bloop logo"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <div>
              {pathname?.startsWith('/insight') ? (
                <Link
                  prefetch={false}
                  href="/playbook"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Back to Playbook
                </Link>
              ) : (
                <Link
                  prefetch={false}
                  href="/"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Back to Main Site
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 pb-3 text-sm font-semibold">
            <Link prefetch={false} href="/services/ai" className="text-zinc-700 hover:text-red-600">AI Services</Link>
            <Link prefetch={false} href="/repackage" className="text-red-700 hover:text-red-900">Promo Packages</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div ref={navRef}>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-zinc-100'
          : 'bg-white border-b border-zinc-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Auth badge */}
            {isAuthenticated && (
              <div className="absolute top-0 right-0 mt-2 mr-4 text-xs text-gray-500">
                <span className="mr-2">{userEmail}</span>
                <Link prefetch={false} href="/dashboard" className="text-red-600 hover:text-red-700">Dashboard</Link>
              </div>
            )}

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link prefetch={false} href="/" className="flex items-center gap-2">
                <Image
                  width={120}
                  height={32}
                  src="/images/blooplogo2.png"
                  alt="Bloop logo"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse hidden md:block" />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = (pathname === item.href || pathname?.startsWith(item.href + '/')) && !navItems.some(other => other.href.length > item.href.length && (pathname === other.href || pathname?.startsWith(other.href + '/')));
                return (
                  <Link
                    key={item.name}
                    prefetch={false}
                    href={item.href}
                    className={`relative px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-black bg-zinc-100'
                        : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600" />
                    )}
                  </Link>
                );
              })}

              {/* Admin Dropdown */}
              {isAdmin && (
                <div
                  className="relative"
                  onMouseEnter={() => setActiveItem('admin')}
                  onMouseLeave={() => setActiveItem('')}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-zinc-500 hover:text-black hover:bg-zinc-50 rounded-lg transition-all duration-200"
                    type="button"
                  >
                    Admin
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeItem === 'admin' && (
                    <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-zinc-100 z-20 py-1.5">
                      {adminItems.map((item) => (
                        <Link
                          prefetch={false}
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-[13px] text-zinc-600 hover:text-black hover:bg-zinc-50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-3">
              <Link
                prefetch={false}
                href="/contact"
                className="bg-red-600 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-red-700 transition-colors duration-200 shadow-sm"
              >
                Discuss a Project
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-zinc-700 hover:text-red-600 inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={isNavOpen}
                aria-controls="mobile-navigation"
              >
                {!isNavOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-40 xl:hidden overflow-y-auto pt-[72px] bg-black/95 backdrop-blur-md">
          <div className="px-6 py-8 space-y-1">
            {navItems.map((item) => {
              const isActive = (pathname === item.href || pathname?.startsWith(item.href + '/')) && !navItems.some(other => other.href.length > item.href.length && (pathname === other.href || pathname?.startsWith(other.href + '/')));
              return (
                <Link
                  prefetch={false}
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between py-4 px-4 rounded-xl text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </Link>
              );
            })}

            {/* Admin Links - Mobile */}
            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 px-4 mb-2">Admin</p>
                {adminItems.map((item) => (
                  <Link
                    prefetch={false}
                    key={item.name}
                    href={item.href}
                    className="block text-zinc-400 text-base font-normal py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors duration-200"
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-6 mt-4 border-t border-white/10">
              <Link
                prefetch={false}
                href="/contact"
                className="block w-full text-center bg-red-600 text-white py-4 px-4 rounded-full font-semibold text-base hover:bg-red-700 transition-colors duration-200"
                onClick={() => setIsNavOpen(false)}
              >
                Discuss a Project
              </Link>
              <p className="text-center text-xs text-zinc-600 mt-3">Share a brief · No commitment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
