import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useTravel();

  const [email, setEmail] = useState('admin@omjourneys.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role !== 'ADMIN') {
        setError('Access denied. Administrator privileges required.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#174A3A] min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-6">
        
        {/* BRAND HEADER */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#E7A92B] uppercase">
            SECURE MANAGEMENT PORTAL
          </span>
          <h1 className="font-sans text-3xl font-bold text-white">
            Nira Tours & Travels Admin Portal
          </h1>
          <p className="text-emerald-200 text-xs">
            Restricted access for concierge administrators and trip designers.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@omjourneys.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Log In to Admin Portal ⚡'}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            <span>Default Admin Credentials: </span>
            <span className="font-mono text-slate-700 font-bold block mt-0.5">admin@omjourneys.com / Admin@123</span>
          </div>
        </div>

      </div>
    </div>
  );
};
