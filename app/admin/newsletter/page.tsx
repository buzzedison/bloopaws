'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="max-w-7xl mx-auto px-4 py-8 w-full mt-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
                        <p className="text-gray-600">ConvertKit Integration & Builder Sheet Stats</p>
                    </div>
                    <Link
                        href="/admin"
                        className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                    >
                        <span>←</span> Back to Dashboard
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 border border-red-200">
                        {error}. Make sure CONVERTKIT_API_SECRET is set in .env
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Total Subscribers</h3>
                            {loading ? (
                                <div className="h-10 w-24 bg-gray-100 animate-pulse rounded"></div>
                            ) : (
                                <p className="text-5xl font-black text-red-600">{stats?.totalSubscribers.toLocaleString() || 0}</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Newsletter Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href="https://app.convertkit.com/broadcasts"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                                >
                                    Create New Broadcast
                                </a>
                                <button
                                    onClick={fetchStats}
                                    className="block w-full text-center py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Refresh Analytics
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-4 text-center italic">
                                Broadcasting is handled via Kit's secure interface.
                            </p>
                        </div>
                    </div>

                    {/* Recent Subscribers Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Recent Signups</h3>
                                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Live Feed</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
                                        <tr>
                                            <th className="px-6 py-4">Email Address</th>
                                            <th className="px-6 py-4">Joined At</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loading ? (
                                            [...Array(5)].map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td className="px-6 py-4 flex gap-3 items-center">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                                        <div className="h-4 w-32 bg-gray-100 rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 rounded"></div></td>
                                                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded"></div></td>
                                                </tr>
                                            ))
                                        ) : stats?.recentSubscribers.length ? (
                                            stats.recentSubscribers.map((sub) => (
                                                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-900">{sub.email}</td>
                                                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500 italic">
                                                    No recent subscribers found.
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
        </div>
    );
}
