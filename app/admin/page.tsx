'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  FileText,
  CheckCircle2,
  Send,
  Users,
  ArrowUpRight,
  RefreshCcw,
  Clock,
  TrendingUp,
  Zap,
  ChevronRight,
} from 'lucide-react';

const supabase = createClient();

interface Stats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  quizSent: number;
  quizCompleted: number;
  quizPassed: number;
  totalReferrals: number;
  recentApplications: any[];
}

const statusStyle: Record<string, string> = {
  pending:  'bg-amber-50  text-amber-700  ring-amber-200',
  approved: 'bg-green-50  text-green-700  ring-green-200',
  rejected: 'bg-red-50    text-red-600    ring-red-200',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    quizSent: 0,
    quizCompleted: 0,
    quizPassed: 0,
    totalReferrals: 0,
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [{ data: applications }, { data: referrals }] = await Promise.all([
        supabase.from('applications').select('*').order('created_at', { ascending: false }),
        supabase.from('referrals').select('id'),
      ]);

      const apps = applications ?? [];
      setStats({
        totalApplications:  apps.length,
        pendingApplications: apps.filter(a => a.status === 'pending').length,
        approvedApplications: apps.filter(a => a.status === 'approved').length,
        quizSent:      apps.filter(a => a.quiz_invited_at).length,
        quizCompleted: apps.filter(a => a.quiz_completed_at).length,
        quizPassed:    apps.filter(a => a.quiz_passed).length,
        totalReferrals: referrals?.length ?? 0,
        recentApplications: apps.slice(0, 6),
      });
      setLastSync(new Date());
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-[3px] border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const successRate = stats.quizCompleted > 0
    ? Math.round((stats.quizPassed / stats.quizCompleted) * 100)
    : 0;

  const statCards = [
    {
      label: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      sub: `${stats.pendingApplications} pending`,
    },
    {
      label: 'Approved',
      value: stats.approvedApplications,
      icon: CheckCircle2,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      sub: `${stats.totalApplications > 0 ? Math.round((stats.approvedApplications / stats.totalApplications) * 100) : 0}% of total`,
    },
    {
      label: 'Quizzes Sent',
      value: stats.quizSent,
      icon: Send,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      sub: `${stats.quizCompleted} completed`,
    },
    {
      label: 'Pass Rate',
      value: `${successRate}%`,
      icon: Zap,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      sub: `${stats.quizPassed} passed`,
    },
  ];

  return (
    <div className="flex flex-col h-full">

      {/* Top header bar */}
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-base font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400 font-medium">
            Last updated {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-200 border border-gray-200 rounded-lg transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <Link
            href="/admin/applications"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-sm shadow-red-200"
          >
            Manage <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8 space-y-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <card.icon className={`${card.iconColor}`} size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{card.value}</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">{card.label}</p>
              <p className="text-[11px] text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Recent applicants */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Recent Applicants</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Latest entries in the program</p>
              </div>
              <Link href="/admin/applications" className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-200">
              {stats.recentApplications.length > 0 ? (
                stats.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 uppercase shrink-0">
                        {app.full_name?.charAt(0) ?? '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{app.full_name}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 shrink-0" />
                          {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {app.role && <><span className="mx-1 text-gray-300">·</span>{app.role}</>}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ring-1 shrink-0 ml-4 ${statusStyle[app.status] ?? 'bg-gray-50 text-gray-500 ring-gray-200'}`}>
                      {app.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center">
                  <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No applications yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Referrals card */}
            <div className="bg-[#0F1117] rounded-xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-9 h-9 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp size={18} className="text-red-400" />
                </div>
                <p className="text-white font-bold text-sm">Referral Network</p>
                <p className="text-slate-400 text-xs mt-1 mb-4">Active partner tracking</p>
                <div className="text-3xl font-black text-white mb-1">{stats.totalReferrals}</div>
                <p className="text-slate-500 text-[11px] font-medium mb-5">total referral partners</p>
                <Link href="/admin/referrals" className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                  View Report <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Funnel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Quiz Funnel</h3>
              <div className="space-y-4">
                {[
                  { label: 'Invitations Sent', value: stats.quizSent,      color: 'bg-blue-500' },
                  { label: 'Completions',      value: stats.quizCompleted, color: 'bg-orange-500' },
                  { label: 'Passed',           value: stats.quizPassed,    color: 'bg-green-500' },
                ].map((row) => {
                  const pct = stats.quizSent > 0 ? Math.round((row.value / stats.quizSent) * 100) : 0;
                  return (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-500">{row.label}</span>
                        <span className="text-xs font-black text-gray-900">{row.value}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.color} rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Quick Access</h3>
              <div className="space-y-0.5">
                {[
                  { label: 'Applications',     href: '/admin/applications' },
                  { label: 'Quiz Invitations', href: '/admin/quiz-invitations' },
                  { label: 'Quiz Submissions', href: '/admin/quiz-submissions' },
                  { label: 'Newsletter',       href: '/admin/newsletter' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
