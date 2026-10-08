import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, packages, experiences, toggleWishlist, isInWishlist } = useTravel();

  const [activeTab, setActiveTab] = useState('overview');

  const destination = destinations.find((d) => d.id === id) || destinations[0];
  const matchingPackages = packages.filter((p) => p.destinationId === destination.id || p.type === destination.type);
  const matchingExperiences = experiences.filter((e) => e.location.toLowerCase().includes(destination.name.toLowerCase()));

  const saved = isInWishlist(destination.id);

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* DESTINATION HERO */}
      <div className="relative h-[75vh] min-h-[500px] bg-slate-950 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        {/* HERO CAPTION */}
        <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <div className="space-y-3 max-w-3xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold tracking-widest uppercase">
                {destination.region}
              </span>
              <span className="text-white text-xs font-semibold">
                ⭐ {destination.rating} ({destination.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-7xl font-bold text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-amber-300 font-serif italic text-xl sm:text-2xl">
              "{destination.tagline}"
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigate(`/plan-my-trip?destination=${destination.id}`)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-sunset to-rose-500 text-slate-950 font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
              >
                Plan My {destination.name} Trip
              </button>

              <button
                onClick={() => toggleWishlist(destination)}
                className="px-6 py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-colors flex items-center gap-2"
              >
                <span>{saved ? 'Saved ❤️' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT TABS BAR */}
      <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto no-scrollbar text-sm font-semibold text-slate-600">
            {['overview', 'packages', 'experiences', 'gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 uppercase tracking-wider text-xs border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-10">
              {/* ABOUT SECTION */}
              <div className="space-y-4">
                <h2 className="font-editorial text-3xl font-bold text-slate-900">
                  About {destination.name}
                </h2>
                <p className="text-slate-700 leading-relaxed font-light text-base">
                  {destination.description}
                </p>
              </div>

              {/* HIGHLIGHTS */}
              <div className="space-y-4">
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  Top Destination Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
                        {i + 1}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CURATED PACKAGES PREVIEW */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-2xl font-bold text-slate-900">
                    Curated Trip Itineraries
                  </h3>
                  <button onClick={() => setActiveTab('packages')} className="text-xs font-bold text-sunset">
                    View All →
                  </button>
                </div>

                <div className="space-y-4">
                  {matchingPackages.slice(0, 2).map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md flex flex-col sm:flex-row gap-6 items-center">
                      <img src={pkg.image} alt={pkg.title} className="w-full sm:w-40 h-32 rounded-xl object-cover" />
                      <div className="space-y-2 flex-1">
                        <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                          {pkg.badge}
                        </span>
                        <h4 className="font-editorial text-xl font-bold text-slate-900">{pkg.title}</h4>
                        <p className="text-xs text-slate-500">{pkg.duration} • ₹{pkg.price.toLocaleString('en-IN')}</p>
                        <button
                          onClick={() => navigate(`/booking/${pkg.id}`)}
                          className="px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition-colors"
                        >
                          Book Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SIDEBAR METADATA CARD */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-6 shadow-xl border border-white/10">
                <h3 className="font-editorial text-2xl font-bold text-amber-300">
                  Trip Essentials
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-slate-400 block uppercase tracking-wider">Best Time To Visit</span>
                    <span className="font-semibold text-sm text-white">{destination.bestSeason}</span>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <span className="text-slate-400 block uppercase tracking-wider">Recommended Duration</span>
                    <span className="font-semibold text-sm text-white">{destination.duration}</span>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <span className="text-slate-400 block uppercase tracking-wider">Weather Range</span>
                    <span className="font-semibold text-sm text-white">{destination.weather}</span>
                  </div>

                  <div className="pb-2">
                    <span className="text-slate-400 block uppercase tracking-wider mb-2">Ideal Traveler Types</span>
                    <div className="flex flex-wrap gap-1.5">
                      {destination.idealFor.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/10 rounded-md text-[10px] font-semibold text-amber-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/plan-my-trip?destination=${destination.id}`)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-sunset text-slate-950 font-extrabold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Request Bespoke Itinerary
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-8">
            <h2 className="font-editorial text-3xl font-bold text-slate-900">
              Curated Packages for {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matchingPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg p-6 space-y-4">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-56 rounded-2xl object-cover" />
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">{pkg.badge}</span>
                    <span className="text-lg font-bold text-slate-900">₹{pkg.price.toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-slate-900">{pkg.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{pkg.overview}</p>
                  <button
                    onClick={() => navigate(`/booking/${pkg.id}`)}
                    className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase hover:bg-sunset transition-colors"
                  >
                    Select & Book This Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="space-y-8">
            <h2 className="font-editorial text-3xl font-bold text-slate-900">
              Top Experiences in {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow space-y-3">
                  <img src={exp.image} alt={exp.title} className="w-full h-40 rounded-xl object-cover" />
                  <h4 className="font-bold text-slate-900 text-base">{exp.title}</h4>
                  <p className="text-xs text-slate-500">{exp.duration} • ₹{exp.price.toLocaleString('en-IN')}</p>
                  <button onClick={() => navigate(`/experiences/${exp.id}`)} className="text-xs font-bold text-sunset">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-3xl font-bold text-slate-900">Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[destination.heroImage, destination.cardImage, ...destination.gallery].map((img, i) => (
                <img key={i} src={img} alt="Gallery" className="w-full h-64 rounded-2xl object-cover shadow-md hover:scale-105 transition-transform" />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
