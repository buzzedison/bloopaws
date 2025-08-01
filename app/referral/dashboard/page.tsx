"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';
import { getReferrals, getReferralStats, updateReferralStatus, generateReferralCode } from "../actions";

interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  closedReferrals: number;
  totalEarnings: number;
}

interface Referral {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName?: string;
  status: string;
  dateReferred: string;
  potentialValue: number;
  actualValue?: number;
  commission?: number;
}

export default function ReferralDashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pendingReferrals: 0,
    closedReferrals: 0,
    totalEarnings: 0
  });
  const [activeTab, setActiveTab] = useState("all");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("Auth error or no user, redirecting to login:", authError);
        router.push("/login?redirect=/referral/dashboard");
        return;
      }
      
      setIsAuthenticated(true);
      
      try {
        const { code } = await generateReferralCode();
        setReferralCode(code);
      } catch (error) {
        console.error("Error getting referral code:", error);
      }
    };
    
    checkAuth();
  }, [router, supabase]);
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchData = async () => {
      try {
        const [referralsData, statsData] = await Promise.all([
          getReferrals(),
          getReferralStats()
        ]);
        
        setReferrals(referralsData);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated]);
  
  const handleStatusUpdate = async (referralId: string, newStatus: string) => {
    setStatusUpdateLoading(true);
    
    try {
      await updateReferralStatus(referralId, newStatus);
      
      setReferrals(prevReferrals => 
        prevReferrals.map(referral => 
          referral.id === referralId 
            ? { ...referral, status: newStatus } 
            : referral
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update referral status. Please try again.");
    } finally {
      setStatusUpdateLoading(false);
    }
  };
  
  const filteredReferrals = referrals.filter(referral => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return referral.status === "pending";
    if (activeTab === "closed") return referral.status === "closed";
    return true;
  });
  
  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/referral?code=${referralCode}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };
  
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 pt-24">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Referral Dashboard</h1>
          <p className="text-lg opacity-90">Track your referrals and earnings in one place</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Total Referrals</p>
            <h3 className="text-3xl font-bold">{stats.totalReferrals}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Pending Referrals</p>
            <h3 className="text-3xl font-bold">{stats.pendingReferrals}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Closed Referrals</p>
            <h3 className="text-3xl font-bold">{stats.closedReferrals}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold">${stats.totalEarnings.toFixed(2)}</h3>
          </div>
        </div>

        {referralCode && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-red-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Referral Link</h4>
            <p className="text-sm text-gray-600 mb-4">Share this link with your friends or colleagues. When they sign up or make a purchase using this link, you'll get rewarded!</p>
            <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
              <input 
                type="text" 
                readOnly 
                value={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/referral?code=${referralCode}`}
                className="flex-grow bg-transparent border-none text-gray-50 focus:outline-none text-sm md:text-base"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${copySuccess ? 'bg-green-500 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                {copySuccess ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-6 py-4 font-medium text-sm ${activeTab === "all" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              All Referrals
            </button>
            <button 
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-4 font-medium text-sm ${activeTab === "pending" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setActiveTab("closed")}
              className={`px-6 py-4 font-medium text-sm ${activeTab === "closed" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Closed
            </button>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-2 text-gray-600">Loading your referrals...</p>
            </div>
          ) : filteredReferrals.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No referrals found.</p>
              <Link href="/referral" className="mt-4 inline-block text-red-600 hover:text-red-700 font-medium">
                Refer a client now →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Referred</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReferrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{referral.clientName}</div>
                        <div className="text-sm text-gray-500">{referral.clientEmail}</div>
                        {referral.companyName && (
                          <div className="text-sm text-gray-500">{referral.companyName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.dateReferred).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          referral.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {referral.status === "pending" ? "Pending" : "Closed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${referral.potentialValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {referral.status === "closed" && referral.commission ? (
                          `$${referral.commission.toLocaleString()}`
                        ) : (
                          <span className="text-gray-500">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {referral.status === "pending" ? (
                          <button
                            onClick={() => handleStatusUpdate(referral.id, "closed")}
                            disabled={statusUpdateLoading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            Mark as Closed
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusUpdate(referral.id, "pending")}
                            disabled={statusUpdateLoading}
                            className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                          >
                            Reopen
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/referral" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
            Refer More Clients
          </Link>
        </div>
      </div>
    </main>
  );
}
