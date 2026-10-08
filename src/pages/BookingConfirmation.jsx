import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings } = useTravel();

  const booking = bookings.find(b => b.id === id) || bookings[0] || {
    id: id || 'OMJ-882194',
    tripTitle: 'Kashmir Regal Expedition',
    destination: 'Kashmir, India',
    name: 'Valued Guest',
    phone: '+91 98765 43210',
    totalAmount: 49998,
    travelers: 2,
    createdAt: new Date().toISOString()
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-2xl text-center space-y-8 animate-fadeIn">
          
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Booking Request Submitted</span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-slate-900">
              Your Journey is Being Curated!
            </h1>
            <p className="text-slate-600 text-xs font-light">
              Booking Reference Code: <strong className="font-mono bg-amber-100 text-slate-900 px-3 py-1 rounded text-sm">{booking.id}</strong>
            </p>
          </div>

          {/* BREAKDOWN CARD */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 text-xs text-slate-700 max-w-lg mx-auto">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Trip / Package:</span>
              <span className="font-bold text-slate-900">{booking.tripTitle || booking.destination}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Lead Guest:</span>
              <span className="font-semibold text-slate-900">{booking.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Contact Number:</span>
              <span className="font-semibold text-slate-900">{booking.phone}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-sm text-slate-900">
              <span>Estimated Investment:</span>
              <span className="text-amber-600">₹{(booking.totalAmount || 25000).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500">
            <p>Our senior travel concierge will contact you via WhatsApp / Phone to confirm dates, resort selection & payment details.</p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase hover:bg-slate-100"
            >
              🖨️ Print Confirmation Slip
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase hover:bg-sunset transition-colors"
            >
              Back to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
