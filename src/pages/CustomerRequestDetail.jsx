import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { tripRequestsAPI, quotationsAPI, itinerariesAPI } from '../services/api';
import { getStatusBadgeStyle } from './CustomerDashboard';

export const CustomerRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, showToast } = useTravel();

  const [request, setRequest] = useState(null);
  const [quotation, setQuotation] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDetails = async () => {
    try {
      const req = await tripRequestsAPI.getById(id);
      if (req) {
        setRequest(req);
        const quote = await quotationsAPI.getByRequestId(req.id);
        setQuotation(quote);
        const itin = await itinerariesAPI.getByRequestId(req.id);
        setItinerary(itin);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 text-center">
        <div className="text-sm font-bold text-[#174A3A]">Loading trip request details...</div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-20 text-center space-y-4">
        <h2 className="font-sans text-2xl font-bold text-[#174A3A]">Request Not Found</h2>
        <button onClick={() => navigate('/account')} className="px-6 py-3 rounded-full bg-[#174A3A] text-white text-xs uppercase font-bold">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleApproveQuote = async () => {
    try {
      await tripRequestsAPI.updateStatus(request.id, 'Confirmed', 'Customer approved quotation', currentUser?.name || 'Customer');
      showToast('Trip approved! Our team will contact you for final voucher dispatches.', 'success');
      await loadDetails();
    } catch (e) {
      showToast('Error approving quotation', 'error');
    }
  };

  const handleRequestChanges = async () => {
    try {
      await tripRequestsAPI.updateStatus(request.id, 'Planning', 'Customer requested revisions to itinerary/quotation', currentUser?.name || 'Customer');
      showToast('Revision request sent to concierge team!', 'info');
      await loadDetails();
    } catch (e) {
      showToast('Error requesting changes', 'error');
    }
  };

  const statusSteps = ['New', 'Under Review', 'Contacted', 'Planning', 'Quote Sent', 'Confirmed'];

  return (
    <div className="bg-[#F8F4EC] min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* BREADCRUMB */}
        <div className="flex items-center justify-between">
          <Link to="/account" className="text-xs font-bold text-[#087F8C] hover:underline">
            ← Back to My Dashboard
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Request #{request.requestNumber}</span>
        </div>

        {/* REQUEST HEADER SUMMARY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#174A3A] text-xs font-extrabold uppercase tracking-wider">
                  {request.requestNumber}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs uppercase font-extrabold tracking-wider border ${getStatusBadgeStyle(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <h1 className="font-sans text-3xl font-bold text-[#174A3A] mt-2">
                {request.destination} Expedition
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Submitted on {new Date(request.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Customer Details</span>
              <p className="text-xs font-bold text-[#174A3A]">{request.customerName}</p>
              <p className="text-xs text-slate-500">{request.customerEmail} • {request.customerPhone}</p>
            </div>
          </div>

          {/* TRIP PARAMETERS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Travel Dates</span>
              <p className="font-bold text-[#174A3A]">{request.startDate} {request.endDate ? `to ${request.endDate}` : ''}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Travelers</span>
              <p className="font-bold text-[#174A3A]">{request.adults} Adults {request.children ? `, ${request.children} Children` : ''}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Travel Style</span>
              <p className="font-bold text-[#174A3A]">{request.travelStyle}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Target Budget</span>
              <p className="font-bold text-[#087F8C]">{request.budget}</p>
            </div>
          </div>

          {request.specialRequirements && (
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 text-xs space-y-1">
              <span className="font-bold text-[#174A3A] block uppercase text-[10px] tracking-wider">Special Requirements:</span>
              <p className="text-slate-700 italic">"{request.specialRequirements}"</p>
            </div>
          )}
        </div>

        {/* STATUS PROGRESS TIMELINE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-sans text-sm font-bold text-[#174A3A] uppercase tracking-wider">
            Expedition Progress Timeline
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {statusSteps.map((step, idx) => {
              const isCurrent = request.status === step;
              const isPassed = statusSteps.indexOf(request.status) >= idx;

              return (
                <div
                  key={step}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-[#174A3A] text-white border-[#174A3A] shadow-md font-bold'
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] uppercase block tracking-wider font-extrabold">Step 0{idx + 1}</span>
                  <span className="text-xs">{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUOTATION BREAKDOWN (IF AVAILABLE) */}
        {quotation && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E7A92B]/50 shadow-md space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#E7A92B]/20 text-[#174A3A] text-[10px] font-extrabold uppercase tracking-wider">
                  OFFICIAL QUOTATION
                </span>
                <h3 className="font-sans text-2xl font-bold text-[#174A3A] mt-1">
                  Itemized Investment Breakdown
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold block">Final Total Price</span>
                <span className="font-sans text-3xl font-extrabold text-[#174A3A]">
                  ₹{(quotation.totalAmount || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* QUOTATION TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Service Inclusions</th>
                    <th className="py-2.5 px-3 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {quotation.accommodation > 0 && (
                    <tr>
                      <td className="py-3 px-3 font-semibold">Luxury Accommodations & Stays</td>
                      <td className="py-3 px-3 text-right font-bold">₹{quotation.accommodation.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {quotation.transport > 0 && (
                    <tr>
                      <td className="py-3 px-3 font-semibold">Private Chauffeur & Transfers</td>
                      <td className="py-3 px-3 text-right font-bold">₹{quotation.transport.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {quotation.activities > 0 && (
                    <tr>
                      <td className="py-3 px-3 font-semibold">Excursions & Fast-Track Passes</td>
                      <td className="py-3 px-3 text-right font-bold">₹{quotation.activities.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {quotation.meals > 0 && (
                    <tr>
                      <td className="py-3 px-3 font-semibold">Curated Dining & Houseboat Meals</td>
                      <td className="py-3 px-3 text-right font-bold">₹{quotation.meals.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {quotation.taxes > 0 && (
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-500">Service Charges & Taxes</td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-500">₹{quotation.taxes.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {quotation.discount > 0 && (
                    <tr className="text-emerald-700">
                      <td className="py-3 px-3 font-bold">Special Concierge Discount</td>
                      <td className="py-3 px-3 text-right font-bold">- ₹{quotation.discount.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {quotation.notes && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-[#174A3A] block uppercase text-[10px]">Concierge Note:</span>
                <p>{quotation.notes}</p>
              </div>
            )}

            {/* ACTION BUTTONS */}
            {request.status !== 'Confirmed' && (
              <div className="pt-4 flex flex-wrap justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={handleRequestChanges}
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Request Revisions
                </button>
                <button
                  onClick={handleApproveQuote}
                  className="px-8 py-3 rounded-full bg-[#174A3A] hover:bg-[#087F8C] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Approve Quotation & Book →
                </button>
              </div>
            )}
          </div>
        )}

        {/* DAY BY DAY ITINERARY (IF AVAILABLE) */}
        {itinerary && itinerary.days && itinerary.days.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">DAY-BY-DAY CURATION</span>
              <h3 className="font-sans text-2xl font-bold text-[#174A3A] mt-0.5">
                {itinerary.title || `${request.destination} Custom Itinerary`}
              </h3>
            </div>

            <div className="space-y-4">
              {itinerary.days.map((day) => (
                <div key={day.day} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#174A3A] text-[#E7A92B] font-bold text-xs flex items-center justify-center">
                      D{day.day}
                    </span>
                    <h4 className="font-sans text-base font-bold text-[#174A3A]">{day.title}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    {day.morning && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                        <span className="font-bold text-[#E7A92B] uppercase text-[10px]">🌅 Morning</span>
                        <p className="text-slate-600 leading-relaxed">{day.morning}</p>
                      </div>
                    )}
                    {day.afternoon && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                        <span className="font-bold text-[#087F8C] uppercase text-[10px]">☀️ Afternoon</span>
                        <p className="text-slate-600 leading-relaxed">{day.afternoon}</p>
                      </div>
                    )}
                    {day.evening && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                        <span className="font-bold text-indigo-700 uppercase text-[10px]">🌙 Evening</span>
                        <p className="text-slate-600 leading-relaxed">{day.evening}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
