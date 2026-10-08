import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Experiences = () => {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // 10 Automatic Slideshow Photos for the Hero Section (Ultra HD 1920x1080 Photography)
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=85&w=1920',
      title: 'Jatayu Earth Center & Kerala Backwaters Expedition',
      location: 'Kollam & Alleppey, Kerala',
      category: 'Group Journey'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=85&w=1920',
      title: 'Phuket Emerald Bay & Longtail Lagoon Cruise',
      location: 'Phi Phi Islands, Thailand',
      category: 'Island Escape'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=85&w=1920',
      title: 'Gir Forest Asiatic Lion Wildlife Safari',
      location: 'Gir National Park, Gujarat',
      category: 'Wild Safari'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=1920',
      title: 'Grand Wonders of the World Horizon Tour',
      location: 'Paris, Rome & Dubai',
      category: 'World Tour'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=85&w=1920',
      title: 'Gulmarg Gondola & Kashmir Snow Slopes',
      location: 'Srinagar & Gulmarg, Kashmir',
      category: 'Snow Expedition'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=85&w=1920',
      title: 'Royal Marble Heritage & Taj Sunset View',
      location: 'Agra, Uttar Pradesh',
      category: 'Heritage Special'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=85&w=1920',
      title: 'Thar Desert Dune Safari & Palace Camping',
      location: 'Jaisalmer, Rajasthan',
      category: 'Desert Safari'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1920',
      title: 'Luxury Beachfront Villa & Lagoon Paradise',
      location: 'Bali & Maldives',
      category: 'Tropical Luxury'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=1920',
      title: 'Alpine Valley Lakes & Mountain Passes',
      location: 'Interlaken, Switzerland',
      category: 'Mountain Escape'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=85&w=1920',
      title: 'Aegean Sea Cliffside Village & Sunset Coast',
      location: 'Santorini, Greece',
      category: 'Cliffside Paradise'
    }
  ];

  // Automatic slideshow interval (advances every 3.5 seconds)
  useEffect(() => {
    let timer;
    if (isAutoSliding) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoSliding, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Authentic Successful Trips Data featuring the user's uploaded real trip photos
  const successfulTrips = [
    {
      id: 'jatayu-kerala',
      title: 'Jatayu Earth Center & Kerala Group Expedition',
      location: 'Jatayu Rock, Kollam & Alleppey, Kerala',
      traveler: 'Sharma Family & Friends (14 Travellers)',
      category: 'Group Journey',
      image: '/uploaded-jatayu.jpg',
      fallbackImg: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
      description: 'Group photo captured at the world-famous Jatayu Earth Center, Kollam — the worlds largest bird sculpture, followed by an overnight houseboat cruise on Alleppey backwaters.',
      highlights: ['Jatayu Earth Center Sculpture Entry', 'Cable Car Ride to Rock Peak', 'Private Houseboat Backwater Cruise', 'Traditional Kathakali Cultural Show']
    },
    {
      id: 'thailand-bay',
      title: 'Phuket Emerald Bay & Island Hopping',
      location: 'Phuket & Phi Phi Islands, Thailand',
      traveler: 'Rohan & Ananya (Romantic Couple)',
      category: 'Island Escape',
      image: '/uploaded-thailand.jpg',
      fallbackImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      description: 'Captured on a traditional longtail boat cruising through emerald limestone waters and hidden lagoons of Phi Phi Island.',
      highlights: ['Private Longtail Boat Tour', 'Maya Bay & Bamboo Island Snorkeling', 'Sunset Cliffside Dining', 'Speedboat Lagoon Transfers']
    },
    {
      id: 'wildlife-safari',
      title: 'Wildlife Safari & Lion Sanctuary Tour',
      location: 'Gir National Park, Gujarat',
      traveler: 'Mehta Family (6 Travellers)',
      category: 'Wildlife Safari',
      image: '/uploaded-safari.jpg',
      fallbackImg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
      description: 'Captured inside an open 4x4 safari jeep while witnessing Asiatic lions roaming freely in their natural wilderness habitat.',
      highlights: ['Open 4x4 Safari Jeep Rides', 'Certified Forest Ranger Guide', 'Devalia Safari Zone Access', 'Eco-Lodge Stay']
    },
    {
      id: 'world-wonders',
      title: 'Grand Wonders of the World Group Tour',
      location: 'Paris, Rome, Dubai & Singapore',
      traveler: 'Global Group Tour (18 Travellers)',
      category: 'International Group',
      image: '/uploaded-wonders.jpg',
      fallbackImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
      description: 'Group photo of travelers celebrating at iconic world monuments with end-to-end luxury visa and flight management.',
      highlights: ['All-Inclusive Flight & Visa', '4-Star City Center Hotels', 'Dedicated Tour Manager', 'Monument Priority Fast-Track Passes']
    },
    {
      id: 'kashmir-snow',
      title: 'Kashmir Valley & Gulmarg Snow Expedition',
      location: 'Srinagar & Gulmarg, Kashmir',
      traveler: 'Verma Family (10 Travellers)',
      category: 'Family Expedition',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800',
      description: 'Captured on snow slopes of Gulmarg after taking Asia’s highest Gondola cable car ride to Apharwat Peak.',
      highlights: ['Phase 1 & 2 Gulmarg Gondola', 'Dal Lake Shikara Ride', 'Luxury Houseboat Suite Stay', 'Pahalgam Lidder Valley Drive']
    },
    {
      id: 'rajasthan-fort',
      title: 'Rajasthan Royal Palaces & Desert Safari',
      location: 'Jaipur & Jaisalmer, Rajasthan',
      traveler: 'Kapoor Friends Group (8 Travellers)',
      category: 'Heritage & Desert',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800',
      description: 'Captured at a torchlit courtyard dinner inside a 250-year-old royal palace, followed by desert dune camel camping.',
      highlights: ['Palace Courtyard Royal Feast', 'Jaisalmer Dune Safari', 'Kalbeliya Folk Dance', 'Amber Fort Guided Tour']
    }
  ];

  // Simple What We Include Items
  const inclusions = [
    { icon: '👨‍✈️', title: 'Certified Local Guides', desc: 'Expert local guides, drivers & safari naturalists for every trip.' },
    { icon: '🚗', title: 'Private AC Transport', desc: 'Door-to-door luxury vehicle transfers for comfortable travel.' },
    { icon: '🛡️', title: 'Safety & Equipment', desc: 'Complete safety gear, safari permits & travel assistance.' },
    { icon: '🍵', title: 'Welcome Refreshments', desc: 'Complimentary snacks, local tea, coconuts & bottled water.' }
  ];

  // Simple Traveler Reviews
  const reviews = [
    {
      id: 1,
      name: 'Sharma Family',
      city: 'Delhi',
      trip: 'Kerala Jatayu & Houseboat Trip',
      comment: 'Visiting Jatayu Earth Center and overnighting on the Alleppey houseboat was seamless. Everything was perfectly arranged!'
    },
    {
      id: 2,
      name: 'Rohan & Ananya',
      city: 'Mumbai',
      trip: 'Thailand Island Tour',
      comment: 'Cruising the Phi Phi lagoons on a private longtail boat was the highlight of our trip. Highly recommended!'
    },
    {
      id: 3,
      name: 'Mehta Family',
      city: 'Ahmedabad',
      trip: 'Gir Safari Lion Sanctuary',
      comment: 'Watching Asiatic lions up close from the open safari jeep with our guide was thrilling. My kids loved it!'
    }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-20 pb-20 text-slate-800 font-sans">
      
      {/* 1. AUTOMATIC 10-PHOTO SLIDESHOW HERO BANNER (CLEAN & UNCLUTTERED) */}
      <section className="relative w-full h-[70vh] min-h-[480px] max-h-[650px] bg-slate-900 overflow-hidden flex items-end justify-center">
        {/* AUTOMATICALLY TRANSITIONING SLIDE IMAGES (FULL BRIGHTNESS, NO OVERTEXT) */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* SUBTLE BOTTOM GRADIENT ONLY FOR CAPTION READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* PREV / NEXT ARROW CONTROLS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg text-xl"
          title="Previous Photo"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg text-xl"
          title="Next Photo"
        >
          ›
        </button>

        {/* ELEGANT BOTTOM PHOTO CAPTION (CLEAR LOCATION DISPLAY WITHOUT OVERTEXT) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1 bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 max-w-xl">
            <div className="flex items-center gap-2 text-[#E7A92B] font-bold text-xs uppercase tracking-wider">
              <span>📍 {heroSlides[currentSlide].location}</span>
              <span>•</span>
              <span className="text-white/80">{heroSlides[currentSlide].category}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {heroSlides[currentSlide].title}
            </h2>
            <span className="text-[11px] text-slate-300 font-light block">
              Photo {currentSlide + 1} of {heroSlides.length}
            </span>
          </div>

          {/* SLIDESHOW CONTROLS & DOTS */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => setIsAutoSliding(!isAutoSliding)}
              className="px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <span>{isAutoSliding ? '⏸ Pause' : '▶ Play'}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'w-6 bg-[#E7A92B]'
                      : 'w-2 bg-white/40 hover:bg-white'
                  }`}
                  title={`Photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* 2. SUCCESSFUL TRIP PHOTOS (FEATURING USER'S UPLOADED REAL TRIP PHOTOS) */}
        <div id="successful-photos" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Real Photo Gallery</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">Successful Trip Photos</h2>
            <p className="text-xs text-slate-500 font-light">Click any trip photo below to see where it was clicked, traveler group details, and highlights.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successfulTrips.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrip(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      if (item.fallbackImg) e.target.src = item.fallbackImg;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* LOCATION BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#E7A92B] text-[#174A3A] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      📍 {item.location.split(',')[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                    <span className="text-[10px] text-amber-300 font-bold uppercase block">{item.category}</span>
                    <h3 className="font-bold text-base text-white group-hover:text-[#E7A92B] transition-colors leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-slate-200 font-light line-clamp-1">👥 {item.traveler}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-white flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="text-slate-500 text-[11px]">Click to see location & trip story</span>
                  <span className="font-bold text-[#174A3A] group-hover:text-[#087F8C] flex items-center gap-1">
                    <span>View Trip</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FEATURED VIDEO PLAYER SECTION USING USER'S REQUESTED MP4 VIDEO */}
        <div className="bg-[#174A3A] text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#E7A92B] uppercase tracking-widest">Travel Film</span>
            <h2 className="text-2xl sm:text-3xl font-bold">See Our Journeys in Action</h2>
            <p className="text-slate-200 text-xs font-light">Watch video highlights from our travelers across ocean bays, mountain passes, and desert dunes.</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto bg-black shadow-xl">
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/gemini_generated_video_dd4ddf8b.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* 4. WHAT WE INCLUDE IN EVERY TRIP */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Our Inclusions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">What We Include in Every Journey</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusions.map((inc, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <span className="text-2xl">{inc.icon}</span>
                <h3 className="font-bold text-sm text-[#174A3A]">{inc.title}</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TRAVELER REVIEWS */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Guest Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">Simple Reviews from Our Guests</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[#E7A92B] text-xs">★★★★★</div>
                  <p className="text-xs text-slate-700 font-normal leading-relaxed italic">
                    "{r.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#174A3A]">{r.name}</h4>
                    <span className="text-[10px] text-slate-400">{r.city}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-[#087F8C] text-[10px] font-bold">{r.trip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. FINAL SIMPLE CTA */}
        <div className="bg-[#0F382C] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Plan Your Next Journey?</h2>
          <p className="text-xs text-slate-200 font-light max-w-md mx-auto">
            Tell us where you want to go and we will build a custom trip for you.
          </p>
          <div>
            <button
              onClick={() => navigate('/plan-my-trip')}
              className="px-8 py-3.5 rounded-full bg-[#E7A92B] text-[#174A3A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6981e] transition-colors shadow-md"
            >
              Start Planning My Trip →
            </button>
          </div>
        </div>

      </div>

      {/* TRIP LOCATION DETAIL MODAL */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-800 animate-fadeIn">
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              ✕
            </button>

            <div className="h-56 rounded-2xl overflow-hidden relative bg-slate-100">
              <img
                src={selectedTrip.image}
                alt={selectedTrip.title}
                onError={(e) => {
                  if (selectedTrip.fallbackImg) e.target.src = selectedTrip.fallbackImg;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#174A3A] text-white text-[10px] font-bold">
                📍 {selectedTrip.location}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#087F8C] uppercase">👥 {selectedTrip.traveler}</span>
              <h3 className="text-xl font-bold text-[#174A3A] mt-0.5">{selectedTrip.title}</h3>
              <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed">{selectedTrip.description}</p>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Included In This Trip:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrip.highlights.map((h, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setSelectedTrip(null)}
                className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const loc = selectedTrip.location;
                  setSelectedTrip(null);
                  navigate(`/plan-my-trip?destination=${encodeURIComponent(loc.split(',')[0])}`);
                }}
                className="px-5 py-2 rounded-full bg-[#174A3A] text-white text-xs font-bold uppercase hover:bg-[#087F8C]"
              >
                Plan a Similar Trip →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
