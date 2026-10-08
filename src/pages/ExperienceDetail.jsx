import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experiences } = useTravel();

  const exp = experiences.find(e => e.id === id) || experiences[0];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HERO CARD */}
        <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl bg-slate-950">
          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover filter brightness-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white space-y-3 z-10">
            <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold tracking-widest uppercase self-start">
              {exp.category}
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold">{exp.title}</h1>
            <p className="text-amber-300 text-sm font-semibold">📍 {exp.locationDetail || exp.location} • ⏱️ {exp.duration}</p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <h2 className="font-editorial text-3xl font-bold text-slate-900">Experience Overview</h2>
              <p className="text-slate-700 font-light leading-relaxed text-base">{exp.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-slate-900">Experience Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-amber-500 font-bold">✓</span> {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-slate-900">What is Included</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {exp.included.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl h-fit border border-white/10">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-widest block">Experience Fee</span>
              <div className="text-3xl font-bold text-amber-400">₹{exp.price.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-slate-400">per guest (includes all private access)</span>
            </div>

            <button
              onClick={() => navigate(`/plan-my-trip?experience=${encodeURIComponent(exp.title)}`)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-sunset text-slate-950 font-extrabold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Reserve This Experience
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
