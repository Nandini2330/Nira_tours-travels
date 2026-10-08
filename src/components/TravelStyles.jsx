import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const TravelStyles = () => {
  const navigate = useNavigate();
  const { packages } = useTravel();
  const [selectedStyle, setSelectedStyle] = useState('adventure');

  const styles = [
    { id: 'adventure', label: 'Adventure' },
    { id: 'relax', label: 'Relaxation' },
    { id: 'romance', label: 'Romance' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'culture', label: 'Culture' },
    { id: 'nature', label: 'Nature' },
    { id: 'family', label: 'Family Time' },
    { id: 'solo', label: 'Solo Escape' }
  ];

  // Guaranteed 3 rich cards for every travel personality
  const getPackagesForStyle = (styleId) => {
    let filtered = packages.filter(p => {
      if (styleId === 'relax') return p.category === 'beach' || p.category === 'nature';
      if (styleId === 'adventure') return p.category === 'mountain' || p.type === 'india';
      if (styleId === 'luxury') return p.category === 'luxury' || p.badge === 'Ultra Luxury';
      if (styleId === 'romance') return p.category === 'luxury' || p.category === 'beach';
      if (styleId === 'culture') return p.category === 'heritage';
      if (styleId === 'nature') return p.category === 'nature' || p.category === 'mountain';
      return true;
    });

    if (filtered.length < 3) {
      const remaining = packages.filter(p => !filtered.some(f => f.id === p.id));
      filtered = [...filtered, ...remaining];
    }
    return filtered.slice(0, 3);
  };

  const displayedPackages = getPackagesForStyle(selectedStyle);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            TRAVEL PERSONALITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#174A3A]">
            Match your journey to your mood.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Select a travel style to uncover handpicked destinations tailored for you.
          </p>
        </div>

        {/* ELEGANT CENTERED PILLS */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto mb-12">
          {styles.map((st) => {
            const isActive = selectedStyle === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStyle(st.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#174A3A] text-white shadow-md font-bold scale-105'
                    : 'bg-[#F8F4EC] text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>

        {/* PROMINENT BIGGER CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigate(`/destinations/${pkg.destinationId}`)}
              className="bg-[#F8F4EC] rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#174A3A] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {pkg.destinationName}
                </span>
                {pkg.duration && (
                  <span className="absolute bottom-3 right-4 text-white text-xs font-semibold drop-shadow-sm">
                    {pkg.duration}
                  </span>
                )}
              </div>

              {/* CARD CONTENT */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#174A3A] group-hover:text-[#087F8C] transition-colors leading-snug">
                    {pkg.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {pkg.shortDescription || pkg.highlights?.[0] || 'Handcrafted luxury experience with private transfers and boutique stays.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-[#174A3A] group-hover:text-[#087F8C]">
                  <span>Explore Itinerary</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ACTION BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate(`/destinations?style=${selectedStyle}`)}
            className="px-8 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 group"
          >
            <span>Explore Matching Trips</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

