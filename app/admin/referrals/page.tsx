"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';

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
  commission_rate?: number;
}

interface ReferralPartnerApplication {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone_number: string;
  city_country: string;
  industry: string;
  network: string;
  motivation: string | null;
  status: "pending" | "approved" | "rejected";
  approved_at: string | null;
  admin_notes: string | null;
}

export default function AdminReferralsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referrers, setReferrers] = useState<any[]>([]);
  const [applications, setApplications] = useState<ReferralPartnerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUserId, setAdminUserId] = useState<string | null>(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<string | null>(null);
  // For switching between referrals and referrers views
  const [activeView, setActiveView] = useState<'referrals' | 'referrers' | 'applications'>('referrals');
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
        setAdminUserId(user.id);
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
        const { data: referralsData, error: referralsError } = await supabase
          .from("referrals")
          .select("*")
          .order("created_at", { ascending: false });

        if (referralsError) throw referralsError;
        setReferrals(
          (referralsData || []).map((referral: any) => ({
            id: referral.id,
            clientName: referral.client_name,
            clientEmail: referral.client_email,
            companyName: referral.company_name,
            status: referral.status,
            dateReferred: referral.created_at,
            potentialValue: referral.potential_value || 0,
            actualValue: referral.actual_value || 0,
            commission: referral.commission || 0,
            referrerName: referral.referrer_name || "Unknown",
            referrerEmail: referral.referrer_email || "Unknown",
            commission_rate: referral.commission_rate || 0.05,
          }))
        );

        const { data: referrersData, error: referrersError } = await supabase
          .from("referral_codes")
          .select("user_id, code, created_at, uses")
          .order("created_at", { ascending: false });

        if (referrersError) throw referrersError;
        setReferrers(referrersData || []);

        const { data: applicationsData, error: applicationsError } = await supabase
          .from("referral_partner_applications")
          .select("*")
          .order("created_at", { ascending: false });

        if (applicationsError) throw applicationsError;
        setApplications((applicationsData || []) as ReferralPartnerApplication[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, supabase]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleApplicationStatusUpdate = async (
    applicationId: string,
    status: ReferralPartnerApplication["status"]
  ) => {
    setUpdatingApplicationId(applicationId);

    try {
      const updatePayload = {
        status,
        approved_at: status === "approved" ? new Date().toISOString() : null,
        approved_by: status === "approved" ? adminUserId : null,
      };

      const { error } = await supabase
        .from("referral_partner_applications")
        .update(updatePayload)
        .eq("id", applicationId);

      if (error) throw error;

      setApplications((previous) =>
        previous.map((application) =>
          application.id === applicationId
            ? {
              ...application,
              status,
              approved_at: updatePayload.approved_at,
            }
            : application
        )
      );
    } catch (error) {
      console.error("Error updating referral partner application status:", error);
      alert("Failed to update application status.");
    } finally {
      setUpdatingApplicationId(null);
    }
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

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-gray-500 font-semibold tracking-wide animate-pulse text-center">Loading Referrals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight flex items-center gap-3">
            Referrals Dashboard
            <span className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-[2px] mt-1 shrink-0">Live Hub</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Manage and track all referrals, referrers, and Kazi partner applications.</p>
        </div>
      </div>

      {!isAdmin ? (
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 mb-6">
          <p className="text-yellow-700 font-medium">You do not have permission to view this page.</p>
        </div>
      ) : (
        <>
          {/* Tabs for switching between referrals and referrers */}
          <div className="flex mb-10 gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveView('referrals')}
              className={`px-6 py-2 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${activeView === 'referrals' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Referrals
            </button>
            <button
              onClick={() => setActiveView('referrers')}
              className={`px-6 py-2 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${activeView === 'referrers' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Referrers
            </button>
            <button
              onClick={() => setActiveView('applications')}
              className={`px-6 py-2 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${activeView === 'applications' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Kazi Applicants
            </button>
          </div>

          {activeView === 'referrals' ? (
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-8 border-b border-gray-50 bg-white">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">All Referrals</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Detailed list of client referrals and their current statuses.</p>
              </div>
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
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "all"
                      ? "border-b-2 border-red-600 text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    All Referrals
                  </button>
                  <button
                    onClick={() => handleTabChange("pending")}
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "pending"
                      ? "border-b-2 border-red-600 text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleTabChange("closed")}
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "closed"
                      ? "border-b-2 border-red-600 text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Closed
                  </button>
                  <button
                    onClick={() => handleTabChange("rejected")}
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "rejected"
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
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${referral.status === "pending"
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
          ) : activeView === 'applications' ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <h2 className="text-xl font-bold p-6 border-b">Kazi Partner Applications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry / Network</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.length > 0 ? (
                      applications.map((application) => (
                        <tr key={application.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{application.full_name}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                            <div className="text-xs text-gray-400">{application.phone_number} · {application.city_country}</div>
                            {application.motivation && (
                              <p className="mt-2 max-w-md text-xs text-gray-500">{application.motivation}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>{application.industry}</div>
                            <div className="text-xs text-gray-500">{application.network}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(application.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : application.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleApplicationStatusUpdate(application.id, "approved")}
                                disabled={updatingApplicationId === application.id}
                                className="rounded bg-green-100 px-3 py-1 text-green-800 hover:bg-green-200 disabled:opacity-60"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleApplicationStatusUpdate(application.id, "rejected")}
                                disabled={updatingApplicationId === application.id}
                                className="rounded bg-red-100 px-3 py-1 text-red-800 hover:bg-red-200 disabled:opacity-60"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleApplicationStatusUpdate(application.id, "pending")}
                                disabled={updatingApplicationId === application.id}
                                className="rounded bg-yellow-100 px-3 py-1 text-yellow-800 hover:bg-yellow-200 disabled:opacity-60"
                              >
                                Set Pending
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No Kazi applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
  );
}
