import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripRequestsAPI, quotationsAPI, itinerariesAPI } from '../../services/api';
import { useTravel } from '../../context/TravelContext';
import { getStatusBadgeStyle } from '../CustomerDashboard';

export const AdminRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, showToast } = useTravel();

  const [request, setRequest] = useState(null);
  const [quotation, setQuotation] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Status & Note Edit State
  const [status, setStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadDetails = async () => {
    try {
      const req = await tripRequestsAPI.getById(id);
      if (req) {
        setRequest(req);
        setStatus(req.status);
        setAdminNotes(req.adminNotes || '');
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

  if (loading) return <div className="text-xs font-bold text-[#174A3A]">Loading Request Details...</div>;
  if (!request) return <div className="text-xs font-bold text-rose-600">Request Not Found</div>;

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await tripRequestsAPI.updateStatus(request.id, status, statusNote, currentUser?.name || 'Admin');
      await tripRequestsAPI.updateNotes(request.id, adminNotes);
      showToast(`Status updated to "${status}" successfully!`, 'success');
      setStatusNote('');
      await loadDetails();
    } catch (err) {
      showToast('Error updating status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const statuses = ['New', 'Under Review', 'Contacted', 'Planning', 'Quote Sent', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-8">
      
      {/* BREADCRUMB */}
      <div className="flex items-center justify-between">
        <Link to="/admin/requests" className="text-xs font-bold text-[#087F8C] hover:underline">
          ← Back to All Requests
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Request #{request.requestNumber}</span>
      </div>

      {/* HEADER SUMMARY CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[#174A3A] text-xs font-extrabold uppercase font-mono">
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
              Submitted on {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>

          {/* CUSTOMER DIRECT CONTACT ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${request.customerEmail}?subject=Nira Tours & Travels Trip Request ${request.requestNumber}`}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              ✉️ Email Customer
            </a>
            <a
              href={`tel:${request.customerPhone}`}
              className="px-4 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#06646f] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              📞 Call Customer
            </a>
          </div>
        </div>

        {/* CUSTOMER & TRIP DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block">Customer Information</span>
            <p><strong>Name:</strong> {request.customerName}</p>
            <p><strong>Email:</strong> {request.customerEmail}</p>
            <p><strong>Phone:</strong> {request.customerPhone}</p>
            <p><strong>Account User ID:</strong> {request.userId}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block">Trip Requirements</span>
            <p><strong>Travel Dates:</strong> {request.startDate} {request.endDate ? `to ${request.endDate}` : ''}</p>
            <p><strong>Group:</strong> {request.adults} Adults, {request.children} Children, {request.infants} Infants</p>
            <p><strong>Style:</strong> {request.travelStyle}</p>
            <p><strong>Budget Range:</strong> {request.budget}</p>
          </div>

        </div>

        {request.specialRequirements && (
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-[#174A3A] block uppercase text-[10px]">Customer Special Requirements:</span>
            <p className="text-slate-700 italic">"{request.specialRequirements}"</p>
          </div>
        )}
      </div>

      {/* STATUS UPDATER & INTERNAL ADMIN NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* STATUS UPDATE FORM */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-sans text-base font-bold text-[#174A3A]">Update Trip Status</h3>
          <form onSubmit={handleStatusUpdate} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block text-[10px]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-[#174A3A] focus:outline-none focus:border-[#087F8C]"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase block text-[10px]">Status Change Log Note (Customer Visible Notification)</label>
              <input
                type="text"
                placeholder="e.g. Concierge reached out via WhatsApp. Awaiting sea plane voucher."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-[#174A3A]"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full py-3 rounded-xl bg-[#174A3A] hover:bg-[#087F8C] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              {updating ? 'Updating Status...' : 'Save & Publish Status Update'}
            </button>
          </form>
        </div>

        {/* INTERNAL ADMIN NOTES (HIDDEN FROM CUSTOMER) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-sans text-base font-bold text-[#174A3A]">Internal Admin Notes</h3>
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-extrabold text-[10px] uppercase">
              🔒 Admin Only
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <textarea
              rows={4}
              placeholder="Enter internal concierge notes, preferred hotel properties, vendor contact details... (Never visible to customer)"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#087F8C]"
            />
            <button
              onClick={handleStatusUpdate}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
            >
              Save Internal Note
            </button>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS FOR QUOTATION & ITINERARY */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-sans text-lg font-bold text-[#174A3A]">Quotation & Itinerary Builder</h3>
          <p className="text-xs text-slate-500">Prepare official itemized pricing and day-by-day itineraries for this customer.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/admin/itineraries?requestId=${request.id}`}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            🗺️ {itinerary ? 'Edit Itinerary' : 'Create Day-by-Day Itinerary'}
          </Link>
          <Link
            to={`/admin/quotations?requestId=${request.id}`}
            className="px-5 py-2.5 rounded-xl bg-[#E7A92B] hover:bg-[#d6981e] text-[#174A3A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            💰 {quotation ? `Edit Quotation (₹${quotation.totalAmount.toLocaleString('en-IN')})` : 'Create Official Quotation'}
          </Link>
        </div>
      </div>

    </div>
  );
};
