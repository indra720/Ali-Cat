/**
 * Generates a direct WhatsApp link with a pre-filled, professional inquiry message.
 *
 * @param {Object} options
 * @param {string} options.whatsappNumber - Phone number with country code (no '+' or spaces)
 * @param {string} options.productTitle - Title of the product
 * @param {string} options.sku - SKU/Model Code
 * @param {number|string} [options.price] - Price value or "Price on Request"
 * @param {string} [options.currency="₹"] - Currency symbol
 * @param {string} [options.productUrl] - URL of the product page
 * @param {string} [options.companyName="Oranza"]
 * @returns {string} - Full WhatsApp URL (e.g., https://wa.me/919876543210?text=...)
 */
export function getWhatsAppInquiryUrl({
  whatsappNumber = "919876543210",
  productTitle,
  sku,
  price,
  currency = "₹",
  productUrl,
  companyName = "Oranza Living"
}) {
  const cleanPhone = String(whatsappNumber).replace(/[^0-9]/g, "");

  let priceText = "Price on Request";
  if (price !== null && price !== undefined && !isNaN(price)) {
    priceText = `${currency}${Number(price).toLocaleString("en-IN")}`;
  }

  const currentUrl = productUrl || (typeof window !== "undefined" ? window.location.href : "");

  const message = [
    `Hello ${companyName}! 👋`,
    `I saw this product on your *Digital Catalog* and I'm interested in more details:`,
    ``,
    `🏷️ *Product:* ${productTitle}`,
    sku ? `🔢 *SKU/Code:* ${sku}` : null,
    `💰 *Price:* ${priceText}`,
    currentUrl ? `🔗 *Link:* ${currentUrl}` : null,
    ``,
    `Could you please share availability, customization options, and delivery timeline?`,
    `Thank you!`
  ]
    .filter(line => line !== null)
    .join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp inquiry link for company support.
 */
export function getGeneralWhatsAppUrl(whatsappNumber = "919876543210", companyName = "Oranza Living") {
  const cleanPhone = String(whatsappNumber).replace(/[^0-9]/g, "");
  const message = `Hello ${companyName}! 👋\nI am browsing your product catalog and would like to ask a few questions.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
