import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';

export const AdminDestinations = () => {
  const { destinations, showToast } = useTravel();
  const [items, setItems] = useState(destinations);
  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, active: i.active === false ? true : false } : i));
    showToast('Destination status updated!', 'info');
  };

  const filtered = items.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Destinations ({filtered.length})</h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm">
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <div key={d.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-3 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <img src={d.cardImage} alt={d.name} className="w-full h-36 rounded-xl object-cover" />
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#087F8C] uppercase">{d.region} • {d.type}</span>
                  <h3 className="font-sans text-base font-bold text-[#174A3A]">{d.name}</h3>
                </div>
                <span className="text-xs font-bold text-[#E7A92B]">₹{d.startingPrice?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <button
                onClick={() => toggleStatus(d.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  d.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {d.active !== false ? 'Active Catalog' : 'Disabled'}
              </button>
              <span className="text-[10px] font-bold text-slate-400">★ {d.rating} ({d.reviewsCount})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
