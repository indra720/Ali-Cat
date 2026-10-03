import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Sparkles, 
  MessageCircle,
  PackageCheck
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import WhatsAppButton from "../components/WhatsAppButton";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";

export default function CategoriesPage() {
  const { categories, products, company, loadingCategories } = useCatalog();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-surface-secondary pt-3 sm:pt-4 pb-12">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-ink-secondary mb-3">
          <Link to="/" className="hover:text-oranza-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-ink font-semibold">Categories</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-oranza-600 via-oranza-500 to-amber-600 text-white p-8 sm:p-12 mb-8 shadow-lg overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>Structured Collections</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Product Categories
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
              Explore our complete architectural and lifestyle catalog divided by specialized design domains. Each collection features full specifications, multi-angle imagery, and video demos.
            </p>

            {/* Live Search inside Categories */}
            <div className="mt-6 relative max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories (e.g. Furniture, Lighting)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-brand bg-white text-ink text-sm focus:outline-none shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loadingCategories ? (
            [1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-gray-200 h-96 animate-pulse p-4 flex flex-col justify-between shadow-sm">
                <div className="h-56 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            ))
          ) : filteredCategories.map((category) => {
            // Find products belonging to this category
            const categoryProducts = products.filter(
              (p) => p.categoryId === category.id
            );

            return (
              <div
                key={category.id}
                className="group bg-white rounded-3xl border border-gray-200 shadow-card hover:shadow-card-hover hover:border-oranza-300 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Category Image Cover */}
                <Link
                  to={`/category/${category.slug}`}
                  className="relative h-56 bg-gray-100 overflow-hidden block"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-ink backdrop-blur-sm shadow-sm">
                      {categoryProducts.length} Items Available
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-xl font-extrabold group-hover:text-oranza-300 transition-colors">
                      {category.name}
                    </h2>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {category.description || "Discover premium designs and verified technical specifications."}
                    </p>

                    {/* Preview of Top Products in this Category */}
                    {categoryProducts.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-[11px] font-bold text-ink-tertiary uppercase tracking-wider block mb-2">
                          Popular in this Category:
                        </span>
                        <div className="space-y-1.5">
                          {categoryProducts.slice(0, 3).map((prod) => (
                            <Link
                              key={prod.id}
                              to={`/products/${prod.slug}`}
                              className="text-xs text-ink hover:text-oranza-600 flex items-center justify-between py-1 px-2 rounded-md hover:bg-oranza-50/60 transition-colors"
                            >
                              <span className="truncate max-w-[200px] font-medium">{prod.title}</span>
                              <span className="text-xs font-bold text-oranza-600">
                                {prod.priceType === "on_request" || !prod.price
                                  ? "RFQ"
                                  : `₹${Number(prod.price).toLocaleString("en-IN")}`}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                    <Link
                      to={`/category/${category.slug}`}
                      className="flex-1 py-2.5 px-4 text-center text-xs font-bold text-white bg-oranza-500 hover:bg-oranza-600 rounded-brand shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${company.defaultWhatsApp}?text=${encodeURIComponent(
                        `Hello ${company.name}! I am interested in viewing more products in the ${category.name} collection.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-brand bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 transition-all"
                      title="Enquire on WhatsApp about this category"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Help Strip */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-oranza-50 flex items-center justify-center text-oranza-600 shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">Need a Custom Category or Bespoke Batch?</h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                Our manufacturing team works directly with architects, interior designers, and corporate procurement.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${company.defaultWhatsApp}?text=${encodeURIComponent(
              "Hello! I would like to inquire about custom manufacturing / B2B bulk orders."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-brand bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat for Custom Requirements</span>
          </a>
        </div>
      </div>
    </div>
  );
}
