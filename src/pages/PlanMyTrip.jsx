import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const PlanMyTrip = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, createTripRequest } = useTravel();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login?redirect=/plan-my-trip');
    }
  }, [currentUser, navigate]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: searchParams.get('destination') || 'Kashmir',
    customDestination: '',
    travelType: searchParams.get('type') || 'india',
    startDate: '2026-11-15',
    endDate: '2026-11-21',
    adults: 2,
    children: 0,
    infants: 0,
    travelStyle: searchParams.get('style') || 'Luxury',
    budget: "₹1,00,000 – ₹2,00,000",
    phone: currentUser?.phone || '',
    specialRequirements: searchParams.get('experience') || searchParams.get('customItinerary') || ''
  });

  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        phone: prev.phone || currentUser.phone || ''
      }));
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleDestinationSelect = (dest) => {
    if (dest === 'custom') {
      setFormData({ ...formData, destination: 'Custom Destination', customDestination: '' });
    } else {
      setFormData({ ...formData, destination: dest, customDestination: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const targetDestination = formData.customDestination.trim() || formData.destination;
      const finalData = {
        ...formData,
        destination: targetDestination
      };

      const newReq = await createTripRequest(finalData);
      setSubmittedRequest(newReq);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const indiaDestinations = ['Kashmir', 'Kerala', 'Goa', 'Rajasthan', 'Ladakh', 'Manali', 'Meghalaya', 'Sikkim', 'Andaman', 'Maharashtra'];
  const intlDestinations = ['Maldives', 'Bali', 'Dubai', 'Thailand', 'Singapore', 'Switzerland', 'Japan', 'Vietnam', 'Australia', 'Turkey'];

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            BESPOKE EXPEDITION DESK
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold text-[#174A3A]">
            Plan Your Journey
          </h1>
          <p className="text-slate-500 text-xs font-medium">
            Specify your dream dates & preferences. Our concierge will prepare a tailored itinerary within 2 hours.
          </p>
        </div>

        {!submittedRequest ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md space-y-8">
            
            {/* STEP PROGRESS BAR */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Step 0{step} of 04</span>
                <span>{step === 1 ? 'Destination & Type' : step === 2 ? 'Travel Details & Group' : step === 3 ? 'Style & Budget' : 'Review & Submit'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#174A3A] h-full transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: DESTINATION */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-sans text-xl font-bold text-[#174A3A]">Where do you want to go?</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Region Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, travelType: 'india', destination: 'Kashmir' })}
                          className={`p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                            formData.travelType === 'india' ? 'border-[#174A3A] bg-[#174A3A] text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          🇮🇳 India Expeditions
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, travelType: 'international', destination: 'Maldives' })}
                          className={`p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                            formData.travelType === 'international' ? 'border-[#174A3A] bg-[#174A3A] text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          🌍 International Luxury
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Select Target Destination</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {(formData.travelType === 'india' ? indiaDestinations : intlDestinations).map((dest) => (
                          <button
                            type="button"
                            key={dest}
                            onClick={() => handleDestinationSelect(dest)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                              formData.destination === dest
                                ? 'border-[#087F8C] bg-[#087F8C] text-white shadow-sm'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Custom Destination (If not listed above)</label>
                      <input
                        type="text"
                        placeholder="e.g. Iceland Aurora Borealis, Serengeti Safari..."
                        value={formData.customDestination}
                        onChange={(e) => setFormData({ ...formData, customDestination: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: TRAVEL DETAILS */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-sans text-xl font-bold text-[#174A3A]">Travel Dates & Group Size</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Departure Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Return Date (Optional)</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#174A3A] font-semibold focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Adults (12+ yrs)</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#174A3A] text-center"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Children (2-11 yrs)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#174A3A] text-center"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Infants (&lt; 2 yrs)</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={formData.infants}
                        onChange={(e) => setFormData({ ...formData, infants: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#174A3A] text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: STYLE & BUDGET */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-sans text-xl font-bold text-[#174A3A]">Travel Style & Target Budget</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Preferred Travel Style</label>
                      <div className="flex flex-wrap gap-2">
                        {['Adventure', 'Luxury', 'Beach', 'Family', 'Honeymoon', 'Nature', 'Culture', 'Weekend', 'Custom'].map((st) => (
                          <button
                            type="button"
                            key={st}
                            onClick={() => setFormData({ ...formData, travelStyle: st })}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                              formData.travelStyle === st
                                ? 'bg-[#174A3A] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Target Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
                      >
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option>
                        <option value="₹2,00,000+">₹2,00,000+</option>
                        <option value="I'll discuss my budget">I'll discuss my budget with concierge</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Special Requirements (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Honeymoon villa, wheelchair assistance, vegetarian meals, private driver..."
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs font-medium text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM CONTACT */}
              {step === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-sans text-xl font-bold text-[#174A3A]">Review & Submit Trip Request</h3>
                  
                  {/* AUTO-POPULATED CONTACT DETAILS */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block">
                      ✓ Pre-filled Account Contact Info
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">CUSTOMER NAME</span>
                        <span className="font-bold text-[#174A3A]">{currentUser.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">EMAIL ADDRESS</span>
                        <span className="font-bold text-[#174A3A]">{currentUser.email}</span>
                      </div>
                      <div>
                        <label className="text-slate-700 font-bold block text-[10px] uppercase">Contact Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-[#174A3A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SUMMARY BOX */}
                  <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-2 text-xs">
                    <span className="font-bold text-[#174A3A] uppercase tracking-wider block text-[11px]">Expedition Summary:</span>
                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <p><strong>Destination:</strong> {formData.customDestination.trim() || formData.destination}</p>
                      <p><strong>Start Date:</strong> {formData.startDate}</p>
                      <p><strong>Group:</strong> {formData.adults} Adults {formData.children ? `, ${formData.children} Kids` : ''}</p>
                      <p><strong>Style:</strong> {formData.travelStyle}</p>
                      <p><strong>Budget:</strong> {formData.budget}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* WIZARD NAVIGATION BUTTONS */}
              <div className="flex justify-between pt-6 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase"
                  >
                    ← Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-3.5 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-extrabold text-xs uppercase tracking-widest transition-colors shadow-lg flex items-center gap-2"
                  >
                    {loading ? 'Submitting...' : 'Send My Trip Request ✨'}
                  </button>
                )}
              </div>

            </form>
          </div>
        ) : (
          /* CONFIRMATION SCREEN */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/90 shadow-lg text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-widest">Journey Started</span>
              <h2 className="font-sans text-3xl font-bold text-[#174A3A]">
                Your Trip Request Has Been Created!
              </h2>
              <p className="text-slate-600 text-xs max-w-md mx-auto">
                Request ID: <span className="font-bold text-[#174A3A] font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200">{submittedRequest.requestNumber}</span>
              </p>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Our travel team will review your requirements and contact you shortly with a bespoke itinerary and official quotation.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => navigate('/account')}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase hover:bg-slate-100"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate(`/account/requests/${submittedRequest.id}`)}
                className="px-8 py-3 rounded-full bg-[#174A3A] text-white font-bold text-xs uppercase hover:bg-[#087F8C]"
              >
                View My Request →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
