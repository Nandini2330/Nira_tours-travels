import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Logo } from './Logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist, currentUser } = useTravel();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore India', path: '/explore-india' },
    { name: 'Explore World', path: '/explore-world' },
    { name: 'Itineraries', path: '/itineraries' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/60'
            : 'bg-white/85 backdrop-blur-sm py-4 border-b border-slate-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* NEW BRAND LOGO */}
            <Logo variant="dark" />

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[13.5px] font-medium tracking-wide transition-all duration-200 relative py-1 ${isActive
                        ? 'text-[#174A3A] font-bold'
                        : 'text-slate-700 hover:text-[#174A3A]'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E7A92B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACTION UTILITIES */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-700 hover:text-[#174A3A] hover:bg-slate-100 rounded-full transition-all"
                title="Search destinations"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-slate-700 hover:text-[#087F8C] hover:bg-teal-50 rounded-full transition-all"
                title="Saved Wishlist"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#087F8C] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* AUTHENTICATION / ACCOUNT STATE */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.role === 'ADMIN' ? (
                    <Link
                      to="/admin"
                      className="px-3.5 py-1.5 rounded-full bg-[#E7A92B] text-[#174A3A] font-extrabold text-[11px] uppercase tracking-wider hover:bg-[#d6981e] transition-colors"
                    >
                      Admin Panel ⚡
                    </Link>
                  ) : (
                    <Link
                      to="/account"
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 text-[#174A3A] font-bold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <span>👤</span>
                      <span>{currentUser.name.split(' ')[0]}</span>
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-[#174A3A] font-bold text-xs hover:text-[#087F8C] transition-colors"
                >
                  Log In
                </Link>
              )}

              {/* PLAN MY TRIP CTA */}
              <Link
                to="/plan-my-trip"
                className="px-5 py-2.5 rounded-full bg-[#174A3A] text-white hover:bg-[#087F8C] font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                Plan My Trip
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex sm:hidden items-center gap-2">
              <Link to="/wishlist" className="relative p-2 text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#087F8C] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* SEARCH OVERLAY BAR */}
        {searchOpen && (
          <div className="bg-white border-t border-b border-slate-200 py-3.5 px-4 shadow-md animate-fadeIn">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search Kashmir, Kerala, Bali, Maldives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-300 rounded-full px-5 py-2.5 text-[#174A3A] placeholder-slate-400 focus:outline-none focus:border-[#087F8C] text-xs font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-5 py-1.5 bg-[#E7A92B] text-[#174A3A] font-bold rounded-full text-xs hover:bg-[#d6981e] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white flex flex-col justify-between p-6 pt-24 animate-fadeIn">
          <div className="space-y-3">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-[#174A3A] text-xs focus:outline-none focus:border-[#087F8C]"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-base font-serif tracking-wide py-2 border-b border-slate-100 ${location.pathname === link.path ? 'text-[#087F8C] font-bold' : 'text-slate-700'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <Link
              to="/plan-my-trip"
              className="block w-full text-center py-3 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase tracking-wider"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
