import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  ChevronRight, 
  HelpCircle,
  Building,
  ShieldCheck
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
import { contactAPI } from "../services/api";

export default function ContactPage() {
  const { company, categories, recordEnquiry } = useCatalog();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await contactAPI.submit(formData);
      recordEnquiry(null);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "General Inquiry",
          message: "",
        });
      }, 5000);
    } catch (err) {
      setSubmitError(err.message || "Failed to submit enquiry. Please try WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };


  const handleWhatsAppSend = () => {
    recordEnquiry(null);
    const cleanPhone = company.defaultWhatsApp.replace(/[^0-9]/g, "");
    const msg = [
      `Hello ${company.name}! 👋`,
      `I am reaching out via your *Contact & Enquiry* page:`,
      ``,
      formData.name ? `👤 *Name:* ${formData.name}` : null,
      formData.phone ? `📱 *Phone:* ${formData.phone}` : null,
      formData.category ? `🏷️ *Interest:* ${formData.category}` : null,
      formData.message ? `💬 *Message:* ${formData.message}` : `I would like to enquire about your product catalog.`,
      ``,
      `Please connect with me with quotation details.`
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-10 sm:py-14">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-secondary mb-6">
          <Link to="/" className="hover:text-oranza-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-ink font-semibold">Contact & Enquiry</span>
        </nav>

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-oranza-600 via-oranza-500 to-amber-600 text-white p-8 sm:p-12 mb-12 shadow-lg overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 tracking-tight">
              Contact & Product Enquiry
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
              Have questions about product dimensions, custom finishes, or bulk B2B quotations? Chat with us directly on WhatsApp or drop us an enquiry below.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Send an Official Enquiry</h2>
              <p className="text-xs text-ink-secondary mt-1">
                Fill in the details below and our catalog sales team will get back to you within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
                <h3 className="text-base font-bold text-green-900">Enquiry Received Successfully!</h3>
                <p className="text-xs text-green-700 max-w-md mx-auto">
                  Thank you for contacting {company.name}. Our representative will reach out to you via WhatsApp or Email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Category of Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500 bg-white"
                    >
                      <option value="General Inquiry">General Catalog Inquiry</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Custom Project / B2B">Custom Order / Architectural B2B</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us which products, dimensions, or custom requirements you are interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="w-full sm:w-auto px-6 py-3 rounded-brand bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Send Directly via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick WhatsApp Action Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ink">Direct WhatsApp Hotline</h3>
                  <p className="text-xs text-gray-600">Fastest response for inquiries & quotes</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${company.defaultWhatsApp}?text=${encodeURIComponent(
                  `Hello ${company.name}! I am browsing your catalog and would like to ask a few questions.`
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordEnquiry(null)}
                className="w-full py-3 rounded-brand bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Chat Now on {company.phoneDisplay}</span>
              </a>
            </div>

            {/* Contact Details List */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-ink pb-2 border-b border-gray-100">
                Showroom & Support Details
              </h3>

              <div className="space-y-4 text-xs text-ink-secondary">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-oranza-50 text-oranza-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Experience Center</strong>
                    <p className="mt-0.5 leading-relaxed">{company.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-oranza-50 text-oranza-600 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Phone Support</strong>
                    <p className="mt-0.5">{company.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-oranza-50 text-oranza-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Official Email</strong>
                    <p className="mt-0.5">{company.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-oranza-50 text-oranza-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Working Hours</strong>
                    <p className="mt-0.5">Monday – Saturday: 9:00 AM – 7:30 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturer Guarantee Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
              <div className="text-xs">
                <strong className="font-bold text-ink block">Direct Manufacturer Pricing</strong>
                <span className="text-ink-secondary">All catalog inquiries receive ex-factory rates without retailer markup.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
