'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

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
  recentReferrals: any[];
}

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
    recentReferrals: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch applications stats
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (appError) throw appError;

      // Fetch referrals stats
      const { data: referrals, error: refError } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (refError) throw refError;

      // Calculate stats
      const totalApplications = applications?.length || 0;
      const pendingApplications = applications?.filter(app => app.status === 'pending').length || 0;
      const approvedApplications = applications?.filter(app => app.status === 'approved').length || 0;
      const quizSent = applications?.filter(app => app.quiz_invited_at).length || 0;
      const quizCompleted = applications?.filter(app => app.quiz_completed_at).length || 0;
      const quizPassed = applications?.filter(app => app.quiz_passed).length || 0;
      const totalReferrals = referrals?.length || 0;

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        quizSent,
        quizCompleted,
        quizPassed,
        totalReferrals,
        recentApplications: applications?.slice(0, 5) || [],
        recentReferrals: referrals?.slice(0, 5) || []
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const adminSections = [
    {
      title: 'Applications',
      description: 'Manage Vanguard Program applications',
      href: '/admin/applications',
      icon: '📋',
      stats: `${stats.totalApplications} total`,
      color: 'bg-blue-500'
    },
    {
      title: 'Quiz Invitations',
      description: 'Send quiz invitations to approved applicants',
      href: '/admin/quiz-invitations',
      icon: '📧',
      stats: `${stats.quizSent} sent`,
      color: 'bg-green-500'
    },
    {
      title: 'Quiz Submissions',
      description: 'Review completed quiz attempts and scores',
      href: '/admin/quiz-submissions',
      icon: '📝',
      stats: `${stats.quizCompleted} completed`,
      color: 'bg-red-500'
    },
    {
      title: 'Referrals',
      description: 'Manage referral partnerships and commissions',
      href: '/admin/referrals',
      icon: '🤝',
      stats: `${stats.totalReferrals} total`,
      color: 'bg-purple-500'
    },
    {
      title: 'Newsletter',
      description: 'Manage ConvertKit subscribers and analytics',
      href: '/admin/newsletter',
      icon: '📬',
      stats: 'Subscriber Stats',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-24">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Overview of all admin functions and key metrics
              </p>
            </div>
            <Link
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-xs text-gray-500">{stats.pendingApplications} pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">✅</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approvedApplications}</p>
                <p className="text-xs text-gray-500">Ready for quiz</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📧</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Quiz Sent</p>
                <p className="text-2xl font-bold text-blue-600">{stats.quizSent}</p>
                <p className="text-xs text-gray-500">{stats.quizCompleted} completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🏆</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Quiz Passed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.quizPassed}</p>
                <p className="text-xs text-gray-500">
                  {stats.quizCompleted > 0 ? Math.round((stats.quizPassed / stats.quizCompleted) * 100) : 0}% pass rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {adminSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{section.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600">{section.stats}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{section.description}</p>
              <div className="mt-4 flex items-center text-red-600 group-hover:text-red-700">
                <span className="text-sm font-medium">Manage</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
              <Link
                href="/admin/applications"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {stats.recentApplications.length > 0 ? (
                stats.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${app.status === 'pending' ? 'bg-yellow-500' :
                          app.status === 'approved' ? 'bg-green-500' :
                            app.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{app.full_name}</p>
                        <p className="text-xs text-gray-500">{app.role} • {new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {app.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-8">No applications yet</p>
              )}
            </div>
          </div>

          {/* Recent Referrals */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Referrals</h3>
              <Link
                href="/admin/referrals"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {stats.recentReferrals.length > 0 ? (
                stats.recentReferrals.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${ref.status === 'pending' ? 'bg-yellow-500' :
                          ref.status === 'closed' ? 'bg-green-500' :
                            ref.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ref.client_name}</p>
                        <p className="text-xs text-gray-500">From {ref.referrer_name} • {new Date(ref.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${ref.potential_value}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${ref.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          ref.status === 'closed' ? 'bg-green-100 text-green-800' :
                            ref.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {ref.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-8">No referrals yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/quiz-invitations"
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="mr-2">📧</span>
              Send Quiz Invitations
            </Link>
            <button
              onClick={fetchDashboardData}
              className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="mr-2">🔄</span>
              Refresh Data
            </button>
            <Link
              href="/admin/applications"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="mr-2">👀</span>
              Review Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
