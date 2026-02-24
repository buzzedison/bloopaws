"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

interface FormData {
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

export default function ReferralFormPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    referralName: "",
    referralEmail: "",
    referralPhone: "",
    companyName: "",
    message: ""
  });
  
  // Get user data when component mounts
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        
        // Pre-fill user information
        setFormData(prev => ({
          ...prev,
          name: data.user.user_metadata?.name || "",
          email: data.user.email || "",
          phone: data.user.user_metadata?.phone || ""
        }));
      }
    };
    
    getUserData();
  }, []);

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
        referrerCode: null
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

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Refer a Client</h1>
          <p className="text-gray-600">Submit a new referral and earn up to 15% commission.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Why Refer?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Earn 5% commission for every successful referral</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Earn 15% commission if you help close the deal</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Track all your referrals in your dashboard</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl text-white shadow-md">
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

          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="mb-8 pb-8 border-b border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-900">Your Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name:</p>
                          <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email:</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        {formData.phone && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone:</p>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                        )}
                      </div>
                      <input type="hidden" name="name" value={formData.name} />
                      <input type="hidden" name="email" value={formData.email} />
                      <input type="hidden" name="phone" value={formData.phone} />
                    </div>
                    <p className="text-sm text-gray-600 italic">Your information is automatically filled from your account.</p>
                  </div>
                  
                  <div className="mb-8 pb-8 border-b border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-900">Referral Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="referralName" className="block text-sm font-medium text-gray-700 mb-1">Referral Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            id="referralName"
                            name="referralName"
                            type="text"
                            required
                            value={formData.referralName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            placeholder="Jane Smith"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="referralEmail" className="block text-sm font-medium text-gray-700 mb-1">Referral Email</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            id="referralEmail"
                            name="referralEmail"
                            type="email"
                            required
                            value={formData.referralEmail}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            placeholder="referral@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="referralPhone" className="block text-sm font-medium text-gray-700 mb-1">Referral Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <input
                          id="referralPhone"
                          name="referralPhone"
                          type="tel"
                          value={formData.referralPhone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="Acme Inc."
                        />
                      </div>
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
                      placeholder="Please provide any additional information that might help us better serve your referral."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      Submit Referral
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Referral Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-8">Thank you for your referral. Our team will review it and get in touch with your contact soon.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link prefetch={false} href="/dashboard" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg">
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-all"
                    >
                      Submit Another Referral
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
