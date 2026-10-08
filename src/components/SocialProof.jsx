import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/reviewsData';

export const SocialProof = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Automatic sliding every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Compute 3 visible reviews starting from startIndex
  const visibleReviews = [
    REVIEWS[startIndex % REVIEWS.length],
    REVIEWS[(startIndex + 1) % REVIEWS.length],
    REVIEWS[(startIndex + 2) % REVIEWS.length]
  ];

  return (
    <section className="py-16 bg-[#F8F4EC] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            TRAVELER REVIEWS
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A]">
            Stories written on the road.
          </h2>
        </div>

        {/* 3 REVIEWS IN A ROW WITH AUTOMATIC 3-SECOND ROTATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${startIndex}-${idx}`}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between space-y-4 animate-fadeIn"
            >
              <div className="space-y-3">
                {/* 5 GOLD STARS */}
                <div className="flex text-[#E7A92B] gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* CLEAN QUOTE */}
                <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* CLEAN USER META (AVATAR + NAME ONLY) */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <h4 className="font-sans font-bold text-[#174A3A] text-xs">
                  {rev.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS DOTS */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                startIndex === idx ? 'w-6 bg-[#087F8C]' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to review group ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
