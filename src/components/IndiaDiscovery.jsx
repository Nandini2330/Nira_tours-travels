import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const IndiaDiscovery = () => {
  const navigate = useNavigate();
  const { destinations, toggleWishlist, isInWishlist } = useTravel();
  const [activeRegion, setActiveRegion] = useState('ALL');

  const regions = ['ALL', 'North India', 'South India', 'West India', 'Northeast India'];

  const indiaDestinations = destinations.filter(d => d.type === 'india');

  const filteredDestinations = (activeRegion === 'ALL'
    ? indiaDestinations
    : indiaDestinations.filter(d => d.region === activeRegion)
  ).slice(0, 6); // Balanced 6 cards (3x2 grid)

  return (
    <section className="py-16 bg-white relative">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">
              Subcontinent Journeys
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
              India, <span className="text-[#087F8C]">beyond the obvious.</span>
            </h2>
          </div>
        </div>

        {/* REGION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeRegion === region
                  ? 'bg-[#174A3A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* CARDS GRID (PERFECT 6 CARDS 3x2 GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const saved = isInWishlist(dest.id);
            return (
              <div
                key={dest.id}
                onClick={() => navigate(`/destinations/${dest.id}`)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.cardImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/80 via-transparent to-black/10" />
                  
                  {/* REGION BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 text-[#174A3A] text-[10px] font-bold uppercase tracking-wider">
                      {dest.region}
                    </span>
                  </div>

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(dest);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:text-[#087F8C] transition-colors"
                  >
                    <svg className={`w-4 h-4 ${saved ? 'fill-[#087F8C] text-[#087F8C]' : ''}`} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* CARD TITLE & SUBTITLE */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] text-slate-200 font-normal">
                        {dest.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FOOTER BAR */}
                <div className="p-3.5 border-t border-slate-100 flex items-center justify-end text-xs">
                  <span className="text-[#174A3A] font-bold group-hover:text-[#087F8C] flex items-center gap-1">
                    <span>Explore</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/explore-india')}
            className="px-6 py-3 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#087F8C] transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Explore All India Expeditions</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
