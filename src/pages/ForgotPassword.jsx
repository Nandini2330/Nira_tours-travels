import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const ForgotPassword = () => {
  const { forgotPassword } = useTravel();
  const [email, setEmail] = useState('');
  const [resetInfo, setResetInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      setResetInfo(res);
    } catch (err) {
      setError(err.message || 'Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#087F8C] uppercase">
            ACCOUNT RECOVERY
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">
            Reset Your Password
          </h1>
          <p className="text-slate-500 text-xs">
            Enter your email address to receive password recovery instructions.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-semibold">
              ⚠️ {error}
            </div>
          )}

          {resetInfo ? (
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 text-2xl font-bold flex items-center justify-center mx-auto">
                ✉️
              </div>
              <h3 className="font-sans font-bold text-[#174A3A] text-base">
                Password Reset Link Generated
              </h3>
              <p className="text-xs text-slate-600">
                We sent password reset instructions to <span className="font-bold text-slate-900">{resetInfo.email}</span>.
              </p>

              {/* SIMULATED DIRECT RESET LINK FOR FAST TESTING */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block">
                  ⚡ Secure Reset Token Link:
                </span>
                <Link
                  to={`/reset-password/${resetInfo.token}`}
                  className="text-xs text-[#174A3A] font-bold underline break-all hover:text-[#087F8C]"
                >
                  /reset-password/{resetInfo.token}
                </Link>
              </div>

              <div className="pt-2">
                <Link to="/login" className="text-xs font-bold text-[#087F8C] hover:underline">
                  ← Back to Log In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Registered Email Address
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                {loading ? 'Processing...' : 'Send Password Reset Link'}
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-slate-900">
                  ← Return to Log In
                </Link>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
