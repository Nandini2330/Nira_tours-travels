import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useTravel();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    setLoading(true);

    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#087F8C] uppercase">
            SECURE ACCESS
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">
            Create New Password
          </h1>
          <p className="text-slate-500 text-xs">
            Enter your new password below to secure your account.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                New Password *
              </label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              {loading ? 'Updating...' : 'Set New Password & Log In'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-slate-900">
              ← Return to Log In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
