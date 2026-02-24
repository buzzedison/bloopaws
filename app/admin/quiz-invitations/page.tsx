'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

const roles = [
  { id: 'mobile', title: 'Mobile Engineering Intern', icon: '📱' },
  { id: 'bd-sales', title: 'Business Development & Sales Intern', icon: '💼' },
  { id: 'investment', title: 'Investment Analyst Intern', icon: '📊' }
];

export default function QuizInvitationsAdmin() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingStatus, setSendingStatus] = useState<Record<string, 'idle' | 'sending' | 'sent' | 'error'>>({});
  const [showManualInvite, setShowManualInvite] = useState(false);
  const [manualInvite, setManualInvite] = useState({
    applicantName: '',
    applicantEmail: '',
    role: 'mobile'
  });

  useEffect(() => {
    fetchApprovedApplications();
  }, []);

  const fetchApprovedApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendQuizInvitation = async (application: any) => {
    const key = `${application.email}-${application.role}`;
    setSendingStatus(prev => ({ ...prev, [key]: 'sending' }));

    try {
      const response = await fetch('/api/quiz/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicantName: application.full_name,
          applicantEmail: application.email,
          role: application.role,
          applicationId: application.id
        }),
      });

      if (response.ok) {
        setSendingStatus(prev => ({ ...prev, [key]: 'sent' }));
        // Refresh applications after successful send
        setTimeout(() => {
          fetchApprovedApplications();
        }, 2000);
      } else {
        setSendingStatus(prev => ({ ...prev, [key]: 'error' }));
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      setSendingStatus(prev => ({ ...prev, [key]: 'error' }));
    }
  };

  const sendManualInvitation = async () => {
    if (!manualInvite.applicantName || !manualInvite.applicantEmail) {
      alert('Please fill in both name and email');
      return;
    }

    const key = `manual-${manualInvite.applicantEmail}-${manualInvite.role}`;
    setSendingStatus(prev => ({ ...prev, [key]: 'sending' }));

    try {
      const response = await fetch('/api/quiz/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicantName: manualInvite.applicantName,
          applicantEmail: manualInvite.applicantEmail,
          role: manualInvite.role,
          applicationId: null // No application ID for manual invites
        }),
      });

      if (response.ok) {
        setSendingStatus(prev => ({ ...prev, [key]: 'sent' }));
        // Reset form
        setManualInvite({
          applicantName: '',
          applicantEmail: '',
          role: 'mobile'
        });
        setTimeout(() => {
          setSendingStatus(prev => ({ ...prev, [key]: 'idle' }));
        }, 3000);
      } else {
        setSendingStatus(prev => ({ ...prev, [key]: 'error' }));
      }
    } catch (error) {
      console.error('Error sending manual invitation:', error);
      setSendingStatus(prev => ({ ...prev, [key]: 'error' }));
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-gray-500 font-semibold tracking-wide animate-pulse text-center">Loading Invitations...</div>
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
            Quiz Invitations
            <span className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-[2px] mt-1 shrink-0">{applications.length} Approved</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Send assessment quiz invitations to approved applicants and track candidate engagement.</p>
        </div>
      </div>

      {/* Manual Invitation Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowManualInvite(!showManualInvite)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {showManualInvite ? '✕' : '+'} Manual Invitation
        </button>

        {showManualInvite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Quiz Invitation to New Applicant</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={manualInvite.applicantName}
                  onChange={(e) => setManualInvite(prev => ({ ...prev, applicantName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={manualInvite.applicantEmail}
                  onChange={(e) => setManualInvite(prev => ({ ...prev, applicantEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={manualInvite.role}
                  onChange={(e) => setManualInvite(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.icon} {role.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={sendManualInvitation}
                  disabled={sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'sending'}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'sending'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'sent'
                      ? 'bg-green-100 text-green-700'
                      : sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                >
                  {sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'sending'
                    ? 'Sending...'
                    : sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'sent'
                      ? '✓ Sent!'
                      : sendingStatus[`manual-${manualInvite.applicantEmail}-${manualInvite.role}`] === 'error'
                        ? '✗ Error'
                        : 'Send Invitation'
                  }
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Use this to invite applicants who haven't gone through the formal application process yet.
              They'll receive the same quiz invitation email as approved applicants.
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-blue-800">Quiz Sent</p>
            <div className="text-xl">📧</div>
          </div>
          <p className="text-3xl font-black text-gray-900 tracking-tight">
            {applications.filter(app => app.quiz_invited_at).length}
          </p>
        </div>
        <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-green-800">Quiz Completed</p>
            <div className="text-xl">✅</div>
          </div>
          <p className="text-3xl font-black text-gray-900 tracking-tight">
            {applications.filter(app => app.quiz_completed_at).length}
          </p>
        </div>
        <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-purple-800">Passed</p>
            <div className="text-xl">🏆</div>
          </div>
          <p className="text-3xl font-black text-gray-900 tracking-tight">
            {applications.filter(app => app.quiz_passed).length}
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="mt-8 space-y-4">
        {applications.map((application) => {
          const statusKey = `${application.email}-${application.role}`;
          const status = sendingStatus[statusKey] || 'idle';
          const selectedRole = roles.find(r => r.id === application.role);

          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {selectedRole && (
                    <div className="text-2xl">{selectedRole.icon}</div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.full_name}
                    </h3>
                    <p className="text-gray-600">{application.email}</p>
                    <p className="text-sm text-gray-500">
                      {selectedRole?.title} • {application.application_id}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    Applied: {new Date(application.created_at).toLocaleDateString()}
                  </div>
                  {application.quiz_invited_at && (
                    <div className="text-sm text-blue-600">
                      Quiz sent: {new Date(application.quiz_invited_at).toLocaleDateString()}
                    </div>
                  )}
                  {application.quiz_completed_at && (
                    <div className={`text-sm font-medium ${application.quiz_passed ? 'text-green-600' : 'text-red-600'
                      }`}>
                      Quiz: {application.quiz_passed ? 'PASSED' : 'FAILED'} ({application.quiz_score}%)
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Experience: {application.experience}
                  </div>
                  <div className="text-sm text-gray-600">
                    Location: {application.location}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {status === 'sent' && (
                    <span className="text-green-600 text-sm font-medium">✓ Invitation sent successfully</span>
                  )}
                  {status === 'error' && (
                    <span className="text-red-600 text-sm font-medium">✗ Failed to send invitation</span>
                  )}

                  {!application.quiz_invited_at && (
                    <button
                      onClick={() => sendQuizInvitation(application)}
                      disabled={status === 'sending'}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${status === 'sending'
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Quiz Invitation'}
                    </button>
                  )}

                  {application.quiz_invited_at && !application.quiz_completed_at && (
                    <span className="text-blue-600 text-sm font-medium">
                      Quiz invitation sent - awaiting completion
                    </span>
                  )}

                  {application.quiz_completed_at && (
                    <span className={`text-sm font-medium px-3 py-1 rounded ${application.quiz_passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      Quiz {application.quiz_passed ? 'Passed' : 'Failed'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Approved Applications</h3>
          <p className="text-gray-500">
            Approved applications will appear here for quiz invitations
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-xl">📋</span> Instructions
        </h3>
        <ul className="text-blue-800/80 space-y-2 font-medium">
          <li>• Review applicant details before sending invitations</li>
          <li>• Each quiz link is unique and can only be used once</li>
          <li>• Invitations are sent via email with embedded quiz links</li>
          <li>• Quiz results will be automatically emailed to ask@bloopglobal.com</li>
          <li>• Short answer questions require manual grading</li>
        </ul>
      </div>
    </div>
  );
}
