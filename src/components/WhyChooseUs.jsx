import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WhyChooseUs = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      number: '01',
      title: 'Personal Trip Design',
      tagline: 'Planned around you',
      description: 'Customized around your destination, dates, and travel style.',
      icon: (
        <svg className="w-5 h-5 text-[#087F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Handpicked Stays',
      tagline: 'Vetted hotels & stays',
      description: 'Carefully selected resorts, villas, and authentic experiences.',
      icon: (
        <svg className="w-5 h-5 text-[#087F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Local Expertise',
      tagline: 'Insider destination care',
      description: 'Practical guidance from experts who know every location.',
      icon: (
        <svg className="w-5 h-5 text-[#087F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      number: '04',
      title: '24/7 Support',
      tagline: 'There at every step',
      description: 'Complete peace of mind before, during, and after your trip.',
      icon: (
        <svg className="w-5 h-5 text-[#087F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <span className="text-[11px] font-extrabold tracking-widest text-[#087F8C] uppercase">
            WHY TRAVEL WITH NIRA TOURS & TRAVELS?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#174A3A]">
            One team. <span className="text-[#087F8C]">Your entire journey.</span>
          </h2>
        </div>

        {/* 4 CARDS IN ONE ROW FOR DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative rounded-xl p-5 bg-[#F8F4EC] border border-slate-200/70 hover:bg-white hover:border-[#087F8C]/40 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* NUMBER & ICON */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-2xl font-extrabold text-[#E7A92B] group-hover:scale-105 transition-transform">
                    {b.number}
                  </span>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs group-hover:border-[#087F8C]/30 transition-colors">
                    {b.icon}
                  </div>
                </div>

                {/* HEADING & TAGLINE */}
                <div>
                  <h3 className="font-sans text-sm font-bold text-[#174A3A] group-hover:text-[#087F8C] transition-colors leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-[#087F8C] text-[11px] font-semibold mt-0.5">
                    "{b.tagline}"
                  </p>
                </div>

                {/* SUPPORTING SENTENCE */}
                <p className="text-slate-600 text-xs font-normal leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/plan-my-trip')}
            className="px-7 py-3 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-[11px] uppercase tracking-wider transition-colors shadow-xs inline-flex items-center gap-2 group"
          >
            <span>Start Planning Your Journey</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};


