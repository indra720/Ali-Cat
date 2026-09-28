import React from "react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { getWhatsAppInquiryUrl, getGeneralWhatsAppUrl } from "../utils/whatsapp";
import { useCatalog } from "../context/CatalogContext";

export default function WhatsAppButton({
  product,
  size = "md",
  className = "",
  label = "Inquire on WhatsApp",
  isGeneral = false,
}) {
  const { recordEnquiry, company } = useCatalog();

  const handleClick = (e) => {
    e.stopPropagation();
    if (product && product.id) {
      recordEnquiry(product.id);
    } else {
      recordEnquiry(null);
    }
  };

  const url = isGeneral
    ? getGeneralWhatsAppUrl(company.defaultWhatsApp, company.name)
    : getWhatsAppInquiryUrl({
        whatsappNumber: product?.whatsappNumber || company.defaultWhatsApp,
        productTitle: product?.title || "Product Inquiry",
        sku: product?.sku,
        price: product?.price,
        currency: product?.currency || "₹",
        productUrl: typeof window !== "undefined" ? window.location.href : "",
        companyName: company.name,
      });

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-medium rounded-brand bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
    >
      <WhatsAppIcon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      <span>{label}</span>
    </a>
  );
}
