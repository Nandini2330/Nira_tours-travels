import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const Destinations = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { destinations, toggleWishlist, isInWishlist } = useTravel();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || searchParams.get('style') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchRegion = dest.region.toLowerCase().includes(q);
          const matchSubtitle = dest.subtitle.toLowerCase().includes(q);
          const matchDesc = dest.description.toLowerCase().includes(q);
          if (!matchName && !matchRegion && !matchSubtitle && !matchDesc) return false;
        }

        if (typeFilter !== 'all' && dest.type !== typeFilter) return false;

        if (categoryFilter !== 'all' && dest.category !== categoryFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [destinations, searchQuery, typeFilter, categoryFilter, sortBy]);

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            GLOBAL EXPEDITION CATALOG
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#174A3A]">
            Discover Destinations
          </h1>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          
          {/* SEARCH INPUT */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Kashmir, Rajasthan, Bali, Maldives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-xs text-[#174A3A] placeholder-slate-400 focus:outline-none focus:border-[#087F8C]"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* FILTER DROPDOWNS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#087F8C]"
            >
              <option value="all">All Regions (India & World)</option>
              <option value="india">India Only</option>
              <option value="international">International Only</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#087F8C]"
            >
              <option value="all">All Travel Styles</option>
              <option value="beach">Beach & Islands</option>
              <option value="mountain">Mountain & Alpine</option>
              <option value="heritage">Royal Heritage</option>
              <option value="nature">Nature & Backwaters</option>
              <option value="luxury">Luxury Escapes</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#087F8C]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

        </div>

        {/* RESULTS GRID (CLEAN PHOTOGRAPHIC CARDS WITHOUT OVERTEXTING, PRICE OR DAYS) */}
        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-sm mx-auto space-y-3">
            <h3 className="font-sans text-xl font-bold text-[#174A3A]">No journeys found.</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setCategoryFilter('all');
              }}
              className="px-5 py-2 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const saved = isInWishlist(dest.id);
              return (
                <div
                  key={dest.id}
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dest.cardImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/80 via-transparent to-black/10" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 text-[#174A3A] text-[10px] font-bold uppercase tracking-wider">
                        {dest.region}
                      </span>
                    </div>

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

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] text-slate-200 font-normal">
                        {dest.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 border-t border-slate-100 flex items-center justify-end text-xs">
                    <span className="text-[#174A3A] font-bold group-hover:text-[#087F8C] flex items-center gap-1">
                      <span>View Destination</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
