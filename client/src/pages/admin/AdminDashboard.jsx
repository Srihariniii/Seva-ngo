import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Image,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { statsApi } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Badge from '../../components/common/Badge';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await statsApi.getDashboard();
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Aggregating database statistics..." />;
  }

  const summary = data?.summary || {};
  const recent = data?.recent || {};

  const metricCards = [
    {
      title: 'Total Causes',
      val: summary.totalCauses || 0,
      sub: `${summary.activeCauses || 0} active`,
      icon: HeartHandshake,
      color: 'bg-emerald-50 text-emerald-700',
      link: '/admin/causes'
    },
    {
      title: 'Drives & Events',
      val: summary.totalEvents || 0,
      sub: `${summary.upcomingEvents || 0} upcoming`,
      icon: Calendar,
      color: 'bg-sky-50 text-sky-700',
      link: '/admin/events'
    },
    {
      title: 'Volunteers',
      val: summary.totalVolunteers || 0,
      sub: `${summary.pendingVolunteers || 0} pending review`,
      icon: Users,
      color: 'bg-indigo-50 text-indigo-700',
      link: '/admin/volunteers'
    },
    {
      title: 'Total Raised (Demo/Sim)',
      val: `₹${Number(summary.totalDonationAmount || 0).toLocaleString('en-IN')}`,
      sub: `${summary.totalDonationsCount || 0} total logs`,
      icon: DollarSign,
      color: 'bg-amber-50 text-amber-700',
      link: '/admin/donations'
    },
    {
      title: 'Unread Inquiries',
      val: summary.unreadMessages || 0,
      sub: 'Need response',
      icon: MessageSquare,
      color: 'bg-rose-50 text-rose-700',
      link: '/admin/messages'
    },
    {
      title: 'Gallery Media',
      val: summary.totalGalleryImages || 0,
      sub: 'Photos stored',
      icon: Image,
      color: 'bg-purple-50 text-purple-700',
      link: '/admin/gallery'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management overview of Seva NGO database records and field drives.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/causes"
            className="btn-primary py-2 px-3.5 text-xs flex items-center space-x-1"
          >
            <span>+ Add Cause</span>
          </Link>
          <Link
            to="/admin/events"
            className="btn-secondary py-2 px-3.5 text-xs font-semibold"
          >
            + Create Event
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-seva-600 transition-colors">
                  {card.val}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{card.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tables Row: Recent Donations & Recent Volunteers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-seva-600" />
              <span>Recent Donation Orders</span>
            </h3>
            <Link to="/admin/donations" className="text-xs font-bold text-seva-700 hover:text-seva-800">
              View All
            </Link>
          </div>

          {recent.donations?.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No donations recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-semibold">Donor</th>
                    <th className="pb-2 font-semibold">Amount</th>
                    <th className="pb-2 font-semibold">Cause</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recent.donations?.map((d) => (
                    <tr key={d._id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-semibold text-slate-800">{d.donorName}</td>
                      <td className="py-2.5 font-bold text-seva-700">₹{d.amount}</td>
                      <td className="py-2.5 text-slate-500 max-w-[120px] truncate">{d.causeTitle}</td>
                      <td className="py-2.5">
                        <Badge variant={d.paymentStatus} size="xs">{d.paymentStatus}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Volunteers */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Volunteer Applications</span>
            </h3>
            <Link to="/admin/volunteers" className="text-xs font-bold text-seva-700 hover:text-seva-800">
              View All
            </Link>
          </div>

          {recent.volunteers?.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No applications pending.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-semibold">Applicant</th>
                    <th className="pb-2 font-semibold">City</th>
                    <th className="pb-2 font-semibold">Interest</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recent.volunteers?.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-semibold text-slate-800">{v.name}</td>
                      <td className="py-2.5 text-slate-500">{v.city}</td>
                      <td className="py-2.5 text-slate-600 max-w-[130px] truncate">{v.areaOfInterest}</td>
                      <td className="py-2.5">
                        <Badge variant={v.status} size="xs">{v.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-rose-600" />
            <span>Latest Public Messages & Inquiries</span>
          </h3>
          <Link to="/admin/messages" className="text-xs font-bold text-seva-700 hover:text-seva-800">
            View All
          </Link>
        </div>

        {recent.messages?.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">No inquiries recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">Sender</th>
                  <th className="pb-2 font-semibold">Subject</th>
                  <th className="pb-2 font-semibold">Message Snippet</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recent.messages?.map((m) => (
                  <tr key={m._id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-semibold text-slate-800">{m.name}</td>
                    <td className="py-2.5 font-medium text-slate-700">{m.subject}</td>
                    <td className="py-2.5 text-slate-500 max-w-xs truncate">{m.message}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.isRead ? 'bg-slate-100 text-slate-600' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {m.isRead ? 'Read' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
