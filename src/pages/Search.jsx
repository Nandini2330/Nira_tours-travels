import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { destinations, packages, experiences } = useTravel();

  const initialQuery = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(initialQuery);

  const q = inputVal.toLowerCase().trim();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputVal });
  };

  const matchedDest = destinations.filter(d =>
    d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
  );

  const matchedPkg = packages.filter(p =>
    p.title.toLowerCase().includes(q) || p.destinationName.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q)
  );

  const matchedExp = experiences.filter(e =>
    e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  );

  const totalResults = matchedDest.length + matchedPkg.length + matchedExp.length;

  const quickSearchTags = ['Kashmir', 'Kerala', 'Thailand', 'Rajasthan', 'Dubai', 'Safari', 'Maldives', 'Snow'];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 pb-24 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HERO SEARCH BAR CONTAINER */}
        <div className="bg-[#174A3A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#E7A92B]/20 text-[#E7A92B] border border-[#E7A92B]/30 text-xs font-bold uppercase tracking-widest inline-block">
              Search Platform
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Discover Your Next <span className="italic text-[#E7A92B]">Journey</span>
            </h1>
          </div>

          {/* DYNAMIC INPUT FORM */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center bg-white rounded-full p-1.5 shadow-lg border border-slate-200">
            <span className="pl-4 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search destinations, experiences, or regions (e.g., Kashmir, Kerala)..."
              className="w-full px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Search
            </button>
          </form>

          {/* QUICK SEARCH TAG PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-300 font-medium">Popular:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputVal(tag);
                  setSearchParams({ q: tag });
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  inputVal.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#E7A92B] text-[#174A3A] font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS HEADER */}
        {q && (
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#174A3A]">Results for "{inputVal}"</h2>
              <p className="text-xs text-slate-500">{totalResults} matching results found</p>
            </div>
            {totalResults > 0 && (
              <span className="px-3 py-1 rounded-full bg-teal-50 text-[#087F8C] text-xs font-bold">
                ✓ Live Results
              </span>
            )}
          </div>
        )}

        {totalResults === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="text-4xl">🏝️</div>
            <h3 className="text-xl font-bold text-[#174A3A]">No matching journeys found</h3>
            <p className="text-xs text-slate-500 font-light">
              Try searching for terms like <span className="font-semibold text-slate-700">"Kashmir"</span>, <span className="font-semibold text-slate-700">"Kerala"</span>, <span className="font-semibold text-slate-700">"Thailand"</span>, or <span className="font-semibold text-slate-700">"Rajasthan"</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* MATCHED DESTINATIONS */}
            {matchedDest.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#174A3A]">Destinations ({matchedDest.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedDest.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => navigate(`/explore-india`)}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2 p-3"
                    >
                      <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
                        <img src={d.cardImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-1 space-y-1">
                        <span className="text-[10px] font-bold text-[#087F8C] uppercase">{d.region}</span>
                        <h4 className="font-bold text-slate-900 group-hover:text-[#174A3A] transition-colors">{d.name}</h4>
                        <p className="text-xs text-slate-500 font-light line-clamp-2">{d.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MATCHED PACKAGES */}
            {matchedPkg.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#174A3A]">Curated Packages ({matchedPkg.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedPkg.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/itineraries`)}
                      className="bg-white rounded-2xl p-4 border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex gap-4 items-center"
                    >
                      <img src={p.image} alt={p.title} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-[#087F8C] uppercase">{p.destinationName}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{p.overview}</p>
                        <span className="inline-block text-[11px] font-bold text-[#174A3A] pt-1">View Itinerary →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
