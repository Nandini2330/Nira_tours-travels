import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const { signup } = useTravel();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    country: 'India',
    agreeTerms: true
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.name.trim()) return setError('Full name is required.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setError('Please enter a valid email address.');
    if (!formData.phone.trim() || formData.phone.length < 8) return setError('Please enter a valid phone number.');
    if (!formData.password || formData.password.length < 6) return setError('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (!formData.agreeTerms) return setError('You must agree to the Terms & Privacy Policy.');

    setLoading(true);

    try {
      await signup(formData);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4 space-y-6">
        
        {/* BRAND HEADER */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#087F8C] uppercase">
            JOIN THE CLUB
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">
            Create Your Member Account
          </h1>
          <p className="text-slate-500 text-xs">
            Start crafting bespoke expeditions and receive VIP travel perks.
          </p>
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
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-type password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
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
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded text-[#174A3A] focus:ring-[#087F8C]"
                />
                <span className="text-xs text-slate-600 leading-tight">
                  I agree to the <span className="font-bold text-[#174A3A]">Terms of Service</span> & <span className="font-bold text-[#174A3A]">Privacy Policy</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 pt-3"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <Link to={`/login${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-bold text-[#087F8C] hover:underline">
              Log In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
