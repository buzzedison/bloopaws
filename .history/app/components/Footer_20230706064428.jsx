import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 px-8 md:px-16">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Site Map</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="hover:underline">About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <a className="hover:underline">Services</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="hover:underline">Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/services/web-development">
                <a className="hover:underline">Web Development</a>
              </Link>
            </li>
            <li>
              <Link href="/services/mobile-development">
                <a className="hover:underline">Mobile Development</a>
              </Link>
            </li>
            <li>
              <Link href="/services/ui-ux-design">
                <a className="hover:underline">UI/UX Design</a>
              </Link>
            </li>
            <li>
              <Link href="/services/digital-marketing">
                <a className="hover:underline">Digital Marketing</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Industries</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/industries/technology">
                <a className="hover:underline">Technology</a>
              </Link>
            </li>
            <li>
              <Link href="/industries/healthcare">
                <a className="hover:underline">Healthcare</a>
              </Link>
            </li>
            <li>
              <Link href="/industries/education">
                <a className="hover:underline">Education</a>
              </Link>
            </li>
            <li>
              <Link href="/industries/finance">
                <a className="hover:underline">Finance</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.facebook.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-8">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;