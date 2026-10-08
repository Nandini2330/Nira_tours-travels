import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { tripRequestsAPI, itinerariesAPI } from '../../services/api';
import { useTravel } from '../../context/TravelContext';

export const AdminItineraryBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useTravel();
  const targetRequestId = searchParams.get('requestId');

  const [requests, setRequests] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState(targetRequestId || '');
  const [title, setTitle] = useState('6-Day Signature Custom Expedition');
  const [days, setDays] = useState([
    { day: 1, title: 'Arrival & Welcome Reception', morning: 'Private Chauffeur pick up at airport.', afternoon: 'Hotel check-in & leisure relaxation.', evening: 'Welcome orientation dinner.' },
    { day: 2, title: 'Guided Heritage & Highlights Tour', morning: 'Morning guided tour of famous landmarks.', afternoon: 'Farm-to-table lunch & artisan market.', evening: 'Sunset cruise / cultural performance.' }
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const reqs = await tripRequestsAPI.getAll();
        setRequests(reqs);
        if (targetRequestId) {
          const existing = await itinerariesAPI.getByRequestId(targetRequestId);
          if (existing) {
            setTitle(existing.title || '');
            if (existing.days) setDays(existing.days);
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

  const handleAddDay = () => {
    setDays([
      ...days,
      { day: days.length + 1, title: `Day ${days.length + 1} Excursions`, morning: '', afternoon: '', evening: '' }
    ]);
  };

  const handleDayChange = (index, field, value) => {
    const updated = days.map((d, i) => i === index ? { ...d, [field]: value } : d);
    setDays(updated);
  };

  const handleSaveItinerary = async (e) => {
    e.preventDefault();
    if (!selectedReqId) {
      showToast('Please select a trip request.', 'error');
      return;
    }
    setSaving(true);
    try {
      const targetReq = requests.find(r => r.id === selectedReqId);
      await itinerariesAPI.createOrUpdate({
        tripRequestId: selectedReqId,
        title,
        destination: targetReq?.destination || 'Custom',
        days
      });
      showToast('Day-by-day itinerary published!', 'success');
      navigate(`/admin/requests/${selectedReqId}`);
    } catch (err) {
      showToast('Error saving itinerary', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-xs font-bold text-[#174A3A]">Loading Itinerary Builder...</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#087F8C] uppercase">
            CURATION STUDIO
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#174A3A]">Day-by-Day Itinerary Builder</h1>
        </div>
        {selectedReqId && (
          <Link to={`/admin/requests/${selectedReqId}`} className="text-xs font-bold text-[#087F8C] hover:underline">
            ← View Request Details
          </Link>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase block">Target Customer Trip Request</label>
        <select
          value={selectedReqId}
          onChange={(e) => setSelectedReqId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-[#174A3A]"
        >
          {requests.map(r => (
            <option key={r.id} value={r.id}>
              {r.requestNumber} — {r.customerName} ({r.destination}, {r.startDate})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSaveItinerary} className="space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase block">Itinerary Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-[#174A3A]"
            />
          </div>
        </div>

        {/* DAYS BUILDER */}
        <div className="space-y-4">
          {days.map((d, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#174A3A] text-[#E7A92B] font-bold text-xs flex items-center justify-center">
                  D{d.day}
                </span>
                <input
                  type="text"
                  required
                  placeholder={`Day ${d.day} Heading`}
                  value={d.title}
                  onChange={(e) => handleDayChange(idx, 'title', e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-[#174A3A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[#E7A92B] block uppercase text-[10px]">Morning Activity</span>
                  <textarea
                    rows={2}
                    value={d.morning}
                    onChange={(e) => handleDayChange(idx, 'morning', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[#087F8C] block uppercase text-[10px]">Afternoon Activity</span>
                  <textarea
                    rows={2}
                    value={d.afternoon}
                    onChange={(e) => handleDayChange(idx, 'afternoon', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-indigo-700 block uppercase text-[10px]">Evening Activity</span>
                  <textarea
                    rows={2}
                    value={d.evening}
                    onChange={(e) => handleDayChange(idx, 'evening', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddDay}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
          >
            + Add Another Day
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            {saving ? 'Saving...' : 'Publish Itinerary →'}
          </button>
        </div>
      </form>

    </div>
  );
};
