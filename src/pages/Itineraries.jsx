import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { PACKAGES } from '../data/packagesData';

export const Itineraries = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveItinerary } = useTravel();

  // Builder States
  const [selectedDest, setSelectedDest] = useState(searchParams.get('destination') || 'kashmir');
  const [durationDays, setDurationDays] = useState(6);
  const [travelStyle, setTravelStyle] = useState('Luxury');
  const [interests, setInterests] = useState(['Nature & Scenery', 'Fine Dining']);

  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [selectedPackageModal, setSelectedPackageModal] = useState(null);

  const destinationsList = [
    { id: 'kashmir', name: 'Kashmir', tagline: 'Valleys & Alpine Lakes', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=600' },
    { id: 'rajasthan', name: 'Rajasthan', tagline: 'Royal Forts & Palaces', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600' },
    { id: 'kerala', name: 'Kerala', tagline: 'Backwaters & Green Hills', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600' },
    { id: 'goa', name: 'Goa', tagline: 'Coastal Sunsets & Beaches', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
    { id: 'maldives', name: 'Maldives', tagline: 'Overwater Bungalows', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600' },
    { id: 'bali', name: 'Bali', tagline: 'Tropical Island Escapes', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' }
  ];

  const handleInterestToggle = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerate = () => {
    const destObj = destinationsList.find(d => d.id === selectedDest) || destinationsList[0];
    const numDays = parseInt(durationDays) || 6;

    let days = [];
    for (let i = 1; i <= numDays; i++) {
      if (i === 1) {
        days.push({
          day: 1,
          title: `Arrival & Welcome to ${destObj.name}`,
          morning: `Private VIP escort transfer from airport/station to your handpicked resort in ${destObj.name}.`,
          afternoon: `Check-in, welcome drinks, and leisure relaxation by resort pool or gardens.`,
          evening: `Sunset orientation stroll followed by an authentic regional tasting dinner.`
        });
      } else if (i === numDays) {
        days.push({
          day: numDays,
          title: `Farewell ${destObj.name} & Departure`,
          morning: `Gourmet breakfast & final souvenir shopping for local artisan handicrafts & spices.`,
          afternoon: `Private escort transfer to airport/station with priority assistance.`,
          evening: `Departure flight home with unforgettable memories.`
        });
      } else {
        days.push({
          day: i,
          title: `Day ${i}: ${destObj.name} Highlights & Excursions`,
          morning: `Guided morning visit to famous local landmarks with private expert guide.`,
          afternoon: `Farm-to-table culinary lunch, followed by optional ${interests[0] || 'sightseeing'} tour.`,
          evening: `Relaxing evening with local cultural performance or private dinner.`
        });
      }
    }

    const newItinerary = {
      id: 'itin-' + Date.now(),
      destination: destObj.name,
      title: `${numDays}-Day ${destObj.name} ${travelStyle} Expedition`,
      days
    };

    setGeneratedItinerary(newItinerary);
    saveItinerary(newItinerary);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-20 pb-24 text-slate-800 font-sans">
      
      {/* ELEGANT HERO BANNER */}
      <div className="relative bg-[#0F382C] text-white py-20 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=2000"
          alt="Itinerary studio hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/75 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#E7A92B]/20 text-[#E7A92B] border border-[#E7A92B]/30 text-xs font-bold tracking-[0.25em] uppercase inline-block">
            Custom Itinerary Planner
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Handcrafted Travel <span className="italic text-[#E7A92B]">Itineraries.</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Select your preferred destination, duration, and travel style to generate a complete, day-by-day customized itinerary.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* OPEN BUILDER SECTION (NO NESTED CARD WRAPPER - OPEN PAGE DISPLAY) */}
        {!generatedItinerary ? (
          <div className="space-y-12">
            
            {/* 1. DESTINATION SELECTION (SPACIOUS OPEN GRID) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">Step 01</span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A]">
                    Select Destination
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {destinationsList.map((d) => {
                  const selected = selectedDest === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDest(d.id)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                        selected
                          ? 'border-[#174A3A] ring-4 ring-[#174A3A]/15 shadow-lg scale-105 bg-white'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={d.img}
                          alt={d.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {selected && (
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#174A3A] text-white text-xs font-bold flex items-center justify-center shadow-md">
                            ✓
                          </div>
                        )}

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <h3 className="font-sans font-bold text-sm leading-tight">{d.name}</h3>
                          <p className="text-[10px] text-slate-200 line-clamp-1">{d.tagline}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. DURATION & TRAVEL STYLE (OPEN ROW) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-200/80">
              
              {/* Trip Duration */}
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">Step 02</span>
                <h3 className="font-sans text-xl font-bold text-[#174A3A]">
                  Trip Duration
                </h3>

                <div className="grid grid-cols-4 gap-2">
                  {[4, 6, 8, 10].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDurationDays(d)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        durationDays === d
                          ? 'bg-[#174A3A] text-white border-[#174A3A] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">Step 03</span>
                <h3 className="font-sans text-xl font-bold text-[#174A3A]">
                  Travel Style
                </h3>

                <div className="grid grid-cols-4 gap-2">
                  {['Luxury', 'Heritage', 'Relaxed', 'Adventure'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTravelStyle(s)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        travelStyle === s
                          ? 'bg-[#174A3A] text-white border-[#174A3A] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. HIGHLIGHTS & GENERATE ACTION (OPEN ROW) */}
            <div className="space-y-4 pt-8 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">Step 04</span>
                  <h3 className="font-sans text-xl font-bold text-[#174A3A]">
                    Key Experience Highlights
                  </h3>
                </div>

                {/* GENERATE BUTTON */}
                <button
                  onClick={handleGenerate}
                  className="px-9 py-3.5 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#087F8C] transition-all shadow-md hover:scale-105"
                >
                  Create Day-by-Day Itinerary ✨
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[
                  'Nature & Scenery',
                  'Fine Dining',
                  'Heritage & History',
                  'Relaxation & Spa',
                  'Photography & Wildlife'
                ].map((item) => {
                  const active = interests.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => handleInterestToggle(item)}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-[#E7A92B] text-[#174A3A] border-[#E7A92B] font-bold shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {item}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* GENERATED ITINERARY VIEW (OPEN & SPACIOUS DISPLAY) */
          <div className="space-y-8 animate-fadeIn">
            
            {/* TOP HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-teal-50 text-[#087F8C] border border-teal-100 text-[10px] font-bold uppercase tracking-wider">
                  Generated Custom Expedition
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#174A3A] mt-1.5">
                  {generatedItinerary.title}
                </h2>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white"
                >
                  🖨️ Print Plan
                </button>
                <button
                  onClick={() => navigate(`/plan-my-trip?customItinerary=${encodeURIComponent(generatedItinerary.title)}`)}
                  className="px-6 py-2.5 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#087F8C] transition-colors shadow-sm"
                >
                  Book This Trip →
                </button>
              </div>
            </div>

            {/* DAY BY DAY TIMELINE ROWS */}
            <div className="space-y-6">
              {generatedItinerary.days.map((d) => (
                <div key={d.day} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#174A3A] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      D{d.day}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-[#174A3A]">{d.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-bold text-[#087F8C] block text-[11px] uppercase tracking-wider">🌅 Morning</span>
                      <p className="text-slate-600 leading-relaxed font-light">{d.morning}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-bold text-[#174A3A] block text-[11px] uppercase tracking-wider">☀️ Afternoon</span>
                      <p className="text-slate-600 leading-relaxed font-light">{d.afternoon}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-bold text-[#E7A92B] block text-[11px] uppercase tracking-wider">🌙 Evening</span>
                      <p className="text-slate-600 leading-relaxed font-light">{d.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RE-GENERATE BUTTON */}
            <div className="text-center pt-2">
              <button
                onClick={() => setGeneratedItinerary(null)}
                className="text-xs font-bold text-slate-500 hover:text-[#174A3A] underline"
              >
                ← Edit Preferences & Re-Generate
              </button>
            </div>

          </div>
        )}

        {/* CURATED SIGNATURE ITINERARIES SHOWCASE (OPEN 3-COLUMN GRID) */}
        <div className="space-y-6 pt-10 border-t border-slate-200">
          <div>
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Expert Curations</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
              Signature Tour Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#E7A92B] text-[#174A3A] text-[10px] font-bold uppercase tracking-wider">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-sans text-lg font-bold text-[#174A3A] leading-snug line-clamp-1">{pkg.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{pkg.overview}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#FDFBF7] border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting From</span>
                    <span className="font-bold text-[#174A3A] text-sm">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPackageModal(pkg)}
                    className="px-4 py-2 rounded-full bg-[#174A3A] text-white text-[11px] font-bold hover:bg-[#087F8C] transition-colors"
                  >
                    View Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SIGNATURE ITINERARY MODAL */}
      {selectedPackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-800 animate-fadeIn">
            <button
              onClick={() => setSelectedPackageModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              ✕
            </button>

            <div>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-[#087F8C] border border-teal-100 text-[10px] font-bold uppercase">
                {selectedPackageModal.duration} • {selectedPackageModal.destinationName}
              </span>
              <h2 className="font-sans text-2xl font-bold text-[#174A3A] mt-2">
                {selectedPackageModal.title}
              </h2>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#174A3A] uppercase tracking-wider">Day-by-Day Timeline:</h4>
              {selectedPackageModal.itinerary ? (
                selectedPackageModal.itinerary.map((d) => (
                  <div key={d.day} className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#174A3A] text-white font-bold text-[10px]">Day {d.day}</span>
                      <h5 className="font-bold text-[#174A3A] text-xs">{d.title}</h5>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed">{d.morning}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Day-by-day details available upon booking inquiry.</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting Price</span>
                <span className="text-base font-bold text-[#174A3A]">₹{selectedPackageModal.price.toLocaleString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPackageModal(null)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedPackageModal.title;
                    setSelectedPackageModal(null);
                    navigate(`/plan-my-trip?package=${encodeURIComponent(title)}`);
                  }}
                  className="px-5 py-2 rounded-full bg-[#174A3A] text-white text-xs font-bold uppercase hover:bg-[#087F8C]"
                >
                  Book Package →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
