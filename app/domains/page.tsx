import DomainSearch from './components/DomainSearch';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Domain Search | Bloop Global',
  description: 'Find and register your perfect domain name',
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 md:pt-32 md:pb-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight mb-6">
            Find Your Domain
            <span className="block mt-2 text-red-600">
              Build Your Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light">
            Join millions who've already found their perfect domain name
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-gray-50 rounded-lg" />
          <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            <DomainSearch />
          </div>
        </div>

        <div className="mt-32 pb-24">
          <h2 className="text-3xl font-bold text-black text-center mb-16">Why Choose Bloop Global?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-lg bg-white border border-gray-100 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Lightning Fast Registration</h3>
              <p className="text-gray-600 leading-relaxed">Register your domain in seconds with our streamlined process and instant activation.</p>
            </div>
            <div className="p-8 rounded-lg bg-white border border-gray-100 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Enterprise-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">Advanced DNS protection, SSL certificates, and domain privacy included at no extra cost.</p>
            </div>
            <div className="p-8 rounded-lg bg-white border border-gray-100 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">24/7 Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">Our dedicated team of domain experts is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}