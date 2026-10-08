import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const FeaturedExperiences = () => {
  const navigate = useNavigate();
  const { experiences } = useTravel();

  return (
    <section className="py-20 bg-[#F8F4EC] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-coral uppercase">
              Activities & Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-1">
              Experiences <span className="italic text-ocean">worth travelling for.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/experiences')}
            className="px-5 py-2.5 rounded-full border border-navy text-navy font-bold text-xs uppercase tracking-wider hover:bg-navy hover:text-white transition-colors"
          >
            Explore All Experiences →
          </button>
        </div>

        {/* EXPERIENCES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => navigate(`/experiences/${exp.id}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-navy/90 text-saffron text-[10px] font-bold uppercase tracking-wider">
                    {exp.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-0.5 rounded-full text-navy text-xs font-bold shadow-sm">
                  ₹{exp.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* BODY */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                    📍 {exp.location}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-coral transition-colors">
                    {exp.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>⏱️ {exp.duration}</span>
                  <span className="text-navy font-bold group-hover:text-coral group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>Details</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
