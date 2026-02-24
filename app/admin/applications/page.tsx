'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type Application = Database['public']['Tables']['applications']['Row'];
type ApplicationStatus = Database['public']['Tables']['applications']['Row']['status'];

const supabase = createClient();

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  quiz_sent: 'bg-blue-100 text-blue-800',
  quiz_completed: 'bg-purple-100 text-purple-800',
  interview_scheduled: 'bg-indigo-100 text-indigo-800',
  hired: 'bg-emerald-100 text-emerald-800',
  withdrawn: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
  quiz_sent: 'Quiz Sent',
  quiz_completed: 'Quiz Completed',
  interview_scheduled: 'Interview Scheduled',
  hired: 'Hired',
  withdrawn: 'Withdrawn'
};

const roleLabels = {
  mobile: 'Mobile Engineering',
  'bd-sales': 'Business Development',
  investment: 'Investment Analyst'
};

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: ApplicationStatus, notes?: string) => {
    try {
      // Get the current application to track status change
      const currentApp = applications.find(app => app.id === applicationId);
      if (!currentApp) return;

      const { error } = await supabase
        .from('applications')
        .update({
          status: newStatus,
          status_notes: notes,
          status_updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Add to status history
      await supabase
        .from('application_status_history')
        .insert({
          application_id: applicationId,
          old_status: currentApp.status,
          new_status: newStatus,
          notes: notes || `Status changed from ${currentApp.status} to ${newStatus}`,
          changed_by: 'admin' // In production, use actual user
        });

      // Refresh applications
      await fetchApplications();

      // Close modal if open
      setSelectedApplication(null);

    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update application status');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesRole = roleFilter === 'all' || app.role === roleFilter;
    const matchesSearch = !searchQuery ||
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.application_id && app.application_id.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesRole && matchesSearch;
  });

  const getStatusStats = () => {
    const stats = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-gray-500 font-semibold tracking-wide animate-pulse text-center">Loading Applications...</div>
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
            Applications Manager
            <span className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-[2px] mt-1 shrink-0">{applications.length} Total</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Review and manage candidate progress through the Vanguard program.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-10">
        {Object.entries(statusLabels).slice(0, 4).map(([status, label]) => (
          <div key={status} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
              <div className={`w-2 h-2 rounded-full ${status === 'approved' ? 'bg-green-500 shadow-green-200' :
                status === 'pending' ? 'bg-amber-500 shadow-amber-200' :
                  status === 'rejected' ? 'bg-red-500 shadow-red-200' : 'bg-blue-500 shadow-blue-200'
                } shadow-lg`}></div>
            </div>
            <p className="text-3xl font-black text-gray-900 tracking-tight">{stats[status] || 0}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
            >
              <option value="all">All Statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
            >
              <option value="all">All Roles</option>
              {Object.entries(roleLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setStatusFilter('all');
                setRoleFilter('all');
                setSearchQuery('');
              }}
              className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <motion.tr
                  key={application.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.full_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {application.application_id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {roleLabels[application.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[application.status]
                      }`}>
                      {statusLabels[application.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.quiz_completed_at ? (
                      <div>
                        <div className={`font-medium ${application.quiz_passed ? 'text-green-600' : 'text-red-600'}`}>
                          {application.quiz_passed ? 'Passed' : 'Failed'}
                        </div>
                        <div className="text-xs">
                          {application.quiz_score ? `${application.quiz_score}%` : 'N/A'}
                        </div>
                      </div>
                    ) : application.quiz_invited_at ? (
                      <span className="text-blue-600">Sent</span>
                    ) : (
                      <span className="text-gray-400">Not sent</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        const newStatus = application.status === 'approved' ? 'pending' : 'approved';
                        updateApplicationStatus(application.id, newStatus);
                      }}
                      className={`px-3 py-1 rounded text-xs ${application.status === 'approved'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                    >
                      {application.status === 'approved' ? 'Unapprove' : 'Approve'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No applications found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-xl font-bold">{selectedApplication.full_name}</h2>
                      <p className="text-pink-100 text-sm">
                        {roleLabels[selectedApplication.role]} • {selectedApplication.application_id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Status and Actions */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusColors[selectedApplication.status]
                        }`}>
                        {statusLabels[selectedApplication.status]}
                      </span>
                      {selectedApplication.quiz_passed !== null && (
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${selectedApplication.quiz_passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          Quiz: {selectedApplication.quiz_passed ? 'Passed' : 'Failed'}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {selectedApplication.status === 'pending' && (
                        <button
                          onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {selectedApplication.status === 'approved' && (
                        <button
                          onClick={() => updateApplicationStatus(selectedApplication.id, 'quiz_sent')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Send Quiz
                        </button>
                      )}
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">{selectedApplication.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <p className="text-gray-900">{selectedApplication.experience}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <p className="text-gray-900">{selectedApplication.availability}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Links & Portfolio</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                        <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 break-all">
                          {selectedApplication.portfolio}
                        </a>
                      </div>
                      {selectedApplication.linkedin && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                          <a href={selectedApplication.linkedin} target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 break-all">
                            {selectedApplication.linkedin}
                          </a>
                        </div>
                      )}
                      {selectedApplication.github && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">GitHub</label>
                          <a href={selectedApplication.github} target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 break-all">
                            {selectedApplication.github}
                          </a>
                        </div>
                      )}
                      {selectedApplication.referral_source && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Referral Source</label>
                          <p className="text-gray-900">{selectedApplication.referral_source}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Motivation</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.motivation}</p>
                  </div>
                </div>

                {/* Quiz Information */}
                {selectedApplication.quiz_completed_at && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Results</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Score</label>
                          <p className="text-gray-900">{selectedApplication.quiz_score}%</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Result</label>
                          <p className={`font-medium ${selectedApplication.quiz_passed ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedApplication.quiz_passed ? 'Passed' : 'Failed'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Completed</label>
                          <p className="text-gray-900">
                            {new Date(selectedApplication.quiz_completed_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {selectedApplication.quiz_feedback && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">Feedback</label>
                          <p className="text-gray-900">{selectedApplication.quiz_feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3>
                  <textarea
                    placeholder="Add internal notes about this application..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    defaultValue={selectedApplication.admin_notes || ''}
                  />
                </div>

                {/* Application Timeline */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Applied on {new Date(selectedApplication.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedApplication.quiz_invited_at && (
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Quiz invited on {new Date(selectedApplication.quiz_invited_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedApplication.quiz_completed_at && (
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Quiz completed on {new Date(selectedApplication.quiz_completed_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
