import React, { useState } from 'react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent('Hello NIRA Tours & Travels! I am interested in planning a custom trip. Please share details.');

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* QUICK CHAT CARD POPUP */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn space-y-0">
          {/* HEADER */}
          <div className="bg-[#174A3A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-[#E7A92B] flex items-center justify-center text-[#174A3A] font-bold text-lg shadow-sm">
                💬
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#174A3A]" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-snug">NIRA Travel Concierge</h4>
                <p className="text-[10px] text-emerald-200">Online • Replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white text-lg px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>

          {/* MESSAGE BODY */}
          <div className="p-4 bg-[#FDFBF7] space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-xs text-slate-700 leading-relaxed">
              👋 Namaste! How can we assist you with your travel plans today?
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>💬 Start WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* SMALL COMPACT WHATSAPP ICON BUTTON (MATCHING SECOND IMAGE) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/30"
        title="Chat on WhatsApp"
      >
        {/* WHATSAPP SVG LOGO */}
        <svg
          className="w-8 h-8 fill-current text-white"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.123 4.103 4.266-1.117zm11.516-7.147c-.287-.143-1.698-.838-1.961-.933-.264-.096-.456-.143-.647.143-.192.287-.743.933-.911 1.124-.168.192-.336.216-.623.072-.287-.143-1.215-.447-2.314-1.427-.854-.761-1.431-1.701-1.598-1.988-.168-.287-.018-.442.126-.584.13-.129.287-.336.431-.503.144-.168.192-.287.287-.479.096-.192.048-.36-.024-.503-.072-.143-.647-1.56-.886-2.131-.233-.556-.47-.48-.647-.489l-.551-.01c-.192 0-.503.072-.767.36-.264.287-1.007.984-1.007 2.401 0 1.417 1.031 2.783 1.175 2.975.144.192 2.03 3.1 4.918 4.346.687.297 1.224.474 1.642.607.69.22 1.318.189 1.815.115.554-.083 1.698-.694 1.938-1.363.24-.67.24-1.244.168-1.363-.072-.119-.264-.192-.551-.335z" />
        </svg>
      </button>
    </div>
  );
};
