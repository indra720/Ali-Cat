import React from "react";
import { X, QrCode, Download, Printer, ExternalLink } from "lucide-react";

export default function QRCodeModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    currentUrl
  )}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 relative text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="w-12 h-12 rounded-2xl bg-oranza-50 text-oranza-600 flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-ink">Showroom Product QR Code</h3>
        <p className="text-xs text-ink-secondary mt-1">
          Scan with any mobile camera to view HD video, full specs, and WhatsApp inquiry.
        </p>

        {/* QR Code Container */}
        <div className="my-5 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 inline-block shadow-inner">
          <img
            src={qrImageUrl}
            alt={`QR Code for ${product.title}`}
            className="w-48 h-48 mx-auto rounded-lg"
          />
        </div>

        {/* Product Meta */}
        <div className="bg-oranza-50/80 p-3 rounded-xl border border-oranza-100 mb-5 text-left text-xs">
          <p className="font-bold text-ink truncate">{product.title}</p>
          <div className="flex items-center justify-between text-ink-secondary mt-0.5 text-[11px]">
            <span>SKU: {product.sku}</span>
            <span className="font-bold text-oranza-600">
              {product.priceType === "on_request" || !product.price
                ? "RFQ"
                : `${product.currency || "₹"}${Number(product.price).toLocaleString("en-IN")}`}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={qrImageUrl}
            download={`${product.slug}-qr-code.png`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-3 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save QR Image</span>
          </a>

          <button
            onClick={handlePrint}
            className="py-2.5 px-3 rounded-brand border border-gray-300 hover:bg-gray-50 text-ink text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" />
            <span>Print Tag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
