import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminAPI, tripRequestsAPI } from '../../services/api';
import { getStatusBadgeStyle } from '../CustomerDashboard';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const m = await adminAPI.getMetrics();
        setMetrics(m);
        const reqs = await tripRequestsAPI.getAll();
        setRecentRequests(reqs.slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return <div className="text-xs font-bold text-[#174A3A]">Loading Admin Dashboard...</div>;
  }

  const statCards = [
    { label: 'Total Requests', value: metrics?.totalRequests || 0, color: 'border-l-4 border-slate-900 bg-white' },
    { label: 'New Requests', value: metrics?.newRequests || 0, color: 'border-l-4 border-blue-500 bg-blue-50/40' },
    { label: 'Under Review', value: metrics?.underReview || 0, color: 'border-l-4 border-purple-500 bg-purple-50/40' },
    { label: 'Planning', value: metrics?.planning || 0, color: 'border-l-4 border-cyan-500 bg-cyan-50/40' },
    { label: 'Quotes Sent', value: metrics?.quotesSent || 0, color: 'border-l-4 border-amber-500 bg-amber-50/40' },
    { label: 'Confirmed Trips', value: metrics?.confirmed || 0, color: 'border-l-4 border-emerald-500 bg-emerald-50/40' }
  ];

  return (
    <div className="space-y-8">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            CONCIERGE METRICS & OVERVIEW
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Admin Dashboard</h1>
        </div>
        
        <div className="flex gap-3">
          <Link
            to="/admin/requests"
            className="px-5 py-2.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Manage All Requests →
          </Link>
        </div>
      </div>

      {/* METRICS STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className={`p-4 rounded-2xl shadow-sm border border-slate-200/80 ${s.color}`}>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{s.label}</span>
            <span className="font-sans text-2xl font-extrabold text-[#174A3A] mt-1 block">{s.value}</span>
          </div>
        ))}
      </div>

      {/* RECENT TRIP REQUESTS TABLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div>
            <h2 className="font-sans text-lg font-bold text-[#174A3A]">Recent Customer Trip Requests</h2>
            <p className="text-xs text-slate-500">Latest enquiries submitted by customers.</p>
          </div>
          <Link to="/admin/requests" className="text-xs font-bold text-[#087F8C] hover:underline">
            View All ({metrics?.totalRequests}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="py-3 px-3">Request ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Destination</th>
                <th className="py-3 px-3">Travelers</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentRequests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#174A3A]">{r.requestNumber}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900">{r.customerName}</td>
                  <td className="py-3.5 px-3 font-bold text-[#087F8C]">{r.destination}</td>
                  <td className="py-3.5 px-3">{r.adults} Adults {r.children ? `, ${r.children} Kids` : ''}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeStyle(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => navigate(`/admin/requests/${r.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#174A3A] text-white font-bold text-[11px] hover:bg-[#087F8C]"
                    >
                      Manage →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
