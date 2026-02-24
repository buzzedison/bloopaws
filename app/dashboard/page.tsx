"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { getReferralStats, generateReferralCode } from "../referral/actions";
import { getActiveMaterials, type Material } from "../admin/materials/actions";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient();

type User = {
  id: string;
  email?: string;
  user_metadata?: { name?: string };
};

const FALLBACK_MARKETING: { title: string }[] = [
  { title: "Official Kazi Brochure (PDF)" },
  { title: "Outbound Email Templates" },
  { title: "LinkedIn Posting Assets" },
  { title: "Bloop Logos & Branding" },
];

const FALLBACK_KNOWLEDGE: { title: string }[] = [
  { title: "Kazi Program Guidelines" },
  { title: "Standard Earning Structure" },
  { title: "Terms & Conditions" },
  { title: "How to Pitch Bloop" },
];

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function Dashboard() {
  const router                                  = useRouter();
  const [user, setUser]                         = useState<User | null>(null);
  const [activeTab, setActiveTab]               = useState("overview");
  const [isLoading, setIsLoading]               = useState(true);
  const [referralCode, setReferralCode]         = useState<string>("");
  const [copiedLink, setCopiedLink]             = useState(false);
  const [stats, setStats]                       = useState({
    totalReferrals: 0, pendingReferrals: 0, closedReferrals: 0, totalEarnings: 0,
  });
  const [materials, setMaterials]               = useState<Material[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user as unknown as User);
        } else {
          router.push("/login?redirect=/dashboard");
          return;
        }

        try {
          const statsData = await getReferralStats();
          setStats({
            totalReferrals:  statsData.totalReferrals  || 0,
            pendingReferrals: statsData.pendingReferrals || 0,
            closedReferrals: statsData.closedReferrals  || 0,
            totalEarnings:   statsData.totalEarnings    || 0,
          });
        } catch (err) {
          console.error("Dashboard: Error fetching referral stats", err);
        }

        try {
          const { code } = await generateReferralCode();
          if (code) setReferralCode(code);
        } catch (err) {
          console.error("Dashboard: Error fetching referral code", err);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // Load materials when Assets tab is opened
  useEffect(() => {
    if (activeTab !== "resources") return;
    setMaterialsLoading(true);
    getActiveMaterials()
      .then(setMaterials)
      .catch(err => console.error("Error loading materials:", err))
      .finally(() => setMaterialsLoading(false));
  }, [activeTab]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "https://bloopglobal.com"}/?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const notionSpring = { type: "spring", stiffness: 400, damping: 30 };
  const cardHover    = { scale: 1.01, y: -2 };

  const marketingMaterials = materials.filter(m => m.category === "marketing");
  const knowledgeMaterials = materials.filter(m => m.category === "knowledge");

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600" />
      </main>
    );
  }

  const tabContent = {
    /* ──────────────────────── COMMAND CENTER ──────────────────────── */
    overview: (
      <motion.div
        key="overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={notionSpring}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome back, {user?.user_metadata?.name?.split(" ")[0] || "Partner"}
          </h1>
          <p className="mt-2 text-neutral-500">Here's what's happening internally.</p>
        </div>

        {/* ── YOUR SHARE LINK ─────────────────────────────── */}
        {referralCode && (
          <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 dark:border-red-500/20 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                Your Personal Referral Link
              </p>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Share this link on social media, email, or anywhere. Every visitor who comes through it
              is tracked — and when they become a client, you earn commission.
            </p>

            {/* Link display */}
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 mb-3">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="flex-1 text-sm font-mono text-neutral-700 dark:text-neutral-300 truncate">
                {referralLink}
              </span>
              <button
                onClick={copyLink}
                className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copiedLink
                    ? "bg-green-500 text-white"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {copiedLink ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/referral/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 dark:text-red-400 hover:underline"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View link analytics →
              </Link>
              <span className="text-xs text-neutral-400">
                Code: <span className="font-mono font-semibold">{referralCode}</span>
              </span>
            </div>
          </div>
        )}

        {/* ── STATS ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={cardHover}
            transition={notionSpring}
            className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800"
          >
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-2">Total Referrals</h3>
            <p className="text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white">{stats.totalReferrals}</p>
          </motion.div>

          <motion.div
            whileHover={cardHover}
            transition={notionSpring}
            className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8h8c-.5-4.5-4.31-8-8-8zm0 10v10c4.31-.5 8-4.31 8-8h-8z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-2">Pending Deals</h3>
            <p className="text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white">{stats.pendingReferrals}</p>
          </motion.div>

          <motion.div
            whileHover={cardHover}
            transition={notionSpring}
            className="p-6 rounded-2xl border border-red-200 bg-red-50 shadow-sm dark:bg-red-500/10 dark:border-red-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent dark:from-red-900/20 z-0" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-red-700 dark:text-red-400 mb-2">Total Earnings</h3>
              <p className="text-4xl font-bold tracking-tighter text-red-700 dark:text-red-400">
                ${stats.totalEarnings.toFixed(2)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── QUICK ACCESS ────────────────────────────────── */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/referral#application"
              className="group flex flex-col p-6 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-red-200 transition-all dark:bg-neutral-900/50 dark:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:border-red-500/40"
            >
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform dark:bg-red-500/20 dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Submit Referral</h3>
              <p className="text-sm text-neutral-500">Got a lead? Feed it to the system.</p>
            </Link>

            <Link
              href="/referral/dashboard"
              className="group flex flex-col p-6 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 transition-all dark:bg-neutral-900/50 dark:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-200 text-neutral-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform dark:bg-neutral-800 dark:text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Partner Dashboard</h3>
              <p className="text-sm text-neutral-500">Track pipeline, analytics & earnings.</p>
            </Link>
          </div>
        </div>
      </motion.div>
    ),

    /* ──────────────────────── ASSETS STUDIO ───────────────────────── */
    resources: (
      <motion.div
        key="resources"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={notionSpring}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Assets Studio</h1>
          <p className="mt-2 text-neutral-500">Everything you need to close the intro.</p>
        </div>

        {materialsLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marketing Arsenal */}
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Marketing Arsenal</h3>
              <ul className="space-y-4">
                {(marketingMaterials.length > 0 ? marketingMaterials : FALLBACK_MARKETING).map((item) => {
                  const isMaterial = "file_url" in item;
                  return (
                    <li key={isMaterial ? (item as Material).id : item.title}>
                      {isMaterial ? (
                        <a
                          href={(item as Material).file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
                              {(item as Material).title}
                            </span>
                            {(item as Material).description && (
                              <p className="text-xs text-neutral-400 truncate mt-0.5">
                                {(item as Material).description}
                              </p>
                            )}
                          </div>
                          <LinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-red-500 flex-shrink-0 ml-3" />
                        </a>
                      ) : (
                        <div className="flex items-center justify-between p-2 -mx-2 rounded-lg cursor-not-allowed opacity-50">
                          <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">{item.title}</span>
                          <DownloadIcon className="w-4 h-4 text-neutral-400" />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {marketingMaterials.length === 0 && (
                <p className="text-xs text-neutral-400 mt-4">Files will be available once uploaded by admin.</p>
              )}
            </div>

            {/* Knowledge Base */}
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Knowledge Base</h3>
              <ul className="space-y-4">
                {(knowledgeMaterials.length > 0 ? knowledgeMaterials : FALLBACK_KNOWLEDGE).map((item) => {
                  const isMaterial = "file_url" in item;
                  return (
                    <li key={isMaterial ? (item as Material).id : item.title}>
                      {isMaterial ? (
                        <a
                          href={(item as Material).file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
                              {(item as Material).title}
                            </span>
                            {(item as Material).description && (
                              <p className="text-xs text-neutral-400 truncate mt-0.5">
                                {(item as Material).description}
                              </p>
                            )}
                          </div>
                          <LinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-red-500 flex-shrink-0 ml-3" />
                        </a>
                      ) : (
                        <div className="flex items-center justify-between p-2 -mx-2 rounded-lg cursor-not-allowed opacity-50">
                          <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">{item.title}</span>
                          <LinkIcon className="w-4 h-4 text-neutral-400" />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {knowledgeMaterials.length === 0 && (
                <p className="text-xs text-neutral-400 mt-4">Files will be available once uploaded by admin.</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    ),

    /* ──────────────────────── SETTINGS ─────────────────────────────── */
    settings: (
      <motion.div
        key="settings"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={notionSpring}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Preferences</h1>
          <p className="mt-2 text-neutral-500">Manage your account identity.</p>
        </div>

        <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-2">Primary Name</p>
              <p className="text-lg font-medium text-neutral-900 dark:text-white">
                {user?.user_metadata?.name || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-2">Authenticated Email</p>
              <p className="text-lg font-medium text-neutral-900 dark:text-white">{user?.email}</p>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-semibold border-2 border-red-500 text-red-600 hover:bg-red-50 transition-colors dark:border-red-500/50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>
    ),
  };

  const tabs = [
    {
      id: "overview",
      label: "Command Center",
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "resources",
      label: "Assets",
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] pt-24 pb-12 overflow-x-hidden selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">

        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 bg-transparent">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-white border border-neutral-200 shadow-sm rounded-lg dark:bg-neutral-900 dark:border-neutral-800 -z-10"
                        transition={notionSpring}
                      />
                    )}
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main canvas */}
        <main className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait">
            {tabContent[activeTab as keyof typeof tabContent]}
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
