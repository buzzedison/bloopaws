"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getReferralStats } from "../referral/actions";

export default function ReferralWidget() {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    closedReferrals: 0,
    totalEarnings: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getReferralStats();
        if (stats) {
          setStats(stats);
        }
      } catch (error) {
        console.error("Error fetching referral stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-red-600 text-white px-6 py-4">
        <h3 className="text-lg font-bold">Your Referral Program</h3>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Total Referrals</p>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/referral"
                className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-center font-medium rounded-lg transition-colors"
              >
                Refer a Client
              </Link>
              
              <Link 
                href="/referral/dashboard"
                className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-medium rounded-lg transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
