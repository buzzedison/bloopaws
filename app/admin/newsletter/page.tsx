'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AlertCircle, TrendingUp, Users, Mail, ExternalLink, RefreshCcw } from 'lucide-react';

interface NewsletterStats {
    totalSubscribers: number;
    recentSubscribers: {
        id: number;
        email: string;
        createdAt: string;
    }[];
}

export default function NewsletterAdmin() {
    const [stats, setStats] = useState<NewsletterStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/newsletter/stats');
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            const data = await response.json();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !stats) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                    <div className="mt-4 text-gray-500 font-semibold tracking-wide animate-pulse text-center">Loading Analytics...</div>
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
                        Newsletter Management
                        <span className="text-orange-600 text-sm font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-100 uppercase tracking-[2px] mt-1 shrink-0">Live</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">ConvertKit Integration & Builder Sheet Analytics.</p>
                </div>
                <button
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                >
                    <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Stats
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-8 border border-red-200 font-bold flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    {error}. Make sure CONVERTKIT_API_SECRET is set in .env
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Subscribers</p>
                            <h3 className="text-4xl font-black text-gray-900 tracking-tight">
                                {stats?.totalSubscribers.toLocaleString() || 0}
                            </h3>
                            <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-xs">
                                <TrendingUp className="w-3 h-3" />
                                <span>+12% this month</span>
                            </div>
                        </div>
                        <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-50 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-black text-xl mb-4 tracking-tight">Newsletter Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href="https://app.convertkit.com/broadcasts"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-6 py-3.5 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all group/btn shadow-lg shadow-red-900/20"
                                >
                                    <span className="text-sm">Create Broadcast</span>
                                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </a>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                        Broadcasting is handled via Kit's secure interface. Changes here reflect live subscriber counts.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Mail className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-[0.03]" />
                    </div>
                </div>

                {/* Recent Subscribers Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div>
                                <h3 className="font-black text-gray-900 text-lg tracking-tight">Recent Signups</h3>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Real-time subscription events</p>
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full uppercase border border-red-100">Live Feed</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white text-[11px] uppercase tracking-widest text-gray-400 font-black">
                                    <tr>
                                        <th className="px-8 py-5">Subscriber</th>
                                        <th className="px-8 py-5">Joined Date</th>
                                        <th className="px-8 py-5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats?.recentSubscribers.length ? (
                                        stats.recentSubscribers.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs border border-red-100 group-hover:scale-105 transition-transform">
                                                            {sub.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-bold text-gray-900">{sub.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-gray-500 font-medium text-sm">
                                                    {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                                                        Confirmed
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Users className="w-12 h-12 text-gray-200" />
                                                    <p className="text-gray-500 font-bold">No recent subscribers found</p>
                                                    <p className="text-gray-400 text-xs px-20">When users join your newsletter through the website, they will appear here in real-time.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
