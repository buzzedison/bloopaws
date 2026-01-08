"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/claim-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        // Optionally handle error
        alert('There was a problem submitting your claim. Please try again.');
      }
    } catch (err) {
      alert('There was a problem submitting your claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeBanner = () => {
    setBannerVisible(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      {/* Urgency Banner */}
      {bannerVisible && (
        <div className="bg-red-600 text-white py-3 px-4 text-center font-medium sticky top-0 z-50 flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            🚨 Next selection closes May 30. Only 1 slot available!
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={closeBanner}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-24">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            You're in! We'll review your submission.
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for applying for our free website offer! We review all applications carefully and will contact you within 7-10 days if you're selected.
          </p>
          
          <div className="my-12 p-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Don't want to wait? Get your website now at 50% off
            </h2>
            
            <p className="text-gray-700 mb-6">
              Skip the selection process and get your professional website built immediately at half the regular price. Limited time offer!
            </p>
            
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">What are your website goals?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Tell us about your business and what you hope to achieve with your new website..."
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`py-4 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                  >
                    {isLoading ? 'Submitting...' : 'Yes, I Want the 50% Discount'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Great decision!</h3>
                <p className="text-gray-600">We've received your request for the 50% discount offer. Our team will contact you within 24 hours to get started on your website!</p>
              </div>
            )}
          </div>
          
          <div className="mt-10">
            <Link href="/" className="text-red-600 hover:text-red-800 font-medium">
              ← Return to Home Page
            </Link>
          </div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-red-400 via-red-600 to-red-500 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">Need Help With Your Business?</h2>
          <p className="text-xl text-white mb-8">
            Explore our range of services designed to help startups and small businesses grow faster.
          </p>
          <Link 
            href="/services"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            View Our Services
          </Link>
        </div>
      </section>
    </main>
  );
} 