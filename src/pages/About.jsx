import React from 'react';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();

  const companyStats = [
    { number: '12+', label: 'Years of Excellence' },
    { number: '5,000+', label: 'Happy Travelers' },
    { number: '150+', label: 'Global Destinations' },
    { number: '100%', label: 'Custom Tailored' }
  ];

  const founderInfo = {
    name: 'Niraaj Sharma',
    role: 'Founder & Managing Director',
    experience: '15+ Years in Luxury Hospitality & Global Tourism',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=800',
    quote: 'Travel is not just about visiting a location; it is about creating unforgettable stories. When I founded NIRA Tours & Travels, my promise was simple — zero hidden conditions, authentic local hospitality, and personal care for every traveler.',
    bio: 'Niraaj started his career in international hospitality management across Europe and Asia before establishing NIRA Tours & Travels. His passion for hyper-personalized itineraries and verified local experiences has helped over 5,000 families and groups explore India and the world.'
  };

  const officeLocations = [
    {
      city: 'Mumbai Head Office (HQ)',
      address: 'Suite 402, Apex Business Park, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051',
      phone: '+91 98765 43210',
      email: 'info@niratravels.com',
      hours: 'Mon - Sat: 9:30 AM - 7:30 PM'
    },
    {
      city: 'New Delhi Branch Office',
      address: 'Level 2, Connaught Place Plaza, Inner Circle, New Delhi - 110001',
      phone: '+91 98765 43211',
      email: 'delhi@niratravels.com',
      hours: 'Mon - Sat: 9:30 AM - 7:00 PM'
    },
    {
      city: 'Kochi (South India Desk)',
      address: 'MG Road Commercial Center, Marine Drive, Kochi, Kerala - 682031',
      phone: '+91 98765 43212',
      email: 'kerala@niratravels.com',
      hours: 'Mon - Sat: 9:00 AM - 6:30 PM'
    }
  ];

  const corePillars = [
    {
      icon: '🏛️',
      title: 'Registered & Government Authorized',
      desc: 'Fully licensed & accredited tour operator adhering to standard tourism guidelines and guest safety norms.'
    },
    {
      icon: '✨',
      title: 'Bespoke Private Itineraries',
      desc: 'Customized luxury and budget-conscious itineraries built strictly around your personal choices and pacing.'
    },
    {
      icon: '👨‍✈️',
      title: 'Certified Local Guides & Drivers',
      desc: 'Hand-picked private drivers, licensed safari naturalists, and multi-lingual local guides.'
    },
    {
      icon: '🛡️',
      title: '24/7 On-Trip Assistance',
      desc: 'Round-the-clock dedicated phone and WhatsApp support from our senior concierge desk.'
    }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-20 pb-20 text-slate-800 font-sans">
      
      {/* 1. BRAND HERO BANNER */}
      <section className="bg-[#174A3A] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-[#E7A92B]/20 text-[#E7A92B] border border-[#E7A92B]/30 text-xs font-bold tracking-widest uppercase inline-block">
            Corporate Profile & Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            About <span className="italic text-[#E7A92B]">NIRA Tours & Travels</span>
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Delivering bespoke travel experiences, luxury group expeditions, family vacations, and honeymoon escapes with complete transparency and personal care.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#087F8C]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* 2. ABOUT THE COMPANY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Company Overview</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">
                Redefining Travel Hospitality in India & Worldwide
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              NIRA Tours & Travels was established with a singular mission: to eliminate generic, impersonal travel packages and replace them with authentic, human-centric travel design.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Whether you are looking to explore the backwaters of Kerala, snow peaks of Kashmir, royal fortresses of Rajasthan, wildlife safaris in Gujarat, or international escapes to Thailand, Dubai, and Europe — our expert travel managers ensure every detail is pre-verified and flawlessly executed.
            </p>

            {/* COMPANY STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              {companyStats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-xl font-bold text-[#174A3A] block">{stat.number}</span>
                  <span className="text-[11px] text-slate-500 font-medium block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg h-[420px] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=1000"
              alt="NIRA Travel Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#174A3A]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-2.5 py-1 rounded bg-[#E7A92B] text-[#174A3A] text-[10px] font-bold uppercase tracking-wider">
                Trusted Travel Partner
              </span>
              <h3 className="text-xl font-bold">Authorized & Certified Travel Management</h3>
            </div>
          </div>
        </div>

        {/* 3. FOUNDER & LEADERSHIP PROFILE */}
        <div className="bg-[#174A3A] text-white rounded-3xl p-8 sm:p-12 shadow-md space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#E7A92B] uppercase tracking-widest">Leadership & Vision</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Meet Our Founder</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* FOUNDER PHOTO */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-[#E7A92B]/40 shadow-xl bg-slate-800">
                <img
                  src={founderInfo.image}
                  alt={founderInfo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold text-white">{founderInfo.name}</h3>
                  <p className="text-xs text-[#E7A92B] font-medium">{founderInfo.role}</p>
                </div>
              </div>
            </div>

            {/* FOUNDER BIO & MESSAGE */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#E7A92B] text-xs font-semibold inline-block">
                  🎖️ {founderInfo.experience}
                </span>
                <h3 className="text-2xl font-bold text-white">"A Personal Commitment to Every Traveler"</h3>
              </div>

              <blockquote className="p-4 bg-white/10 rounded-2xl border-l-4 border-[#E7A92B] italic text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                "{founderInfo.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                {founderInfo.bio}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
                <div>
                  <span className="font-bold text-white block">Email Direct:</span>
                  <a href="mailto:niraaj@niratravels.com" className="text-[#E7A92B] hover:underline">niraaj@niratravels.com</a>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <span className="font-bold text-white block">Head Office:</span>
                  <span>BKC, Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. COMPANY CORE PILLARS */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Why Travelers Trust Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">Our Guiding Principles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((p, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2.5">
                <span className="text-3xl block">{p.icon}</span>
                <h3 className="font-bold text-base text-[#174A3A]">{p.title}</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. OFFICE LOCATIONS & MAP DETAILS */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Global Network & Offices</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A3A]">Visit Our Offices & Locations</h2>
            <p className="text-xs text-slate-500 font-light">Walk into any of our office locations or get in touch with our regional desks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officeLocations.map((loc, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 rounded bg-teal-50 text-[#087F8C] text-[10px] font-bold uppercase">
                    📍 {idx === 0 ? 'Headquarters' : 'Regional Branch'}
                  </span>
                  <h3 className="font-bold text-lg text-[#174A3A]">{loc.city}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{loc.address}</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span>📞</span>
                    <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-medium hover:text-[#174A3A]">{loc.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span>✉️</span>
                    <a href={`mailto:${loc.email}`} className="font-medium hover:text-[#174A3A]">{loc.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span>🕒</span>
                    <span>{loc.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INTERACTIVE GOOGLE MAP LOCATION EMBED */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-2">
              <div>
                <h4 className="font-bold text-base text-[#174A3A]">Mumbai HQ Location Map</h4>
                <p className="text-[11px] text-slate-500 font-light">Bandra Kurla Complex (BKC), Mumbai, Maharashtra</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-[#E7A92B] border border-amber-200 text-xs font-bold">
                🗺️ Live Office Location
              </span>
            </div>

            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="NIRA Head Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7924765373677!2d72.86608931500331!3d19.066228987094033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e7ef423719%3A0xf63989c92284c67b!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* 6. CALL & PLAN TRIP CTA */}
        <div className="bg-[#0F382C] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold">Have Questions or Planning a Vacation?</h2>
          <p className="text-xs text-slate-200 font-light max-w-md mx-auto">
            Contact our senior travel advisory team or submit your customized trip requirements online.
          </p>
          <div className="flex justify-center flex-wrap gap-3 pt-2">
            <a
              href="tel:+919876543210"
              className="px-6 py-3 rounded-full border border-white/30 text-white font-bold text-xs uppercase hover:bg-white/10 transition-colors"
            >
              📞 Call Concierge: +91 98765 43210
            </a>
            <button
              onClick={() => navigate('/plan-my-trip')}
              className="px-7 py-3 rounded-full bg-[#E7A92B] text-[#174A3A] font-extrabold text-xs uppercase hover:bg-[#d6981e] transition-colors shadow-md"
            >
              Plan My Trip Online →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
