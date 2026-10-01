import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Video, 
  Eye, 
  EyeOff,
  Check,
  ShieldCheck
} from "lucide-react";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
import { useCatalog } from "../context/CatalogContext";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@oranza.com");
  const [password, setPassword] = useState("adminpassword123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useCatalog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res && res.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(res?.error || "Invalid email or password. Please try again.");
    }
  };

  const handleQuickDemoLogin = async () => {
    setErrorMessage("");
    setLoading(true);
    setEmail("admin@oranza.com");
    setPassword("adminpassword123");
    const res = await login("admin@oranza.com", "adminpassword123");
    setLoading(false);
    if (res && res.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(res?.error || "Demo login failed.");
    }
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
                    PORTAL
                  </span>
                </div>
              </Link>

              <div>
                <h3 className="text-xl font-extrabold leading-tight">
                  Seller & Product Catalog Console
                </h3>
                <p className="text-xs text-white/85 mt-2 leading-relaxed">
                  The complete management hub to publish products, showcase video walkthroughs, and receive direct WhatsApp leads.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>High-resolution multi-photo gallery management</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Video className="w-3 h-3 text-white" />
                  </div>
                  <span>Embed HD product demonstration videos</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon className="w-3 h-3 text-white" />
                  </div>
                  <span>Direct 1-click WhatsApp customer enquiry routing</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-white/95">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span>Custom technical specifications key-value sheet</span>
                </div>
              </div>
            </div>

            {/* Bottom Trust Tag */}
            <div className="pt-6 relative z-10 border-t border-white/20 flex items-center gap-2 text-[11px] text-white/90">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Secure verified access for authorized sellers</span>
            </div>
          </div>

          {/* Right Column: Login Form (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-oranza-600 uppercase tracking-widest bg-oranza-50 px-2.5 py-1 rounded-md">
                  Welcome Back
                </span>
                <Link to="/" className="text-xs text-ink-secondary hover:text-oranza-600 transition-colors">
                  ← Back to Catalog
                </Link>
              </div>

              <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                Sign In to Dashboard
              </h2>
              <p className="text-xs text-ink-secondary mt-1">
                Enter your seller credentials to access the catalog management tools.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Company Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                    placeholder="seller@oranzalifestyle.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-ink">
                    Password
                  </label>
                  <span className="text-[11px] text-oranza-600 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 transition-all"
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-oranza-600 rounded border-gray-300 focus:ring-oranza-500"
                  />
                  <span className="text-xs text-ink-secondary">Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-sm shadow-glow-orange transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-brand bg-oranza-50 hover:bg-oranza-100/80 text-oranza-800 font-bold text-xs border border-oranza-200 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-oranza-600" />
                <span>1-Click Instant Demo Login</span>
              </button>
            </div>

            <div className="text-center text-xs text-ink-secondary">
              Don't have a seller account?{" "}
              <Link to="/register" className="font-bold text-oranza-600 hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
