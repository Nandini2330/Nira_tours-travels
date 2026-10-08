import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useTravel();

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-rose-500 uppercase">
            Saved Expeditions & Escapes
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-slate-900">
            Your Saved Wishlist
          </h1>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            Review your shortlisted destinations and move seamlessly into booking.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-md mx-auto space-y-4 shadow-lg">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              ❤️
            </div>
            <h3 className="font-editorial text-2xl font-bold text-slate-900">
              Your next adventure starts here.
            </h3>
            <p className="text-xs text-slate-500">
              You haven't saved any trips yet. Click the heart icon on any destination or package to save it for later.
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase hover:bg-sunset transition-colors"
            >
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.startingPrice ? `/destinations/${item.id}` : `/booking/${item.id}`)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={item.cardImage || item.image || item.heroImage} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/80 via-transparent to-black/10" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#087F8C] hover:scale-110 transition-transform"
                    title="Remove from wishlist"
                  >
                    <svg className="w-4 h-4 fill-[#087F8C] stroke-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">{item.name || item.title}</h3>
                    <p className="text-[11px] text-slate-200 font-normal">{item.subtitle || item.location}</p>
                  </div>
                </div>

                <div className="p-3.5 border-t border-slate-100 flex items-center justify-end text-xs">
                  <span className="text-[#174A3A] font-bold group-hover:text-[#087F8C] flex items-center gap-1">
                    <span>View Journey</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
