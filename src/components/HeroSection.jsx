import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HERO_SLIDES = [
  {
    id: 'kerala',
    category: 'EXPLORE INDIA',
    title: 'Kerala',
    description: 'Backwaters & green escapes',
    ctaText: 'Explore Kerala',
    link: '/destinations/kashmir', // or kerala
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'maldives',
    category: 'GO BEYOND INDIA',
    title: 'Maldives',
    description: 'Turquoise days, endless horizons',
    ctaText: 'Explore Maldives',
    link: '/destinations/maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'kashmir',
    category: 'DISCOVER INDIA',
    title: 'Kashmir',
    description: 'Mountains, lakes & quiet escapes',
    ctaText: 'Explore Kashmir',
    link: '/destinations/kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=2000'
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide seamlessly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[82vh] min-h-[620px] max-h-[880px] overflow-hidden bg-slate-900">
      
      {/* DESTINATION SLIDES (SMOOTH CROSSFADE) */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* DESTINATION PHOTOGRAPHY */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* SUBTLE GRADIENT BEHIND TEXT ONLY */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/75 via-slate-950/25 to-transparent" />
          </div>
        );
      })}

      {/* HERO MAIN CONTAINER */}
      <div className="relative z-20 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center pt-20 pb-12">
        
        {/* LOWER-LEFT COMPACT TEXT & CTA */}
        <div className="max-w-xl text-white space-y-3 animate-fadeIn">
          {/* CATEGORY BADGE */}
          <span className="inline-block text-[11px] font-extrabold tracking-[0.2em] text-[#E7A92B] uppercase">
            {activeSlideData.category}
          </span>

          {/* MAIN DESTINATION HEADING (SIMPLE SANS-SERIF) */}
          <h1 className="font-sans text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
            {activeSlideData.title}
          </h1>

          {/* SHORT SUPPORTING LINE */}
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            {activeSlideData.description}
          </p>

          {/* SINGLE COMPACT CTA */}
          <div className="pt-3">
            <Link
              to={activeSlideData.link}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md group"
            >
              <span>{activeSlideData.ctaText}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
