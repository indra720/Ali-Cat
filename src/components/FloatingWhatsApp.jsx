import React, { useState } from "react";
import { X } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useCatalog } from "../context/CatalogContext";

export default function FloatingWhatsApp() {
  const { company, recordEnquiry } = useCatalog();
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleClick = () => {
    recordEnquiry(null);
    const cleanPhone = company.defaultWhatsApp.replace(/[^0-9]/g, "");
    const msg = `Hello ${company.name}! 👋 I am browsing your online catalog and have a quick question.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Speech Prompt Bubble */}
      {!dismissed && (
        <div className="relative bg-white text-ink text-xs font-medium py-2.5 px-4 rounded-2xl shadow-xl border border-gray-200/90 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping shrink-0" />
            <span className="leading-snug">
              Need instant pricing or custom sizes? <strong>Chat with us!</strong>
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Downward triangle pointer */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Direct WhatsApp Consultation"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}
