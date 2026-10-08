import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await adminAPI.getCustomers();
        setCustomers(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            MEMBER DIRECTORY
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Customer Accounts ({filtered.length})</h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm">
        <input
          type="text"
          placeholder="Search customers by name, email, or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
        />
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        {loading ? (
          <div className="text-xs text-slate-500 py-8 text-center">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-3">Customer Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Trip Requests</th>
                  <th className="py-3 px-3">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#174A3A]">{c.name}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-900">{c.email}</td>
                    <td className="py-3.5 px-3">{c.phone || 'N/A'}</td>
                    <td className="py-3.5 px-3">{c.city ? `${c.city}, ${c.country}` : c.country}</td>
                    <td className="py-3.5 px-3 font-bold text-[#087F8C]">{c.requestsCount} Requests</td>
                    <td className="py-3.5 px-3 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
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
