import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Logo } from '../../components/Logo';

export const AdminLayout = () => {
  const { currentUser, logout, authLoading } = useTravel();
  const location = useLocation();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">
        <span className="text-sm font-bold">Verifying Admin Permissions...</span>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'ADMIN') {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Trip Requests', path: '/admin/requests', icon: '📋' },
    { name: 'Customers', path: '/admin/customers', icon: '👥' },
    { name: 'Itineraries', path: '/admin/itineraries', icon: '🗺️' },
    { name: 'Quotations', path: '/admin/quotations', icon: '💰' },
    { name: 'Destinations', path: '/admin/destinations', icon: '📍' },
    { name: 'Hero Slides', path: '/admin/hero', icon: '🖼️' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#174A3A] text-white flex flex-col justify-between p-6 flex-shrink-0 border-r border-[#174A3A]">
        <div className="space-y-8">
          
          {/* SIDEBAR BRAND LOGO */}
          <div className="pt-2 border-b border-white/10 pb-4">
            <Logo variant="light" />
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#E7A92B] uppercase block mt-2">
              ADMINISTRATOR SUITE
            </span>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#E7A92B] text-[#174A3A] shadow-md'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* SIDEBAR FOOTER & USER META */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#E7A92B] text-[#174A3A] font-extrabold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-white text-xs truncate">{currentUser.name}</h4>
              <p className="text-[10px] text-emerald-200 truncate">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              className="flex-1 py-2 text-center rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-colors"
            >
              Live Site
            </Link>
            <button
              onClick={logout}
              className="flex-1 py-2 text-center rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-bold text-[11px] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
