import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const ExploreWorld = () => {
  const navigate = useNavigate();
  const { destinations, toggleWishlist, isInWishlist } = useTravel();
  const [activeRegion, setActiveRegion] = useState('ALL');

  const intlDestinations = destinations.filter(d => d.type === 'international');
  const regions = ['ALL', 'Asia', 'Europe', 'Middle East'];

  const filteredDestinations = activeRegion === 'ALL'
    ? intlDestinations
    : intlDestinations.filter(d => d.region === activeRegion);

  const visaGuides = [
    { country: 'Bali (Indonesia)', type: 'Visa on Arrival', duration: '30 Days', fee: 'Approx. 500,000 IDR (~₹2,700)', process: 'Instant at Denpasar Airport' },
    { country: 'Maldives', type: 'Free Visa on Arrival', duration: '30 Days', fee: 'FREE', process: 'Issued on arrival with valid resort voucher' },
    { country: 'Dubai (UAE)', type: 'Pre-arranged E-Visa', duration: '30 Days', fee: 'Approx. ₹6,500', process: '3-4 business days online approval' },
    { country: 'Thailand', type: 'Visa Exemption / VoA', duration: '30 Days', fee: 'Free / 2000 THB', process: 'Fast-track airport counter' },
    { country: 'Switzerland', type: 'Schengen Visa', duration: 'As per itinerary', fee: '€90 (~₹8,200)', process: 'VFS Global appointment submission' }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-20 pb-24">

      {/* HERO BANNER */}
      <div className="relative bg-[#0F382C] text-white py-20 lg:py-28 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000"
          alt="Maldives resort"
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/70 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#E7A92B]/20 text-[#E7A92B] border border-[#E7A92B]/30 text-xs font-bold tracking-[0.25em] uppercase inline-block">
            Global Horizons
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Explore <span className="italic text-[#E7A92B]">the World.</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Overwater bungalows in the Maldives, high alpine railways in Switzerland, and iconic skyline retreats in Dubai.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate('/plan-my-trip?type=international')}
              className="px-7 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              Plan International Trip
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
                International Escapes
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
                Featured Destinations
              </h2>
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
            <span className="text-3xl">✈️</span>
            <h3 className="text-lg font-bold text-[#174A3A]">No destinations found</h3>
            <p className="text-xs text-slate-500">Try switching your region filter.</p>
            <button
              onClick={() => setActiveRegion('ALL')}
              className="mt-2 px-4 py-2 rounded-full bg-[#174A3A] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* VISA CONCIERGE GUIDE */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Traveler Concierge Info</span>
            <h3 className="font-sans text-2xl font-bold text-[#174A3A]">Visa Requirements for Indian Passport Holders</h3>
            <p className="text-slate-600 text-xs font-light">Essential visa guidelines for popular international destinations.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Visa Category</th>
                  <th className="py-3.5 px-4">Allowed Stay</th>
                  <th className="py-3.5 px-4">Approx Fee</th>
                  <th className="py-3.5 px-4">Processing Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {visaGuides.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#174A3A]">{v.country}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 text-[#087F8C] font-semibold border border-teal-100">
                        {v.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">{v.duration}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{v.fee}</td>
                    <td className="py-4 px-4 text-slate-500">{v.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
