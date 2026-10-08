import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { tripRequestsAPI, quotationsAPI } from '../../services/api';
import { useTravel } from '../../context/TravelContext';

export const AdminQuotationBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useTravel();
  const targetRequestId = searchParams.get('requestId');

  const [requests, setRequests] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState(targetRequestId || '');
  const [quoteData, setQuoteData] = useState({
    accommodation: 85000,
    transport: 25000,
    activities: 18000,
    meals: 12000,
    taxes: 8000,
    discount: 5000,
    notes: 'Includes luxury resort accommodations, private chauffeur transfers, daily breakfast & dinner, and fast-track activity passes.'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const reqs = await tripRequestsAPI.getAll();
        setRequests(reqs);
        if (targetRequestId) {
          const existing = await quotationsAPI.getByRequestId(targetRequestId);
          if (existing) {
            setQuoteData({
              accommodation: existing.accommodation || 0,
              transport: existing.transport || 0,
              activities: existing.activities || 0,
              meals: existing.meals || 0,
              taxes: existing.taxes || 0,
              discount: existing.discount || 0,
              notes: existing.notes || ''
            });
          }
        } else if (reqs.length > 0) {
          setSelectedReqId(reqs[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [targetRequestId]);

  const subtotal = (quoteData.accommodation || 0) + (quoteData.transport || 0) + (quoteData.activities || 0) + (quoteData.meals || 0) + (quoteData.taxes || 0);
  const finalTotal = Math.max(0, subtotal - (quoteData.discount || 0));

  const handleSaveQuotation = async (e) => {
    e.preventDefault();
    if (!selectedReqId) {
      showToast('Please select a trip request.', 'error');
      return;
    }
    setSaving(true);
    try {
      await quotationsAPI.createOrUpdate({
        tripRequestId: selectedReqId,
        ...quoteData
      });
      showToast('Quotation created & published to customer dashboard!', 'success');
      navigate(`/admin/requests/${selectedReqId}`);
    } catch (err) {
      showToast('Failed to save quotation.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-xs font-bold text-[#174A3A]">Loading Quotation Builder...</div>;

  const currentReq = requests.find(r => r.id === selectedReqId);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            COMMERCIAL DESK
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Official Quotation Builder</h1>
        </div>
        {selectedReqId && (
          <Link to={`/admin/requests/${selectedReqId}`} className="text-xs font-bold text-[#087F8C] hover:underline">
            ← View Request Details
          </Link>
        )}
      </div>

      {/* SELECT TRIP REQUEST */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase block">Select Target Customer Trip Request</label>
        <select
          value={selectedReqId}
          onChange={(e) => setSelectedReqId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
        >
          {requests.map(r => (
            <option key={r.id} value={r.id}>
              {r.requestNumber} — {r.customerName} ({r.destination}, {r.startDate})
            </option>
          ))}
        </select>

        {currentReq && (
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-1">
            <p><strong>Customer:</strong> {currentReq.customerName} ({currentReq.customerEmail})</p>
            <p><strong>Target Budget:</strong> {currentReq.budget} • <strong>Style:</strong> {currentReq.travelStyle}</p>
          </div>
        )}
      </div>

      {/* QUOTATION FORM CARD */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
        <form onSubmit={handleSaveQuotation} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block">1. Accommodation Charges (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.accommodation}
                onChange={(e) => setQuoteData({ ...quoteData, accommodation: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-[#174A3A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block">2. Transport & Private Chauffeur (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.transport}
                onChange={(e) => setQuoteData({ ...quoteData, transport: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-[#174A3A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block">3. Excursions & Activity Passes (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.activities}
                onChange={(e) => setQuoteData({ ...quoteData, activities: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-[#174A3A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block">4. Curated Dining & Meals (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.meals}
                onChange={(e) => setQuoteData({ ...quoteData, meals: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-[#174A3A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block">5. Taxes & Service Charges (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.taxes}
                onChange={(e) => setQuoteData({ ...quoteData, taxes: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-emerald-700 uppercase block">6. Special Concierge Discount (INR)</label>
              <input
                type="number"
                min="0"
                value={quoteData.discount}
                onChange={(e) => setQuoteData({ ...quoteData, discount: parseFloat(e.target.value) || 0 })}
                className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2.5 font-bold text-emerald-800"
              />
            </div>

          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700 uppercase block">Inclusions & Concierge Notes (Customer Visible)</label>
            <textarea
              rows={3}
              value={quoteData.notes}
              onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs font-medium text-[#174A3A]"
            />
          </div>

          {/* CALCULATED TOTAL SUMMARY */}
          <div className="bg-[#174A3A] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-emerald-200 block">Subtotal: ₹{subtotal.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-200 block">Discount: - ₹{(quoteData.discount || 0).toLocaleString('en-IN')}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#E7A92B] tracking-wider block">FINAL QUOTATION TOTAL</span>
              <span className="font-sans text-3xl font-extrabold text-white">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-[#E7A92B] hover:bg-[#d6981e] text-[#174A3A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            {saving ? 'Publishing Quotation...' : 'Save & Send Quotation to Customer →'}
          </button>

        </form>
      </div>

    </div>
  );
};
