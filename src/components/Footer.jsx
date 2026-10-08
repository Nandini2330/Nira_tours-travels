import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#174A3A] text-slate-200 pt-16 pb-10 border-t border-emerald-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* BRAND COL */}
          <div className="lg:col-span-2 space-y-3">
            <Logo variant="light" />

            <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-sm pt-2">
              Nira Tours & Travels is a premier luxury travel discovery, custom itinerary design, and private concierge platform crafting extraordinary travel memories across India and the globe.
            </p>

            <div className="pt-1 text-xs space-y-1">
              <p className="text-slate-200">Concierge Desk: <a href="tel:+919876543210" className="text-[#E7A92B] font-bold hover:underline">+91 98765 43210</a></p>
              <p className="text-slate-200">Email: <a href="mailto:concierge@niratours.com" className="text-[#E7A92B] font-bold hover:underline">concierge@niratours.com</a></p>
            </div>
          </div>

          {/* EXPLORE INDIA COL */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#E7A92B] uppercase tracking-widest">Explore India</h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li><Link to="/destinations/kashmir" className="hover:text-white transition-colors">Kashmir Valley</Link></li>
              <li><Link to="/destinations/rajasthan" className="hover:text-white transition-colors">Royal Rajasthan</Link></li>
              <li><Link to="/destinations/kerala" className="hover:text-white transition-colors">Kerala Backwaters</Link></li>
              <li><Link to="/destinations/goa" className="hover:text-white transition-colors">Goa Beaches</Link></li>
              <li><Link to="/destinations/ladakh" className="hover:text-white transition-colors">Ladakh Passes</Link></li>
              <li><Link to="/destinations/andaman" className="hover:text-white transition-colors">Andaman Islands</Link></li>
            </ul>
          </div>

          {/* EXPLORE WORLD COL */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Explore World</h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li><Link to="/destinations/bali" className="hover:text-white transition-colors">Bali, Indonesia</Link></li>
              <li><Link to="/destinations/maldives" className="hover:text-white transition-colors">Maldives Overwater</Link></li>
              <li><Link to="/destinations/dubai" className="hover:text-white transition-colors">Dubai & Dunes</Link></li>
              <li><Link to="/destinations/switzerland" className="hover:text-white transition-colors">Swiss Alpine Rail</Link></li>
              <li><Link to="/destinations/japan" className="hover:text-white transition-colors">Japan Traditions</Link></li>
              <li><Link to="/destinations/thailand" className="hover:text-white transition-colors">Thailand Isles</Link></li>
            </ul>
          </div>

          {/* QUICK NAVIGATION COL */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li><Link to="/itineraries" className="hover:text-white transition-colors">Itinerary Builder</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition-colors">Curated Experiences</Link></li>
              <li><Link to="/plan-my-trip" className="hover:text-white transition-colors">Personal Concierge</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-3">
          <p>© {new Date().getFullYear()} Nira Tours & Travels. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Booking Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
