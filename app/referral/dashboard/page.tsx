"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';
import {
  getReferrals,
  getReferralStats,
  updateReferralStatus,
  generateReferralCode,
  getLinkAnalytics,
  type LinkAnalytics,
} from "../actions";

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

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending:           { label: "Pending",           className: "bg-yellow-100 text-yellow-800" },
  contacted:         { label: "Contacted",         className: "bg-blue-100 text-blue-800" },
  meeting_scheduled: { label: "Meeting Scheduled", className: "bg-purple-100 text-purple-800" },
  proposal_sent:     { label: "Proposal Sent",     className: "bg-indigo-100 text-indigo-800" },
  closed_won:        { label: "Closed Won",        className: "bg-green-100 text-green-800" },
  closed_lost:       { label: "Closed Lost",       className: "bg-gray-200 text-gray-600" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, className: "bg-gray-200 text-gray-600" };
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.className}`}>
      {s.label}
    </span>
  );
}

export default function ReferralDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading]           = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [referrals, setReferrals]           = useState<Referral[]>([]);
  const [stats, setStats]                   = useState<ReferralStats>({
    totalReferrals: 0, pendingReferrals: 0, closedReferrals: 0, totalEarnings: 0,
  });
  const [activeTab, setActiveTab]           = useState("all");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [referralCode, setReferralCode]     = useState<string>("");
  const [copySuccess, setCopySuccess]       = useState(false);
  const [analytics, setAnalytics]           = useState<LinkAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [activeSection, setActiveSection]   = useState<"referrals" | "analytics">("referrals");

  // Auth check + get referral code
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
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

  // Fetch referrals + stats
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      try {
        const [referralsData, statsData] = await Promise.all([
          getReferrals(),
          getReferralStats(),
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

  // Fetch analytics when code is ready & analytics tab opened
  useEffect(() => {
    if (!referralCode || activeSection !== "analytics") return;
    setAnalyticsLoading(true);
    getLinkAnalytics(referralCode)
      .then(setAnalytics)
      .catch(err => console.error("Error fetching analytics:", err))
      .finally(() => setAnalyticsLoading(false));
  }, [referralCode, activeSection]);

  const handleStatusUpdate = async (referralId: string, newStatus: string) => {
    setStatusUpdateLoading(true);
    try {
      await updateReferralStatus(referralId, newStatus);
      setReferrals(prev =>
        prev.map(r => r.id === referralId ? { ...r, status: newStatus } : r)
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update referral status. Please try again.");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const filteredReferrals = referrals.filter(r => {
    if (activeTab === "all")    return true;
    if (activeTab === "pending") return !["closed_won", "closed_lost"].includes(r.status);
    if (activeTab === "closed")  return r.status === "closed_won";
    return true;
  });

  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "https://bloopglobal.com"}/?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

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

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 pt-24">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Partner Dashboard</h1>
            <p className="text-lg opacity-90">Track your referrals, earnings and link analytics</p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login?redirect=/referral/dashboard");
            }}
            className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">

        {/* ── Stat Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Referrals",  value: stats.totalReferrals },
            { label: "In Progress",      value: stats.pendingReferrals },
            { label: "Deals Closed",     value: stats.closedReferrals },
            { label: "Total Earnings",   value: `$${stats.totalEarnings.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-500 text-sm mb-1">{label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>
          ))}
        </div>

        {/* ── Referral Link Card ─────────────────────────────────── */}
        {referralCode && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h4 className="text-lg font-semibold text-gray-800">Your Referral Link</h4>
              <button
                onClick={() => setActiveSection(activeSection === "analytics" ? "referrals" : "analytics")}
                className="text-sm text-red-600 hover:text-red-700 font-medium underline underline-offset-2"
              >
                {activeSection === "analytics" ? "← Back to Referrals" : "View Link Analytics →"}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Share this link. When visitors come to the website through it, every page they view is
              recorded in your analytics so you can see what's working.
            </p>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-lg">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-grow bg-transparent border-none text-gray-700 focus:outline-none text-sm font-mono"
              />
              <button
                onClick={copyToClipboard}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  copySuccess ? "bg-green-500 text-white" : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {copySuccess ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">Code: <span className="font-mono font-semibold">{referralCode}</span></p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION: LINK ANALYTICS
        ══════════════════════════════════════════════════════════ */}
        {activeSection === "analytics" && (
          <div className="mb-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Link Analytics</h2>

            {analyticsLoading ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600 mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading analytics…</p>
              </div>
            ) : analytics ? (
              <>
                {/* Analytics stat cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Unique Visitors",  value: analytics.totalVisits,    icon: "👥" },
                    { label: "Total Page Views", value: analytics.totalPageViews, icon: "👁" },
                    { label: "Conversions",      value: analytics.conversions,    icon: "🎯" },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                      <div className="text-3xl mb-2">{icon}</div>
                      <p className="text-gray-500 text-sm mb-1">{label}</p>
                      <p className="text-3xl font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Conversion rate pill */}
                {analytics.totalVisits > 0 && (
                  <div className="bg-red-50 border border-red-100 rounded-lg px-5 py-3 inline-flex items-center gap-3">
                    <span className="text-sm text-gray-600">Conversion rate:</span>
                    <span className="text-lg font-bold text-red-600">
                      {((analytics.conversions / analytics.totalVisits) * 100).toFixed(1)}%
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Pages */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Top Pages Visited</h3>
                    </div>
                    {analytics.topPages.length === 0 ? (
                      <p className="p-6 text-sm text-gray-400">No page views recorded yet.</p>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {analytics.topPages.map(({ path, count }, idx) => {
                          const maxCount = analytics.topPages[0]?.count ?? 1;
                          const pct = Math.round((count / maxCount) * 100);
                          return (
                            <div key={path} className="px-6 py-3 flex items-center gap-4">
                              <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{path || "/"}</p>
                                <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-gray-700 w-8 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Recent Visitors */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Recent Visitors</h3>
                    </div>
                    {analytics.recentVisits.length === 0 ? (
                      <p className="p-6 text-sm text-gray-400">No visits recorded yet.</p>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {analytics.recentVisits.map(visit => (
                          <div key={visit.id} className="px-6 py-3 flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {visit.landing_page || "/"}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(visit.created_at).toLocaleString()}
                              </p>
                            </div>
                            {visit.converted ? (
                              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                Converted
                              </span>
                            ) : (
                              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">
                                Browsing
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-gray-500">Could not load analytics. Please try again.</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION: REFERRALS TABLE
        ══════════════════════════════════════════════════════════ */}
        {activeSection === "referrals" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { key: "all",     label: "All Referrals" },
                { key: "pending", label: "In Progress"   },
                { key: "closed",  label: "Closed Won"    },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === key
                      ? "text-red-600 border-red-600"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filteredReferrals.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 mb-4">No referrals found.</p>
                <Link href="/referral" className="inline-block text-red-600 hover:text-red-700 font-medium">
                  Refer a client now →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Client", "Date Referred", "Status", "Potential Value", "Commission", "Actions"].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReferrals.map(referral => (
                      <tr key={referral.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{referral.clientName}</div>
                          <div className="text-sm text-gray-500">{referral.clientEmail}</div>
                          {referral.companyName && (
                            <div className="text-xs text-gray-400">{referral.companyName}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(referral.dateReferred).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={referral.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${referral.potentialValue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referral.status === "closed_won" && referral.commission ? (
                            <span className="font-semibold text-green-700">
                              ${referral.commission.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {referral.status !== "closed_won" && referral.status !== "closed_lost" ? (
                            <button
                              onClick={() => handleStatusUpdate(referral.id, "closed_won")}
                              disabled={statusUpdateLoading}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 text-xs"
                            >
                              Mark Closed Won
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusUpdate(referral.id, "pending")}
                              disabled={statusUpdateLoading}
                              className="text-gray-400 hover:text-gray-600 disabled:opacity-50 text-xs"
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
        )}

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="text-center py-4">
          <Link
            href="/referral"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
          >
            Refer More Clients
          </Link>
        </div>
      </div>
    </main>
  );
}
