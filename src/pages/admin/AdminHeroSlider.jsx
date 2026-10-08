import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';

export const AdminHeroSlider = () => {
  const { heroSlides, updateHeroSlides } = useTravel();
  const [slides, setSlides] = useState(heroSlides);

  const handleSlideChange = (index, field, value) => {
    const updated = slides.map((s, i) => i === index ? { ...s, [field]: value } : s);
    setSlides(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateHeroSlides(slides);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            HOMEPAGE BANNER SUITE
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Hero Slider Management</h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {slides.map((s, idx) => (
          <div key={s.id || idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-bold text-[#174A3A] text-sm">Slide 0{idx + 1} ({s.destination})</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.active !== false}
                  onChange={(e) => handleSlideChange(idx, 'active', e.target.checked)}
                  className="rounded text-[#174A3A]"
                />
                <span className="text-xs font-bold text-slate-700">Active Slide</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase block">Destination Name</label>
                <input
                  type="text"
                  value={s.destination}
                  onChange={(e) => handleSlideChange(idx, 'destination', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-bold text-[#174A3A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase block">Category Tag</label>
                <input
                  type="text"
                  value={s.category}
                  onChange={(e) => handleSlideChange(idx, 'category', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-bold text-[#174A3A]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase block">Main Heading</label>
                <input
                  type="text"
                  value={s.heading}
                  onChange={(e) => handleSlideChange(idx, 'heading', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-bold text-[#174A3A]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase block">Subtitle Description</label>
                <input
                  type="text"
                  value={s.subtitle}
                  onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase block">Background Image URL</label>
                <input
                  type="text"
                  value={s.image}
                  onChange={(e) => handleSlideChange(idx, 'image', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
        >
          Save & Publish Hero Slides
        </button>
      </form>
    </div>
  );
};
