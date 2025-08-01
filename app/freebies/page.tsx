"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { submitApplication } from "./actions";

export default function FreebiesPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    description: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitApplication(formData);
      window.location.href = "/freebies/thank-you";
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeBanner = () => {
    setBannerVisible(false);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Urgency Banner */}
      {bannerVisible && (
        <div className=" bg-red-600 text-white py-3 px-4 text-center font-medium sticky top-0 z-50 flex justify-between items-center">
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

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gray-50 mt-12 ">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              One Free Website + <span className="text-red-600">Workspace</span> for a Startup Every Month
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Claim your free custom website and coworking space – designed to help your startup grow faster.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Professional website design worth $1,500</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">1 month free coworking space access</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Business growth strategy session</p>
              </div>
            </div>
            
            <div className="pt-4">
              <a 
                href="#application-form"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Apply Now for Free Website
              </a>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/freebies.png"
                alt="Founder in coworking space"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />

          </div>
        </div>
      </section>


      {/* Form Section */}
      <section id="application-form" className="py-24 bg-gray-50 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Apply for Your Free Website</h2>
            <p className="text-gray-600 text-center mb-8">Complete this short application to be considered for our monthly giveaway</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Acme Inc."
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">What does your startup do?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Briefly describe your business..."
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-colors shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-red-400 via-red-600 to-red-500 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">Don't Miss This Opportunity!</h2>
          <p className="text-xl text-white mb-8">
            Our free website giveaway is limited to one startup per month. Apply today to secure your chance!
          </p>
          <a 
            href="#application-form"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </a>
        </div>
      </section>
    </main>
  );
} 