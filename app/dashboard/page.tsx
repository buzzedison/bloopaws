"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

const supabase = createClient();

// Define a type for the user to fix TypeScript errors
type User = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Get user profile for displaying user-specific data
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        // Cast to our User type
        setUser(data.user as unknown as User);
      }
    };
    
    getUser();
  }, []);
  
  // Add handleSignOut function
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      
      {/* Dashboard Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Dashboard</h2>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "overview" 
                      ? "bg-red-50 text-red-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Overview
                </button>
                
                <button
                  onClick={() => setActiveTab("referrals")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "referrals" 
                      ? "bg-red-50 text-red-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Referrals
                </button>
                
                <button
                  onClick={() => setActiveTab("tools")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "tools" 
                      ? "bg-red-50 text-red-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Tools & Resources
                </button>
                
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "settings" 
                      ? "bg-red-50 text-red-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "overview" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <h3 className="text-lg font-medium text-red-800 mb-1">Total Referrals</h3>
                      <p className="text-3xl font-bold text-red-600">0</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h3 className="text-lg font-medium text-blue-800 mb-1">Pending</h3>
                      <p className="text-3xl font-bold text-blue-600">0</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <h3 className="text-lg font-medium text-green-800 mb-1">Earnings</h3>
                      <p className="text-3xl font-bold text-green-600">$0.00</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link 
                        href="/referral/form" 
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Refer Someone</h3>
                          <p className="text-sm text-gray-600">Submit a new referral</p>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/referral/view" 
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">View Referrals</h3>
                          <p className="text-sm text-gray-600">Track your referral status</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <p className="text-gray-600">No recent activity to display.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "referrals" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Your Referrals</h1>
                    <Link 
                      href="/referral/dashboard" 
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Go to Referral Dashboard
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-4">You haven't made any referrals yet.</p>
                    <Link 
                      href="/referral" 
                      className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Make Your First Referral
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === "tools" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Tools & Resources</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Marketing Materials</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="text-red-600 hover:underline">Referral Program Brochure (PDF)</a>
                          </li>
                          <li>
                            <a href="#" className="text-red-600 hover:underline">Email Templates</a>
                          </li>
                          <li>
                            <a href="#" className="text-red-600 hover:underline">Social Media Graphics</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Helpful Resources</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="text-red-600 hover:underline">Referral Program FAQ</a>
                          </li>
                          <li>
                            <a href="#" className="text-red-600 hover:underline">Commission Structure</a>
                          </li>
                          <li>
                            <a href="/referral/terms" className="text-red-600 hover:underline">Terms & Conditions</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <p className="text-gray-900">{user?.user_metadata?.name || "Not provided"}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <p className="text-gray-900">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
