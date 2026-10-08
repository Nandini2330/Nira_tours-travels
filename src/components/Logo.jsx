import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '', showSubtitle = true, size = 'medium' }) => {
  const isLight = variant === 'light';

  // Size presets
  const iconSizes = {
    small: 'w-8 h-8',
    medium: 'w-11 h-11',
    large: 'w-16 h-16'
  };

  const titleSizes = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* NIRA GLOBE + SWOOSH + AIRPLANE EMBLEM */}
      <div className={`relative ${iconSizes[size] || iconSizes.medium} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
          <defs>
            {/* Globe Gradient */}
            <linearGradient id="niraGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1295A6" />
              <stop offset="60%" stopColor="#0B4F55" />
              <stop offset="100%" stopColor="#08383B" />
            </linearGradient>

            {/* Gold Swoosh Gradient */}
            <linearGradient id="niraGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2A228" />
              <stop offset="50%" stopColor="#F5C767" />
              <stop offset="100%" stopColor="#C88A19" />
            </linearGradient>

            {/* Wave Gradient */}
            <linearGradient id="niraWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B4F55" />
              <stop offset="100%" stopColor="#18A5B7" />
            </linearGradient>
          </defs>

          {/* Main Globe Base */}
          <circle cx="95" cy="100" r="62" fill="url(#niraGlobeGrad)" />

          {/* Map Grid / Lat-Long curves */}
          <path d="M 40 100 Q 95 65 150 100 Q 95 135 40 100 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <path d="M 95 38 A 62 62 0 0 1 95 162 A 62 62 0 0 1 95 38" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Silhouettes inside globe (Eiffel tower, Taj Mahal, Palm trees) */}
          {/* Eiffel Tower Silhouette */}
          <path d="M 66 125 L 71 100 L 76 125 M 68 115 L 74 115" stroke="rgba(255,255,255,0.75)" strokeWidth="2" fill="none" />
          {/* Taj Mahal Silhouette */}
          <path d="M 85 125 L 85 110 Q 90 102 95 110 L 95 125 M 90 104 Q 90 100 90 97 M 82 125 L 82 114 M 98 125 L 98 114" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="none" />
          {/* Palm trees */}
          <path d="M 52 126 C 50 118 48 112 45 106 M 45 106 C 40 104 36 106 34 109 M 45 106 C 44 100 40 98 38 98 M 45 106 C 48 101 53 100 55 102" stroke="rgba(255,255,255,0.85)" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Bottom Teal Wave */}
          <path d="M 33 130 C 65 165 130 165 162 125 C 130 148 70 148 33 130 Z" fill="url(#niraWaveGrad)" />

          {/* Orbital Gold Swoosh Ribbon around Globe */}
          <path d="M 22 122 C 18 75 70 28 152 42 C 162 44 140 65 90 60 C 50 56 32 90 46 128 C 50 138 28 142 22 122 Z" fill="url(#niraGoldGrad)" />

          {/* Flying Airplane at end of Swoosh */}
          <g transform="translate(154, 40) rotate(-35) scale(0.95)">
            <path d="M 0 0 L 22 -6 L 16 2 L 28 6 L 12 8 L 8 16 L 4 9 L -6 7 Z" fill={isLight ? '#F5C767' : '#0B4F55'} stroke="#E2A228" strokeWidth="1.2" />
          </g>
        </svg>
      </div>

      {/* NIRA BRAND WORDMARK */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <span className={`font-serif font-black tracking-tight leading-none ${titleSizes[size] || titleSizes.medium} ${isLight ? 'text-white' : 'text-[#0B4F55]'
            }`}>
            NIRA
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`h-[1.5px] w-3 ${isLight ? 'bg-[#F5C767]' : 'bg-[#C88A19]'}`}></span>
            <span className={`text-[9.5px] tracking-[0.22em] font-extrabold uppercase leading-none ${isLight ? 'text-slate-200' : 'text-[#0B4F55]'
              }`}>
              TOURS & TRAVELS
            </span>
            <span className={`h-[1.5px] w-3 ${isLight ? 'bg-[#F5C767]' : 'bg-[#C88A19]'}`}></span>
          </div>
        )}
      </div>
    </Link>
  );
};

