"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';
import { getReferrals, updateReferralStatus, getReferrerUsers } from "@/app/referral/actions";

interface Referral {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  status: string;
  dateReferred: string;
  potentialValue: number;
  actualValue: number;
  commission: number;
  // Add these properties for referrer information
  referrerName?: string;
  referrerEmail?: string;
  // Add this for commission rate
  commission_rate?: number;
}

export default function AdminReferralsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referrers, setReferrers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  // For switching between referrals and referrers views
  const [activeView, setActiveView] = useState('referrals'); // 'referrals' or 'referrers'
  // For filtering referrals by status
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [formData, setFormData] = useState({
    status: "",
    potentialValue: 0,
    actualValue: 0,
    commission_rate: 0.05,
    commission: 0
  });

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error('Auth error or no user:', authError);
          router.push("/login?redirect=/admin/referrals");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError; 
        }

        if (!profile || !profile.is_admin) {
          console.log('User is not an admin, redirecting.');
          router.push("/");
          return;
        }

        console.log('User is admin.');
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/login?redirect=/admin/referrals"); 
      }
    };

    checkAdmin();
  }, [router, supabase]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch referrals
        const referralsData = await getReferrals();
        setReferrals(referralsData);
        
        // Fetch referrers (users with referral codes)
        const referrersData = await getReferrerUsers();
        setReferrers(referrersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredReferrals = referrals.filter(referral => {
    if (activeTab === "all") return true;
    return referral.status === activeTab;
  });

  const handleEditReferral = (referral: Referral) => {
    setSelectedReferral(referral);
    setFormData({
      status: referral.status,
      potentialValue: referral.potentialValue || 0,
      actualValue: referral.actualValue || 0,
      commission_rate: referral.commission_rate || 0.05,
      commission: referral.commission || 0
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: name.includes('Value') || name.includes('commission') ? parseFloat(value) : value };
      
      if (name === 'actualValue' || name === 'commission_rate') {
        newData.commission = parseFloat((newData.actualValue * newData.commission_rate).toFixed(2));
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReferral) return;
    
    try {
      const { error } = await supabase
        .from('referrals')
        .update({
          status: formData.status,
          potential_value: formData.potentialValue, // Map to DB column name
          actual_value: formData.status === 'closed' ? formData.actualValue : null, // Map to DB column name
          commission_rate: formData.commission_rate,
          commission: formData.status === 'closed' ? formData.commission : null
        })
        .eq('id', selectedReferral.id);
        
      if (error) throw error;
      
      setReferrals(referrals.map(referral => referral.id === selectedReferral.id ? { ...referral, ...formData } : referral));
      setSelectedReferral(null);
    } catch (error) {
      console.error("Error updating referral:", error);
      alert("Failed to update referral. Please try again.");
    }
  };

  const handleDeleteReferral = async (id: string) => {
    if (!confirm("Are you sure you want to delete this referral? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setReferrals(referrals.filter(referral => referral.id !== id));
    } catch (error) {
      console.error("Error deleting referral:", error);
      alert("Failed to delete referral. Please try again.");
    }
  };

  if (isLoading || !isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Referrals Dashboard</h1>
          <p className="text-xl">Manage and track all referrals in the system</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-8 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : !isAdmin ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">You do not have permission to view this page.</p>
          </div>
        ) : (
          <>
            {/* Tabs for switching between referrals and referrers */}
            <div className="flex mb-6 border-b">
              <button 
                onClick={() => setActiveView('referrals')}
                className={`px-6 py-3 font-medium ${activeView === 'referrals' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-600'}`}
              >
                Referrals
              </button>
              <button 
                onClick={() => setActiveView('referrers')}
                className={`px-6 py-3 font-medium ${activeView === 'referrers' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-600'}`}
              >
                Referrers
              </button>
            </div>
            
            {activeView === 'referrals' ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <h2 className="text-xl font-bold p-6 border-b">All Referrals</h2>
                {/* Edit Modal */}
                {selectedReferral && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">Edit Referral</h2>
                          <button 
                            onClick={() => setSelectedReferral(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Referral Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Referrer</p>
                              <p className="font-medium">{selectedReferral.referrerName || 'Unknown'}</p>
                              <p className="text-gray-600">{selectedReferral.referrerEmail || 'Unknown'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Client</p>
                              <p className="font-medium">{selectedReferral.clientName}</p>
                              <p className="text-gray-600">{selectedReferral.clientEmail}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Company</p>
                              <p className="font-medium">{selectedReferral.companyName || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Date Referred</p>
                              <p className="font-medium">{new Date(selectedReferral.dateReferred).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-4 mb-6">
                            <div>
                              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                              </label>
                              <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="potentialValue" className="block text-sm font-medium text-gray-700 mb-1">
                                Potential Value ($)
                              </label>
                              <input
                                type="number"
                                id="potentialValue"
                                name="potentialValue"
                                value={formData.potentialValue}
                                onChange={handleFormChange}
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            
                            {formData.status === "closed" && (
                              <>
                                <div>
                                  <label htmlFor="actualValue" className="block text-sm font-medium text-gray-700 mb-1">
                                    Actual Value ($)
                                  </label>
                                  <input
                                    type="number"
                                    id="actualValue"
                                    name="actualValue"
                                    value={formData.actualValue}
                                    onChange={handleFormChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  />
                                </div>
                                
                                <div>
                                  <label htmlFor="commission_rate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Commission Rate
                                  </label>
                                  <select
                                    id="commission_rate"
                                    name="commission_rate"
                                    value={formData.commission_rate}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  >
                                    <option value="0.05">5% (Recommend Only)</option>
                                    <option value="0.15">15% (Refer & Close)</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label htmlFor="commission" className="block text-sm font-medium text-gray-700 mb-1">
                                    Commission Amount ($)
                                  </label>
                                  <input
                                    type="number"
                                    id="commission"
                                    name="commission"
                                    value={formData.commission}
                                    onChange={handleFormChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Auto-calculated based on actual value and commission rate, but can be adjusted manually.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => setSelectedReferral(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="flex border-b overflow-x-auto">
                    <button
                      onClick={() => handleTabChange("all")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "all"
                          ? "border-b-2 border-red-600 text-red-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      All Referrals
                    </button>
                    <button
                      onClick={() => handleTabChange("pending")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "pending"
                          ? "border-b-2 border-red-600 text-red-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleTabChange("closed")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "closed"
                          ? "border-b-2 border-red-600 text-red-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Closed
                    </button>
                    <button
                      onClick={() => handleTabChange("rejected")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "rejected"
                          ? "border-b-2 border-red-600 text-red-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Rejected
                    </button>
                  </div>
                </div>
                
                {/* Referrals Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {filteredReferrals.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No referrals found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Referrer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Client
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Commission
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredReferrals.map((referral) => (
                            <tr key={referral.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(referral.dateReferred).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{referral.referrerName || 'Unknown'}</div>
                                <div className="text-sm text-gray-500">{referral.referrerEmail || 'Unknown'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{referral.clientName}</div>
                                <div className="text-sm text-gray-500">{referral.clientEmail}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {referral.companyName || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  referral.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : referral.status === "closed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${referral.actualValue || referral.potentialValue || 0}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {referral.commission ? `$${referral.commission}` : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleEditReferral(referral)}
                                  className="text-red-600 hover:text-red-900 mr-3"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteReferral(referral.id)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <h2 className="text-xl font-bold p-6 border-b">All Referrers</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uses</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referrers.length > 0 ? (
                        referrers.map((referrer) => (
                          <tr key={referrer.code}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{referrer.name || 'Unknown'}</div>
                              {referrer.email && (
                                <div className="text-sm text-gray-500">{referrer.email}</div>
                              )}
                              <div className="text-xs text-gray-400">{referrer.user_id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{referrer.code}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {referrer.uses || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(referrer.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            No referrers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
