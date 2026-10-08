import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'New':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Under Review':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Contacted':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Planning':
      return 'bg-cyan-50 text-cyan-800 border-cyan-200';
    case 'Quote Sent':
      return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold';
    case 'Confirmed':
      return 'bg-emerald-600 text-white border-emerald-600 font-extrabold';
    case 'Completed':
      return 'bg-slate-100 text-slate-700 border-slate-300';
    case 'Cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, customerRequests, customerNotifications, markNotificationRead, logout } = useTravel();

  if (!currentUser) {
    return (
      <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 text-center space-y-4">
        <h2 className="font-sans text-2xl font-bold text-[#174A3A]">Please log in to view your dashboard</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase"
        >
          Log In Now
        </button>
      </div>
    );
  }

  const unreadNotifs = customerNotifications.filter(n => !n.read);

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* DASHBOARD HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
              MEMBER CONCIERGE DASHBOARD
            </span>
            <h1 className="font-sans text-2xl sm:text-4xl font-bold text-[#174A3A] mt-1">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              {currentUser.email} • {currentUser.phone || 'No phone set'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/account/profile"
              className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              ⚙️ Edit Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-bold transition-colors"
            >
              Sign Out
            </button>
            <Link
              to="/plan-my-trip"
              className="px-6 py-2.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              + Plan New Trip
            </Link>
          </div>
        </div>

        {/* NOTIFICATIONS SECTION */}
        {customerNotifications.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-bold text-[#174A3A] uppercase tracking-wider flex items-center gap-2">
                <span>🔔 Concierge Alerts</span>
                {unreadNotifs.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#087F8C] text-white text-[10px] font-extrabold">
                    {unreadNotifs.length} New
                  </span>
                )}
              </h3>
            </div>

            <div className="space-y-2">
              {customerNotifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3.5 rounded-2xl border transition-colors cursor-pointer flex justify-between items-start text-xs ${
                    n.read ? 'bg-white/60 border-slate-200/60 text-slate-600' : 'bg-white border-amber-300 font-semibold text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-[#174A3A]">{n.title}</h4>
                    <p className="text-slate-600">{n.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-4">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN SECTION: MY TRIP REQUESTS */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">Your Expeditions</span>
              <h2 className="font-sans text-2xl font-bold text-[#174A3A]">My Trip Requests ({customerRequests.length})</h2>
            </div>
          </div>

          {customerRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-[#087F8C]/10 text-[#087F8C] rounded-full flex items-center justify-center mx-auto text-3xl">
                ✈️
              </div>
              <h3 className="font-sans text-xl font-bold text-[#174A3A]">No trip requests yet</h3>
              <p className="text-xs text-slate-500">
                You haven't submitted any travel requests. Click below to start planning your bespoke journey.
              </p>
              <button
                onClick={() => navigate('/plan-my-trip')}
                className="px-6 py-3 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase tracking-wider"
              >
                Plan My First Trip →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerRequests.map((req) => {
                const badgeClass = getStatusBadgeStyle(req.status);
                const totalTravelers = (req.adults || 1) + (req.children || 0);
                return (
                  <div
                    key={req.id}
                    onClick={() => navigate(`/account/requests/${req.id}`)}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border text-[#174A3A] bg-slate-100">
                          {req.requestNumber}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${badgeClass}`}>
                          {req.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-sans text-xl font-bold text-[#174A3A] group-hover:text-[#087F8C] transition-colors">
                          {req.destination} Escape
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          📅 {req.startDate} {req.endDate ? `– ${req.endDate}` : ''} • 👥 {totalTravelers} {totalTravelers === 1 ? 'Traveler' : 'Travelers'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          Style: {req.travelStyle}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold">
                          Budget: {req.budget}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Submitted {new Date(req.createdAt).toLocaleDateString()}</span>
                      <span className="text-[#174A3A] font-bold group-hover:text-[#087F8C] flex items-center gap-1">
                        <span>View Status & Itinerary</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
