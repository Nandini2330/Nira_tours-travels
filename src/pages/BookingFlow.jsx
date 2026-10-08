import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const BookingFlow = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { packages, createBooking } = useTravel();

  const pkg = packages.find(p => p.id === tripId) || packages[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 2,
    travelDate: '2026-11-20',
    specialRequests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in required contact details.');
      return;
    }

    const newBooking = createBooking({
      ...formData,
      tripTitle: pkg.title,
      destination: pkg.destinationName,
      pricePerPerson: pkg.price,
      totalAmount: pkg.price * formData.travelers
    });

    navigate(`/booking/confirmation/${newBooking.id}`);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] text-sunset uppercase">Reservation Desk</span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-slate-900">
            Request Booking
          </h1>
          <p className="text-slate-600 text-xs font-light">
            You are requesting a booking for: <strong className="text-slate-900">{pkg.title}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SUMMARY SIDEBAR */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-xl border border-white/10 h-fit">
            <img src={pkg.image} alt={pkg.title} className="w-full h-40 rounded-2xl object-cover" />
            <h3 className="font-editorial text-xl font-bold text-amber-300">{pkg.title}</h3>
            <p className="text-xs text-slate-400">⏱️ {pkg.duration} • 📍 {pkg.destinationName}</p>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Price per guest:</span>
                <span className="font-bold text-amber-400">₹{pkg.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-bold">{formData.travelers} Persons</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                <span>Estimated Total:</span>
                <span className="text-amber-400">₹{(pkg.price * formData.travelers).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-editorial text-2xl font-bold text-slate-900">Traveler Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Lead Traveler Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Number of Passengers</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Preferred Start Date</label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Special Preferences / Add-ons</label>
                  <textarea
                    rows={3}
                    placeholder="Dietary requirements, honeymoon setup, room preferences..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-sunset to-rose-500 text-slate-950 font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
              >
                Submit Booking Request →
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
