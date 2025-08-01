"use client"
import Link from 'next/link';
import Image from "next/image"
const Footer = () => (
  <div className="">
  <footer className="bg-gray-50 text-gray-900 pt-24 pb-12 px-8 md:px-16 footer ">
    <div className="container mx-auto pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image src="/images/logo.png" 
          width={200} height={40}
          alt="Your Company Logo" className="w-32 mb-4" />
          <h3 className="text-lg font-semibold mb-4">Site Map</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/services/web"className="hover:underline">Web Development
              </Link>
            </li>
            <li>
              <Link href="/services/mobile"className="hover:underline">Mobile Development
              </Link>
            </li>
            <li>
              <Link href="/services/business"className="hover:underline">Business Development
              </Link>
            </li>
            <li>
              <Link href="/services/training"className="hover:underline">Training
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Industries</h3>
          <ul className="space-y-2">
            <li>
Technology
            
            </li>
            <li>
            Healthcare
          
            </li>
            <li>
              Education
              
            </li>
            <li>
         Finance
              
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
            <li>
<Link href="https://www.facebook.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</Link>
            </li>
            <li>
<Link href="https://twitter.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</Link>
            </li>
            <li>
<Link href="https://www.linkedin.com/company/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</Link>
            </li>
            <li>
<Link href="https://www.instagram.com/bloopglobal" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-8">
        <p className="text-sm text-gray-900">
          &copy; {new Date().getFullYear()} Bloop Global LLC. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  </div>
);

export default Footer;