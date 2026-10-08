import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BuildItinerarySection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('kashmir');
  const [duration, setDuration] = useState('6-days');
  const [travelers, setTravelers] = useState('couple');
  const [style, setStyle] = useState('luxury');
  const [budget, setBudget] = useState('premium');

  const handleBuildSubmit = (e) => {
    e.preventDefault();
    navigate(`/itineraries/create?destination=${destination}&duration=${duration}&travelers=${travelers}&style=${style}&budget=${budget}`);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CONTAINER CARD */}
        <div className="bg-[#F8F4EC] rounded-2xl p-7 sm:p-11 border border-slate-200/80 shadow-sm space-y-7">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#087F8C]/10 text-[#087F8C] text-[10.5px] font-extrabold tracking-widest uppercase border border-[#087F8C]/20">
              INTERACTIVE ITINERARY BUILDER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#174A3A]">
              Don’t know where to start?
            </h2>
            <p className="text-slate-600 text-xs font-normal">
              Tell us how you want to travel. We’ll help shape your custom journey.
            </p>
          </div>

          <form onSubmit={handleBuildSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              
              {/* STEP 1 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#087F8C] transition-colors space-y-1">
                <label className="text-[9.5px] font-extrabold text-[#087F8C] uppercase tracking-widest block">01 / DESTINATION</label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent text-[#174A3A] font-bold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="kashmir">Kashmir</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="kerala">Kerala</option>
                    <option value="goa">Goa</option>
                    <option value="bali">Bali</option>
                    <option value="maldives">Maldives</option>
                    <option value="dubai">Dubai</option>
                    <option value="switzerland">Switzerland</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#087F8C] transition-colors space-y-1">
                <label className="text-[9.5px] font-extrabold text-[#087F8C] uppercase tracking-widest block">02 / DURATION</label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent text-[#174A3A] font-bold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="4-days">4 Days / 3 Nights</option>
                    <option value="6-days">6 Days / 5 Nights</option>
                    <option value="8-days">8 Days / 7 Nights</option>
                    <option value="10-days">10+ Days</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#087F8C] transition-colors space-y-1">
                <label className="text-[9.5px] font-extrabold text-[#087F8C] uppercase tracking-widest block">03 / TRAVELERS</label>
                <div className="relative">
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-transparent text-[#174A3A] font-bold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="solo">Solo Explorer</option>
                    <option value="couple">Couple / Romantic</option>
                    <option value="family">Family Trip</option>
                    <option value="friends">Friends Group</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#087F8C] transition-colors space-y-1">
                <label className="text-[9.5px] font-extrabold text-[#087F8C] uppercase tracking-widest block">04 / STYLE</label>
                <div className="relative">
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-transparent text-[#174A3A] font-bold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="luxury">5-Star Luxury</option>
                    <option value="heritage">Royal Heritage</option>
                    <option value="adventure">Active Adventure</option>
                    <option value="relaxed">Slow Relaxed</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* STEP 5 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#087F8C] transition-colors space-y-1">
                <label className="text-[9.5px] font-extrabold text-[#087F8C] uppercase tracking-widest block">05 / BUDGET</label>
                <div className="relative">
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-[#174A3A] font-bold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="flexible">Smart Luxury (₹20k - ₹40k)</option>
                    <option value="premium">Premium (₹40k - ₹80k)</option>
                    <option value="ultra">Ultra Signature (₹80k+)</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-1.5"
              >
                <span>Build My Trip</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};
