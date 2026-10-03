import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, PhoneCall, Mail, MapPin, ExternalLink, ShieldCheck, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useCatalog } from "../context/CatalogContext";

export default function Footer() {
  const { company, categories } = useCatalog();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-oranza-500 flex items-center justify-center text-white shadow-glow-orange">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-sans">ORANZA</span>
                <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-oranza-900/60 text-oranza-400 border border-oranza-700/50">
                  CATALOG
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              A high-impact digital product catalog designed for frictionless product discovery, detailed video walkthroughs, comprehensive technical specifications, and instant WhatsApp inquiry directly with our sales team.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${company.defaultWhatsApp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-brand bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-semibold border border-[#25D366]/30"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp: {company.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Browse Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-gray-400 hover:text-oranza-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-500 group-hover:text-oranza-300">
                      ({cat.productCount || 0})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog Highlights */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Catalog Features
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oranza-500"></span>
                <span>Rich Multi-angle Gallery</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oranza-500"></span>
                <span>Product Video Demonstrations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oranza-500"></span>
                <span>Full Technical Specifications</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oranza-500"></span>
                <span>Direct WhatsApp Lead Link</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oranza-500"></span>
                <span>No Cart / Checkout Barrier</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-oranza-500 shrink-0 mt-0.5" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-oranza-500 shrink-0" />
                <span>{company.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-oranza-500 shrink-0" />
                <span>{company.email}</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-oranza-400 hover:text-oranza-300 font-medium"
                >
                  <span>Company Staff Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved. Digital Product Catalog.</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              Direct-to-Seller Communication
            </span>
            <Link to="/catalog" className="hover:text-gray-300 transition-colors">
              Full Catalog Index
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
