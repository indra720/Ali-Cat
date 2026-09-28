import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Video, 
  Layers, 
  ShieldCheck, 
  PhoneCall, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";

export default function HomePage() {
  const { products, categories, company } = useCatalog();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-ambient-light pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-oranza-100/50">
        {/* Decorative blur rings */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-oranza-200/40 rounded-full blur-3xl pointer-events-none -mr-20"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-oranza-100/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto space-y-4 sm:space-y-5">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-oranza-200 shadow-sm text-xs font-semibold text-oranza-700 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-oranza-500" />
              <span>Digital Catalog & Direct WhatsApp Lead System</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-ink tracking-tight leading-tight max-w-5xl mx-auto">
              Discover Premium Products with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oranza-500 via-oranza-600 to-amber-600">
                Detailed Specs & Video
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-ink-secondary leading-relaxed max-w-4xl mx-auto">
              Browse our complete catalog without cart friction or checkout obstacles. Inspect 360° photos, watch high-definition video walkthroughs, and initiate direct conversations via WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                to="/catalog"
                className="w-full sm:w-auto px-8 py-3 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-sm shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <WhatsAppButton
                size="md"
                label="Chat with Sales Team"
                isGeneral={true}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold"
              />
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
              <div className="py-3 px-4 bg-white/90 rounded-2xl border border-gray-200/70 backdrop-blur-sm shadow-sm hover:border-oranza-300 transition-all">
                <p className="text-xs text-ink-tertiary">Curated Collection</p>
                <p className="text-lg font-bold text-ink mt-0.5">500+ Items</p>
              </div>
              <div className="py-3 px-4 bg-white/90 rounded-2xl border border-gray-200/70 backdrop-blur-sm shadow-sm hover:border-oranza-300 transition-all">
                <p className="text-xs text-ink-tertiary">Product Media</p>
                <p className="text-lg font-bold text-ink mt-0.5">HD Video & Photos</p>
              </div>
              <div className="py-3 px-4 bg-white/90 rounded-2xl border border-gray-200/70 backdrop-blur-sm shadow-sm hover:border-oranza-300 transition-all">
                <p className="text-xs text-ink-tertiary">Direct Inquiry</p>
                <p className="text-lg font-bold text-[#1EBE5D] mt-0.5">1-Click WhatsApp</p>
              </div>
              <div className="py-3 px-4 bg-white/90 rounded-2xl border border-gray-200/70 backdrop-blur-sm shadow-sm hover:border-oranza-300 transition-all">
                <p className="text-xs text-ink-tertiary">Pricing Model</p>
                <p className="text-lg font-bold text-ink mt-0.5">Direct Quotation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section id="categories" className="py-16 sm:py-20 bg-surface-secondary border-b border-gray-200/60">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-oranza-600 uppercase tracking-widest bg-oranza-50 px-2.5 py-1 rounded-md">
                Organized Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-2 tracking-tight">
                Browse by Category
              </h2>
              <p className="text-sm text-ink-secondary mt-1 max-w-lg">
                Select a collection to view high-resolution specifications and video demonstrations.
              </p>
            </div>
            <Link
              to="/categories"
              className="mt-4 md:mt-0 text-sm font-semibold text-oranza-600 hover:text-oranza-700 flex items-center gap-1 group"
            >
              <span>View All Categories</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-200/70"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-oranza-300 bg-oranza-950/80 px-2.5 py-0.5 rounded-full border border-oranza-800">
                      {category.productCount || 0} Products
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-oranza-500 transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mt-2 text-white group-hover:text-oranza-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200/60">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-oranza-500"></span>
                <span className="text-xs font-bold text-oranza-600 uppercase tracking-widest">
                  Featured Highlights
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-ink mt-2 tracking-tight">
                Top Catalog Showcase
              </h2>
              <p className="text-sm text-ink-secondary mt-1">
                Explore our handpicked products featuring complete video demonstrations and detailed specs.
              </p>
            </div>

            <Link
              to="/catalog"
              className="mt-4 md:mt-0 px-5 py-2.5 rounded-brand border border-oranza-300 text-oranza-600 hover:bg-oranza-50 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CATALOG SYSTEM (E-COMMERCE VS CATALOG HIGHLIGHT) */}
      <section className="py-16 sm:py-20 bg-surface-secondary">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-oranza-600 uppercase tracking-widest bg-oranza-50 px-2.5 py-1 rounded-md">
              Why Choose Our Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-ink mt-2 tracking-tight">
              A Smoother, Smarter Way to Buy
            </h2>
            <p className="text-sm text-ink-secondary mt-2">
              No complicated carts or automated checkouts. We focus on transparent product knowledge and direct personalized customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:border-oranza-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-oranza-50 flex items-center justify-center text-oranza-600 mb-5">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Video Demonstration</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Every flagship item includes an embedded video walkthrough showcasing real texture, craftsmanship, ergonomic adjustments, and proportions.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:border-oranza-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-oranza-50 flex items-center justify-center text-oranza-600 mb-5">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Exact Specifications Sheet</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Structured technical data covering dimensions, materials, load capacity, warranty terms, and care instructions—no hidden surprises.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:border-oranza-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-5">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Direct WhatsApp Quotation</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Click any product to instantly open WhatsApp with an auto-filled product code and link. Discuss custom dimensions, bulk orders, and shipping directly with our staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-r from-oranza-600 via-oranza-500 to-amber-600 text-white relative overflow-hidden">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Have a Specific Requirement or Custom Order?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Our catalog is updated daily. Contact our dedicated sales support on WhatsApp for custom finishes, bulk project quotations, or immediate catalogs in PDF format.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${company.defaultWhatsApp}?text=${encodeURIComponent(
                "Hello Oranza team! I am looking for custom product solutions and would like a quotation."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-brand bg-white text-ink hover:bg-gray-100 font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <Link
              to="/catalog"
              className="px-8 py-3.5 rounded-brand bg-black/25 hover:bg-black/40 text-white font-bold text-sm border border-white/30 backdrop-blur-sm transition-all"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
