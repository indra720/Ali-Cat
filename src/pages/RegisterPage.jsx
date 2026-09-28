import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Lock, 
  Mail, 
  Building, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
import { useCatalog } from "../context/CatalogContext";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useCatalog();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="pt-1 sm:pt-2 pb-8 sm:pb-10 bg-surface-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Brand Showcase (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-oranza-600 via-oranza-500 to-amber-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-2xl tracking-tight text-white font-sans">ORANZA</span>
                  <span className="text-[10px] ml-1.5 uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/30">
                    JOIN
                  </span>
                </div>
              </Link>

              <div>
                <h3 className="text-xl font-extrabold leading-tight">
                  Launch Your Digital Catalog in Minutes
                </h3>
                <p className="text-xs text-white/85 mt-2 leading-relaxed">
                  Join hundreds of furniture, lighting, and lifestyle manufacturers presenting products professionally without cart or payment gateway friction.
                </p>
              </div>

              {/* What You Get */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Instant public catalog webpage for your brand</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon className="w-3 h-3 text-white" />
                  </div>
                  <span>Receive high-intent buyer inquiries straight to WhatsApp</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span>Dynamic technical specifications & video embeds</span>
                </div>
              </div>
            </div>

            {/* Bottom Trust Tag */}
            <div className="pt-6 relative z-10 border-t border-white/20 flex items-center gap-2 text-[11px] text-white/90">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Zero setup fees • 100% transparent leads</span>
            </div>
          </div>

          {/* Right Column: Register Form (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-oranza-600 uppercase tracking-widest bg-oranza-50 px-2.5 py-1 rounded-md">
                  New Seller
                </span>
                <Link to="/" className="text-xs text-ink-secondary hover:text-oranza-600 transition-colors">
                  ← Back to Catalog
                </Link>
              </div>

              <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                Create Seller Account
              </h2>
              <p className="text-xs text-ink-secondary mt-1">
                Register your business to start adding products and receiving WhatsApp leads.
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Company / Brand Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Royal Living Furnishings"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sales@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Inquiry WhatsApp Number (with Country Code) *
                </label>
                <div className="relative">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="919876543210"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  Customer product queries will be routed directly to this number.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-sm shadow-glow-orange transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Complete Registration & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-ink-secondary pt-2 border-t border-gray-100">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-oranza-600 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
