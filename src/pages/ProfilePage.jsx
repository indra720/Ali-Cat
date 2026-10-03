import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  Lock, 
  ShieldCheck, 
  Check, 
  Save, 
  ArrowLeft, 
  Key, 
  Clock, 
  AlertCircle,
  ExternalLink,
  LogOut,
  Trash2,
  AlertTriangle,
  LayoutDashboard,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  Sliders,
  Globe,
  Building2,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";

export default function ProfilePage() {
  const { 
    auth, 
    logout, 
    updateUserProfile, 
    deleteAccount, 
    products, 
    company, 
    updateStoreSettings 
  } = useCatalog();
  const navigate = useNavigate();

  // If not logged in, redirect to login
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  // Form states - User Profile
  const [fullName, setFullName] = useState(auth.user?.full_name || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [storeName, setStoreName] = useState(auth.user?.store_name || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states - Store Settings (PUT /api/v1/settings)
  const [storeSettingsName, setStoreSettingsName] = useState(company?.name || "");
  const [storeSettingsTagline, setStoreSettingsTagline] = useState(company?.tagline || "");
  const [storeSettingsWhatsApp, setStoreSettingsWhatsApp] = useState(company?.defaultWhatsApp || "");
  const [storeSettingsPhoneDisplay, setStoreSettingsPhoneDisplay] = useState(company?.phoneDisplay || "");
  const [storeSettingsEmail, setStoreSettingsEmail] = useState(company?.email || "");
  const [storeSettingsAddress, setStoreSettingsAddress] = useState(company?.address || "");
  const [storeSettingsInstagram, setStoreSettingsInstagram] = useState(company?.instagram || "");
  const [storeSettingsCountText, setStoreSettingsCountText] = useState(company?.catalogCountText || "");
  const [savingSettings, setSavingSettings] = useState(false);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Sync state if auth.user changes
  useEffect(() => {
    if (auth.user) {
      setFullName(auth.user.full_name || "");
      setEmail(auth.user.email || "");
      setStoreName(auth.user.store_name || "");
      setPhone(auth.user.phone || "");
    }
  }, [auth.user]);

  // Sync state if company settings change
  useEffect(() => {
    if (company) {
      setStoreSettingsName(company.name || "");
      setStoreSettingsTagline(company.tagline || "");
      setStoreSettingsWhatsApp(company.defaultWhatsApp || "");
      setStoreSettingsPhoneDisplay(company.phoneDisplay || "");
      setStoreSettingsEmail(company.email || "");
      setStoreSettingsAddress(company.address || "");
      setStoreSettingsInstagram(company.instagram || "");
      setStoreSettingsCountText(company.catalogCountText || "");
    }
  }, [company]);

  // Profile update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword && newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        full_name: fullName.trim(),
        store_name: storeName.trim(),
        phone: phone.trim()
      };
      if (newPassword.trim()) {
        payload.password = newPassword.trim();
      }

      await updateUserProfile(payload);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Store Settings update handler (PUT /api/v1/settings)
  const handleSaveStoreSettings = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSavingSettings(true);
    try {
      const payload = {
        name: storeSettingsName.trim(),
        tagline: storeSettingsTagline.trim(),
        default_whatsapp: storeSettingsWhatsApp.trim(),
        phone_display: storeSettingsPhoneDisplay.trim(),
        email: storeSettingsEmail.trim(),
        address: storeSettingsAddress.trim(),
        instagram: storeSettingsInstagram.trim(),
        catalog_count_text: storeSettingsCountText.trim()
      };
      await updateStoreSettings(payload);
      setSuccessMsg("Global Store & Catalog Settings updated in database!");
    } catch (err) {
      setErrorMsg(err.message || "Failed to update store settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Account deletion handler
  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      navigate("/register");
    } catch (err) {
      setErrorMsg(err.message || "Failed to delete account.");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!auth.isLoggedIn) {
    return null;
  }

  // Count seller items
  const sellerProductsCount = products.filter(
    (p) => p.sellerId === auth.user?.id || p.whatsappNumber === phone
  ).length;

  return (
    <div className="min-h-screen bg-surface-secondary pt-3 sm:pt-4 pb-12">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink bg-white px-3 py-1.5 rounded-brand border border-gray-200 shadow-sm transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </Link>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-ink-tertiary">Account Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Seller Profile & Account Settings
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-sm shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>JWT Bearer Active</span>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-brand border border-red-200 shadow-sm transition-colors shrink-0 whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2.5 shadow-sm">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 2-Column Responsive Grid (Left: Overview & Actions, Right: Forms) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN: Identity & Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* User Identity Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-oranza-500 via-oranza-600 to-amber-600 flex items-center justify-center text-white shadow-md text-2xl font-black shrink-0">
                  {fullName ? fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-ink truncate">
                      {fullName || "User Profile"}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-oranza-100 text-oranza-800 shrink-0">
                      {auth.user?.role || "Seller"}
                    </span>
                  </div>
                  <p className="text-xs text-ink-secondary truncate mt-0.5">
                    {storeName || "Store Name Not Set"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3 text-xs">
                <div className="flex items-center justify-between text-ink-secondary">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email:</span>
                  </span>
                  <span className="font-semibold text-ink truncate max-w-[180px]">{email}</span>
                </div>
                <div className="flex items-center justify-between text-ink-secondary">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp:</span>
                  </span>
                  <span className="font-semibold text-ink">{phone || "Not Set"}</span>
                </div>
                <div className="flex items-center justify-between text-ink-secondary">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Building className="w-3.5 h-3.5" />
                    <span>Store Brand:</span>
                  </span>
                  <span className="font-semibold text-ink">{storeName || "Individual"}</span>
                </div>
                <div className="flex items-center justify-between text-ink-secondary">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Member Since:</span>
                  </span>
                  <span className="font-semibold text-ink">
                    {auth.user?.created_at ? new Date(auth.user.created_at).toLocaleDateString() : "Active Seller"}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-secondary border border-gray-100 text-[11px] text-ink-secondary flex items-center justify-between">
                <span>Database ID: #{auth.user?.id || 1}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  SQLite Synced
                </span>
              </div>
            </div>

            {/* Quick Navigation Card */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
                Quick Shortcuts
              </h3>
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-oranza-300 hover:bg-oranza-50/50 text-xs font-semibold text-ink transition-all"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-oranza-600" />
                  <span>Go to Seller Dashboard</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-gray-400" />
              </Link>
              <Link
                to="/catalog"
                target="_blank"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-oranza-300 hover:bg-oranza-50/50 text-xs font-semibold text-ink transition-all"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-oranza-600" />
                  <span>View Public Product Catalog</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-gray-400" />
              </Link>
            </div>

            {/* Danger Zone: Delete Account Card */}
            <div className="bg-red-50/60 rounded-3xl p-5 border border-red-200 space-y-3">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Danger Zone (Delete Account API)
                </h3>
              </div>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Permanently delete your user credentials and store catalog from SQLite database. This action cannot be undone.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2.5 px-4 rounded-brand bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account Permanently</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Edit Forms (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Card 1: Personal & Store Details */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-bold text-ink">Account & Store Details</h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Update your display name, business identity, and WhatsApp inquiry number.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                      />
                    </div>
                  </div>

                  {/* Email (Readonly) */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Email Address (Locked ID)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-200 bg-gray-50 text-xs text-gray-500 cursor-not-allowed"
                        title="Primary Email cannot be edited directly"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Primary login ID for JWT session verification.
                    </span>
                  </div>

                  {/* Store Name */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Store / Brand Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="e.g. Dk Marts"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      WhatsApp Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Card 2: Security & Change Password */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-oranza-600" />
                    <span>Security & Password (Optional)</span>
                  </h3>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Leave these fields blank if you want to keep your current password.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        title={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 rounded-brand bg-oranza-500 hover:bg-oranza-600 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Updating SQLite Database..." : "Save Profile Changes"}</span>
                  </button>
                </div>
              </div>

            </form>

            {/* Form Card 3: Global Store & Catalog Settings (PUT /api/v1/settings) */}
            <form onSubmit={handleSaveStoreSettings} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-oranza-500" />
                    <span>Store & Catalog Global Settings</span>
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Live settings served across Navbar hotline, Footer info, and Contact page via SQLite.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                  API: /api/v1/settings
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand / Store Name */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Store / Brand Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={storeSettingsName}
                      onChange={(e) => setStoreSettingsName(e.target.value)}
                      placeholder="e.g. Oranza Living & Lifestyle"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Brand Tagline / Slogan
                  </label>
                  <div className="relative">
                    <Sparkles className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={storeSettingsTagline}
                      onChange={(e) => setStoreSettingsTagline(e.target.value)}
                      placeholder="e.g. Inspiring Spaces with Curated Design"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                </div>

                {/* Default WhatsApp Hotline Number */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    WhatsApp Hotline Number (Numbers Only)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={storeSettingsWhatsApp}
                      onChange={(e) => setStoreSettingsWhatsApp(e.target.value)}
                      placeholder="e.g. 919876543210"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Used for instant WhatsApp chat buttons & links.
                  </span>
                </div>

                {/* Display Phone */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Formatted Phone Display
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={storeSettingsPhoneDisplay}
                      onChange={(e) => setStoreSettingsPhoneDisplay(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Visual format shown on Navbar and Footer.
                  </span>
                </div>

                {/* Support Email */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Official Support Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={storeSettingsEmail}
                      onChange={(e) => setStoreSettingsEmail(e.target.value)}
                      placeholder="e.g. catalog@oranzalifestyle.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                </div>

                {/* Instagram URL */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Instagram / Social Handle URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={storeSettingsInstagram}
                      onChange={(e) => setStoreSettingsInstagram(e.target.value)}
                      placeholder="e.g. https://instagram.com/oranza"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                    />
                  </div>
                </div>

                {/* Catalog Count Text */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Catalog Count Badge Text
                  </label>
                  <input
                    type="text"
                    value={storeSettingsCountText}
                    onChange={(e) => setStoreSettingsCountText(e.target.value)}
                    placeholder="e.g. 500+ Curated Products"
                    className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                  />
                </div>

                {/* Showroom Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Physical Showroom / Office Address
                  </label>
                  <textarea
                    rows={2}
                    value={storeSettingsAddress}
                    onChange={(e) => setStoreSettingsAddress(e.target.value)}
                    placeholder="Plot 42, Design District, Outer Ring Road, Bengaluru, India"
                    className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 focus:ring-2 focus:ring-oranza-500/20"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-8 py-3 rounded-brand bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Updating Settings..." : "Save Store Settings (PUT /api/v1/settings)"}</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>



      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-ink">
                Confirm Account Deletion?
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Aapka account <strong className="text-ink">{email}</strong> SQLite database se permanently delete ho jayega. Saara catalog data aur login access khatam ho jayega.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-brand border border-gray-300 text-xs font-semibold text-ink hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteAccount}
                className="flex-1 py-2.5 rounded-brand bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{deleting ? "Deleting..." : "Yes, Delete Account"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
