import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const InternationalDiscovery = () => {
  const navigate = useNavigate();
  const { destinations, toggleWishlist, isInWishlist } = useTravel();

  const intlDestinations = destinations.filter(d => d.type === 'international');

  return (
    <section className="py-16 bg-[#F8F4EC] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">
              Global Luxury Escapes
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
              Go <span className="text-[#087F8C]">further.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/explore-world')}
            className="px-5 py-2.5 rounded-full border border-[#174A3A] text-[#174A3A] font-bold text-xs uppercase tracking-wider hover:bg-[#174A3A] hover:text-white transition-colors self-start md:self-auto"
          >
            Explore The World →
          </button>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {intlDestinations.map((dest) => {
            const saved = isInWishlist(dest.id);
            return (
              <div
                key={dest.id}
                onClick={() => navigate(`/destinations/${dest.id}`)}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* IMAGE */}
                <img
                  src={dest.cardImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/85 via-[#0E3327]/20 to-transparent transition-opacity" />

                {/* WISHLIST BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(dest);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-slate-700 hover:text-[#087F8C] transition-colors"
                >
                  <svg className={`w-4 h-4 ${saved ? 'fill-[#087F8C] text-[#087F8C]' : ''}`} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* BADGE */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-[#E7A92B] text-[#174A3A] text-[10px] font-bold uppercase tracking-wider">
                    {dest.region}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 space-y-1">
                  <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-slate-200 text-xs font-normal">
                    {dest.subtitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
