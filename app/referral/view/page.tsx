"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

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

interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  closedReferrals: number;
  totalEarnings: number;
}

export default function ViewReferralsPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pendingReferrals: 0,
    closedReferrals: 0,
    totalEarnings: 0
  });
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateReferred");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    
    getUserData();
  }, []);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch('/api/referral', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch referrals');
        }
        
        const data = await response.json();
        setReferrals(data.referrals || []);
        setStats(data.stats || {
          totalReferrals: 0,
          pendingReferrals: 0,
          closedReferrals: 0,
          totalEarnings: 0
        });
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  const handleStatusUpdate = async (referralId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/referral/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralId,
          status: newStatus
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      // Update the referral in the local state
      setReferrals(prevReferrals => 
        prevReferrals.map(referral => 
          referral.id === referralId 
            ? { ...referral, status: newStatus } 
            : referral
        )
      );
      
      // Update stats
      const updatedStats = { ...stats };
      if (newStatus === 'closed') {
        updatedStats.pendingReferrals--;
        updatedStats.closedReferrals++;
      } else if (newStatus === 'pending') {
        updatedStats.pendingReferrals++;
        updatedStats.closedReferrals--;
      }
      setStats(updatedStats);
      
    } catch (error) {
      console.error('Error updating referral status:', error);
      alert('Failed to update referral status. Please try again.');
    }
  };

  // Filter referrals based on active filter and search term
  const filteredReferrals = referrals.filter(referral => {
    // Filter by status
    if (activeFilter === 'pending' && referral.status !== 'pending') return false;
    if (activeFilter === 'closed' && referral.status !== 'closed') return false;
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        referral.clientName.toLowerCase().includes(searchLower) ||
        referral.clientEmail.toLowerCase().includes(searchLower) ||
        (referral.companyName && referral.companyName.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Sort referrals
  const sortedReferrals = [...filteredReferrals].sort((a, b) => {
    if (sortBy === 'dateReferred') {
      const dateA = new Date(a.dateReferred).getTime();
      const dateB = new Date(b.dateReferred).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortBy === 'clientName') {
      return sortDirection === 'asc' 
        ? a.clientName.localeCompare(b.clientName)
        : b.clientName.localeCompare(a.clientName);
    }
    
    if (sortBy === 'potentialValue') {
      return sortDirection === 'asc'
        ? a.potentialValue - b.potentialValue
        : b.potentialValue - a.potentialValue;
    }
    
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Referrals</h1>
            <p className="text-gray-600">Track and manage all your referrals in one place.</p>
          </div>
          <Link prefetch={false} 
            href="/referral/form" 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Referral
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReferrals}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Closed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.closedReferrals}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all' 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter('closed')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'closed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Closed
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search referrals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {sortedReferrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('clientName')}
                    >
                      <div className="flex items-center">
                        Client
                        {sortBy === 'clientName' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('dateReferred')}
                    >
                      <div className="flex items-center">
                        Date Referred
                        {sortBy === 'dateReferred' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('potentialValue')}
                    >
                      <div className="flex items-center">
                        Value
                        {sortBy === 'potentialValue' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-medium">{referral.clientName.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referral.clientName}</div>
                            <div className="text-sm text-gray-500">{referral.clientEmail}</div>
                            {referral.companyName && (
                              <div className="text-xs text-gray-500">{referral.companyName}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.dateReferred).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          referral.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {referral.status === 'pending' ? 'Pending' : 'Closed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${referral.potentialValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {referral.status === 'closed' && referral.commission ? (
                          `$${referral.commission.toLocaleString()}`
                        ) : (
                          <span className="text-gray-500">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {referral.status === 'pending' ? (
                            <button
                              onClick={() => handleStatusUpdate(referral.id, 'closed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Mark Closed
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusUpdate(referral.id, 'pending')}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Reopen
                            </button>
                          )}
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => alert(`Details for ${referral.clientName}`)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No referrals match your search for "${searchTerm}".` 
                  : activeFilter !== 'all' 
                    ? `You don't have any ${activeFilter} referrals yet.`
                    : "You haven't made any referrals yet."}
              </p>
              <Link prefetch={false} 
                href="/referral/form" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Make Your First Referral
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
