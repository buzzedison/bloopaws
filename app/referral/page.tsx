"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define types for the referral data
interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  closedReferrals: number;
  totalEarnings: number;
}

interface ReferralFormData {
  name: string;
  email: string;
  phone: string;
  referralName: string;
  referralEmail: string;
  referralPhone: string;
  companyName: string;
  message: string;
}

// Function to submit a referral to the API
const createReferral = async (data: any) => {
  const response = await fetch('/api/referral', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientName: data.referralName,
      clientEmail: data.referralEmail,
      clientPhone: data.referralPhone,
      companyName: data.companyName,
      message: data.message,
      commissionType: 'refer', // Default to 'refer' (5% commission)
      potentialValue: 0 // Will be determined by admin
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit referral');
  }
  
  return await response.json();
};

export default function ReferralPage() {
  const [isLoading, setIsLoading] = useState(false);
  // Removed copied and stats state as stats and referral link section are no longer needed.
  const [formData, setFormData] = useState<ReferralFormData>({
    name: "",
    email: "",
    phone: "",
    referralName: "",
    referralEmail: "",
    referralPhone: "",
    companyName: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Removed referralId state as referral link section is no longer needed.
  
  const searchParams = useSearchParams();
  const referrerCode = searchParams.get("ref");
  
  // Removed useEffect for referralId and stats as these sections are no longer needed.
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.referralName || !formData.referralEmail) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }
    
    try {
      // Submit to the API
      await createReferral({
        ...formData,
        referrerCode: referrerCode || null
      });
      
      // Clear form and show success message
      setFormData({
        name: "",
        email: "",
        phone: "",
        referralName: "",
        referralEmail: "",
        referralPhone: "",
        companyName: "",
        message: ""
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting referral:", error);
      alert(error instanceof Error ? error.message : "There was an error submitting your referral. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Removed copyToClipboard as referral link section is no longer needed.
  
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-red-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20 z-0"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-white">
              <div className="inline-block px-4 py-1 bg-red-600/30 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                Partner with Bloop
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200">
                Earn Up to 15% Commission
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-xl">
                Leverage your network and earn substantial rewards by referring clients to our premium services.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#refer-form" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Refer a Client
                </a>
                <a href="#services" className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold rounded-lg transition-all flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Our Services
                </a>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-2xl transform rotate-3 opacity-70"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Commission Tiers</h3>
                      <p className="text-gray-600">Earn more as you contribute more</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <span className="text-xl font-bold text-white">5%</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Recommend & Earn</h4>
                        <p className="text-sm text-gray-600">Simply refer clients to us</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <span className="text-xl font-bold text-white">15%</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Refer & Close</h4>
                        <p className="text-sm text-gray-600">Help close the deal with clients</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <span className="text-xl font-bold text-white">∞</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Unlimited Potential</h4>
                        <p className="text-sm text-gray-600">No cap on your earnings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Services You Can Refer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Earn commissions by referring clients to any of our premium services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Website Development</h3>
                <p className="text-gray-600 mb-4">Custom-designed, responsive websites tailored to business needs with SEO optimization.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $700</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $105</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Web Application Development</h3>
                <p className="text-gray-600 mb-4">Scalable, feature-rich web applications with intuitive user interfaces.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $4,000</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $600</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Business Plan Development</h3>
                <p className="text-gray-600 mb-4">Comprehensive business plans with market analysis and financial projections.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $1,000</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $150</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Pitch Deck Creation</h3>
                <p className="text-gray-600 mb-4">Compelling investor pitch decks that communicate your vision and business model.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $350</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $52.50</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Marketing Research</h3>
                <p className="text-gray-600 mb-4">In-depth market analysis, competitor research, and strategic recommendations.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $1,500</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $225</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-cyan-500 to-teal-600 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Business Training</h3>
                <p className="text-gray-600 mb-4">Customized training programs for teams on various business and technical skills.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting at $2,000 (team of 10)</span>
                  <span className="text-sm font-medium text-red-600">Earn up to $300</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="/auth/signup" className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl">
              Start Referring Now
            </a>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">How Our Referral Program Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">Register for our referral program and get your unique referral link.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Share</h3>
              <p className="text-gray-600">Share your referral link with potential clients or submit their details directly.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track</h3>
              <p className="text-gray-600">Monitor your referrals and earnings through your personalized dashboard.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Paid</h3>
              <p className="text-gray-600">Receive your commission payments monthly for all successful referrals.</p>
            </div>
          </div>
        </div>
      </section>
      

      

      
      {/* Refer a Client Form Section */}
      <section id="refer-form" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-6 text-gray-900">Refer a Client</h2>
                  <p className="text-lg text-gray-600">
                    Help businesses succeed while earning generous commissions. Fill out the form to refer a potential client to our team.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Why Refer to Us?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Generous commission structure (5-15%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Monthly payouts for all successful referrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated support for you and your referrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Access to our partner dashboard to track referrals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-3">Questions?</h3>
                  <p className="mb-4">Our team is here to help you with any questions about our referral program.</p>
                  <a href="mailto:referrals@bloop.com" className="inline-flex items-center gap-2 text-white font-medium hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3" id="refer-form">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="p-8">
                    <div className="mb-8 pb-8 border-b border-gray-100">
                      <h3 className="text-xl font-bold mb-6 text-gray-900">Your Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-6 text-gray-900">Client Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="referralName" className="block text-sm font-medium text-gray-700 mb-1">Client's Name</label>
                          <input
                            id="referralName"
                            name="referralName"
                            type="text"
                            required
                            value={formData.referralName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            placeholder="Jane Smith"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="referralEmail" className="block text-sm font-medium text-gray-700 mb-1">Client's Email</label>
                          <input
                            id="referralEmail"
                            name="referralEmail"
                            type="email"
                            required
                            value={formData.referralEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            placeholder="client@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="referralPhone" className="block text-sm font-medium text-gray-700 mb-1">Client's Phone Number</label>
                        <input
                          id="referralPhone"
                          name="referralPhone"
                          type="tel"
                          value={formData.referralPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name (if applicable)</label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="Acme Inc."
                        />
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Tell us about the client's needs and how we can help them..."
                      />
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input id="terms" type="checkbox" required className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the <a href="/referral/terms" className="text-red-600 hover:text-red-800 font-medium">Terms and Conditions</a> of the referral program
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Submit Referral'}
                    </button>
                  </form>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Referral!</h3>
                    <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                      We've received your referral and will reach out to the client shortly. We'll keep you updated on the status.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            referralName: "",
                            referralEmail: "",
                            referralPhone: "",
                            companyName: "",
                            message: ""
                          });
                        }}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Submit Another Referral
                      </button>
                      <Link 
                        href="/referral/dashboard"
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-all"
                      >
                        View Dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">How do I earn the 5% commission?</h3>
              <p className="text-gray-600">
                Simply refer a client to us using your unique referral link or by submitting their information through our referral form. If they sign up for any of our services, you'll earn a 5% commission on the total project value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">What does "refer and close" mean?</h3>
              <p className="text-gray-600">
                "Refer and close" means you not only introduce the client to us but also help in the sales process to close the deal. This can include arranging meetings, helping explain our services, or providing additional information that helps convert the lead into a paying client.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">When and how do I get paid?</h3>
              <p className="text-gray-600">
                Commissions are paid out monthly for all successful referrals from the previous month. You can choose to receive payment via bank transfer, PayPal, or other available payment methods.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Is there a limit to how many clients I can refer?</h3>
              <p className="text-gray-600">
                No, there's no limit to the number of clients you can refer. The more clients you refer, the more you can earn!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">How long is the referral valid?</h3>
              <p className="text-gray-600">
                A referral is valid for 90 days from the date of submission. If the client signs up within this period, you'll receive the commission.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold mb-6">Start Earning Today!</h2>
          <p className="text-xl mb-8">
            Join our referral program and turn your network into income. It's easy, rewarding, and completely free to join.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#refer-form"
              className="bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Refer a Client Now
            </a>
            <Link 
              href="/referral/dashboard"
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl border border-red-400"
            >
              View Your Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
