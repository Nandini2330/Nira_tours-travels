import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const { login } = useTravel();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-6">
        
        {/* BRAND HEADER */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#087F8C] uppercase">
            MEMBER PORTAL
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">
            Log In to Your Journey
          </h1>
          <p className="text-slate-500 text-xs">
            Access your custom trip requests, itineraries & private quotations.
          </p>
        </div>

        {/* DEMO ACCOUNTS QUICK-BAR */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
          <span className="font-bold text-[#174A3A] block uppercase text-[10px] tracking-wider">⚡ Quick Demo Login:</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('rahul@example.com', 'Customer@123')}
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-[#174A3A] font-semibold hover:bg-amber-100 transition-colors text-[11px]"
            >
              👤 Customer Login (Rahul)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin@omjourneys.com', 'Admin@123')}
              className="px-3 py-1.5 rounded-lg bg-[#174A3A] text-[#E7A92B] font-bold hover:bg-[#087F8C] hover:text-white transition-colors text-[11px]"
            >
              👑 Admin Panel Login
            </button>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-[#087F8C] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#174A3A] focus:ring-[#087F8C]"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Log In to Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Don't have an account yet? </span>
            <Link to={`/signup${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-bold text-[#087F8C] hover:underline">
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
