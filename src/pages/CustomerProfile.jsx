import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const CustomerProfile = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useTravel();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || '',
    country: currentUser?.country || 'India',
    newPassword: ''
  });

  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setFormData(prev => ({ ...prev, newPassword: '' }));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        
        {/* TOP BREADCRUMB */}
        <div className="flex items-center justify-between">
          <Link to="/account" className="text-xs font-bold text-[#087F8C] hover:underline">
            ← Back to Dashboard
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Profile</span>
        </div>

        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">My Account & Profile</h1>
          <p className="text-xs text-slate-500">Manage your contact details and password preferences.</p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Email Address (Verified Account Email)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-semibold cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Change Password (Leave blank to keep current)
              </label>
              <input
                type="password"
                placeholder="Enter new password..."
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={logout}
                className="px-5 py-2.5 rounded-xl border border-rose-300 text-rose-600 font-bold text-xs hover:bg-rose-50 transition-colors"
              >
                Log Out
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
