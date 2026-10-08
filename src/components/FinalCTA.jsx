import React, { useState } from 'react';

export const FinalCTA = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-[#F8F4EC] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ELEGANT LUXURY NEWSLETTER CARD (NOT OVERTEXTED) */}
        <div className="bg-[#174A3A] text-white rounded-3xl p-8 sm:p-12 border-t-2 border-[#E7A92B] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* SUBTLE GLOW ACCENTS */}
          <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#087F8C]/20 blur-3xl pointer-events-none" />
          
          {/* ELEGANT TITLE */}
          <div className="relative z-10 space-y-1.5 text-center md:text-left max-w-md">
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#E7A92B] uppercase">
              THE PRIVATE DISPATCH
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
              Get secret itineraries & private villa drops.
            </h2>
          </div>

          {/* LUXURY INTEGRATED INPUT FORM */}
          <div className="relative z-10 w-full md:w-auto min-w-[280px] sm:min-w-[360px]">
            {subscribed ? (
              <div className="bg-[#E7A92B]/20 border border-[#E7A92B]/40 rounded-2xl py-3.5 px-6 text-center text-[#E7A92B] font-bold text-xs animate-fadeIn">
                ✓ Welcome to the private dispatch list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-inner">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-300 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#E7A92B] hover:bg-[#d49922] text-[#174A3A] font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md whitespace-nowrap flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
