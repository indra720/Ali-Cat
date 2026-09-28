import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Layers, PhoneCall, LayoutDashboard, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useCatalog } from "../context/CatalogContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { auth, company } = useCatalog();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Catalog", path: "/catalog" },
    { name: "Categories", path: "/categories" },
    { name: "Contact & Enquiry", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      {/* Top micro bar for WhatsApp & direct contact */}
      <div className="bg-oranza-50 text-oranza-900 border-b border-oranza-100/60 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-oranza-500 animate-pulse"></span>
            <span className="font-medium text-ink">B2B & Retail Product Showcase</span>
            <span className="text-gray-400">|</span>
            <span className="text-ink-secondary">Direct Manufacturer Inquiries & Quotations</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-secondary">WhatsApp Hotline:</span>
            <a
              href={`https://wa.me/${company.defaultWhatsApp}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-oranza-600 hover:text-oranza-700 flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-oranza-600 to-oranza-400 flex items-center justify-center text-white shadow-glow-orange transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-ink font-sans">ORANZA</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-oranza-100 text-oranza-800">
                  CATALOG
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary tracking-wide -mt-1 hidden sm:block">
                Digital Showcase & Direct WhatsApp
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-oranza-600 bg-oranza-50 font-semibold"
                    : "text-ink-secondary hover:text-ink hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/catalog"
              className="px-4 py-2 text-sm font-medium text-ink-secondary hover:text-oranza-600 border border-gray-200 rounded-brand hover:border-oranza-300 transition-colors"
            >
              Browse Products
            </Link>

            {auth.isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-white bg-oranza-500 hover:bg-oranza-600 rounded-brand shadow-sm flex items-center gap-1.5 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Seller Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-oranza-500 hover:bg-oranza-600 rounded-brand shadow-sm flex items-center gap-1.5 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Seller Portal</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-ink hover:bg-oranza-50 hover:text-oranza-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 border border-gray-300 rounded-brand text-sm font-semibold text-ink"
            >
              Explore Full Catalog
            </Link>
            <Link
              to={auth.isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-oranza-500 hover:bg-oranza-600 text-white rounded-brand text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              {auth.isLoggedIn ? "Seller Dashboard" : "Seller Portal Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
