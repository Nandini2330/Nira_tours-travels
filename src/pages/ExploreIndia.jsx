import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const ExploreIndia = () => {
  const navigate = useNavigate();
  const { destinations, toggleWishlist, isInWishlist } = useTravel();
  const [activeRegion, setActiveRegion] = useState('ALL');
  const [selectedTheme, setSelectedTheme] = useState('all');

  const indiaDestinations = destinations.filter(d => d.type === 'india');

  const regions = ['ALL', 'North India', 'South India', 'West India', 'Northeast India'];

  const filteredDestinations = indiaDestinations.filter(d => {
    const regionMatches = activeRegion === 'ALL' || d.region === activeRegion;
    const themeMatches = selectedTheme === 'all' || d.category === selectedTheme;
    return regionMatches && themeMatches;
  });

  const themes = [
    { id: 'all', label: 'All Experiences', icon: '✨' },
    { id: 'mountain', label: 'Mountains & Alpine', icon: '🏔️' },
    { id: 'beach', label: 'Coastal & Beaches', icon: '🏖️' },
    { id: 'heritage', label: 'Palaces & Heritage', icon: '🏛️' },
    { id: 'nature', label: 'Nature & Backwaters', icon: '🌿' }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-20 pb-24">

      {/* ELEGANT HERO BANNER */}
      <div className="relative bg-[#0F382C] text-white py-20 lg:py-28 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000"
          alt="Taj Mahal India"
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/70 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#E7A92B]/20 text-[#E7A92B] border border-[#E7A92B]/30 text-xs font-bold tracking-[0.25em] uppercase inline-block">
            Subcontinent Exploration
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Discover India, <span className="italic text-[#E7A92B]">beyond the obvious.</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            From snowy alpine glaciers to royal desert forts, emerald tea valleys, and serene backwater sanctuaries.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate('/plan-my-trip?type=india')}
              className="px-7 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              Plan Custom India Trip
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* SECTION HEADER & REGION TABS */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">
                Geographic Expeditions
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
                Explore by Region
              </h2>
            </div>

            {/* THEME PILLS */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {themes.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setSelectedTheme(th.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedTheme === th.id
                      ? 'bg-[#E7A92B] text-[#174A3A] font-bold shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{th.icon}</span>
                  <span>{th.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* REGION TABS */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeRegion === region
                    ? 'bg-[#174A3A] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* DESTINATIONS GRID */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const saved = isInWishlist(dest.id);
              return (
                <div
                  key={dest.id}
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={dest.cardImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/85 via-transparent to-black/20" />
                    
                    {/* REGION BADGE */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#174A3A] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {dest.region}
                      </span>
                    </div>

                    {/* WISHLIST HEART */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(dest);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-red-500 transition-colors shadow-sm"
                      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <svg
                        className={`w-4 h-4 ${saved ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-currentColor'}`}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* CARD INFO OVERLAY */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-[11.5px] text-slate-200 font-normal line-clamp-1">
                        {dest.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Starting From</span>
                      <span className="font-bold text-[#174A3A] text-sm">₹{dest.startingPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#174A3A] font-bold group-hover:text-[#087F8C] transition-colors">
                      <span>Explore</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <span className="text-3xl">🏞️</span>
            <h3 className="text-lg font-bold text-[#174A3A]">No destinations found</h3>
            <p className="text-xs text-slate-500">Try switching your region or theme filter.</p>
            <button
              onClick={() => { setActiveRegion('ALL'); setSelectedTheme('all'); }}
              className="mt-2 px-4 py-2 rounded-full bg-[#174A3A] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* SEASONAL PLANNER BOX */}
        <div className="bg-[#174A3A] text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E7A92B] uppercase tracking-widest">Seasonal Concierge</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold">When to Visit India</h3>
            <p className="text-slate-200 text-xs font-light">Pick the best climate window for your preferred experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <span className="text-[#E7A92B] font-bold uppercase block">Oct – Mar (Winter)</span>
              <h4 className="font-bold text-sm text-white">Best for Rajasthan & Beach Retreats</h4>
              <p className="text-slate-200 font-light leading-relaxed">Perfect for royal fort heritage tours, golden sand safaris in Jaisalmer, and serene Kerala houseboat stays.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <span className="text-[#087F8C] font-bold uppercase block">Apr – Jun (Summer)</span>
              <h4 className="font-bold text-sm text-white">Best for Kashmir & Hill Stations</h4>
              <p className="text-slate-200 font-light leading-relaxed">Escape heat in blooming Kashmir valley, Gulmarg cable rides, and Shimla-Manali mountain breezes.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <span className="text-emerald-300 font-bold uppercase block">Jul – Sep (Monsoon)</span>
              <h4 className="font-bold text-sm text-white">Best for Meghalaya & Western Ghats</h4>
              <p className="text-slate-200 font-light leading-relaxed">Experience living root bridges in Cherrapunji and emerald monsoon tea plantations in Munnar.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
