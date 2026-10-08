import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripRequestsAPI } from '../../services/api';
import { getStatusBadgeStyle } from '../CustomerDashboard';

export const AdminTripRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const data = await tripRequestsAPI.getAll({ search, status: statusFilter });
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [search, statusFilter]);

  const statuses = ['All', 'New', 'Under Review', 'Contacted', 'Planning', 'Quote Sent', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            REQUEST MANAGEMENT
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Trip Requests ({requests.length})</h1>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        
        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search by Request ID (OMJ-XXXX), Customer Name, Email, or Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#174A3A] placeholder-slate-400 focus:outline-none focus:border-[#087F8C]"
        />

        {/* STATUS FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#174A3A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* REQUESTS TABLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        {loading ? (
          <div className="text-center text-xs text-slate-500 py-8">Loading trip requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-xs text-slate-500 py-12">No trip requests matching criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-3">Request ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Travel Dates</th>
                  <th className="py-3 px-3">Travelers</th>
                  <th className="py-3 px-3">Style & Budget</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#174A3A]">{r.requestNumber}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 block">{r.customerName}</span>
                      <span className="text-[10px] text-slate-400">{r.customerEmail}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#087F8C]">{r.destination}</td>
                    <td className="py-3.5 px-3 text-slate-600">{r.startDate}</td>
                    <td className="py-3.5 px-3">{r.adults} Adults {r.children ? `, ${r.children} Kids` : ''}</td>
                    <td className="py-3.5 px-3">
                      <span className="block font-semibold">{r.travelStyle}</span>
                      <span className="text-[10px] text-amber-700">{r.budget}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeStyle(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => navigate(`/admin/requests/${r.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-[#174A3A] text-white font-bold text-[11px] hover:bg-[#087F8C]"
                      >
                        Manage & Quote →
                      </button>
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
