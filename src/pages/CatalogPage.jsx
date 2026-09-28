import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Video, 
  Sparkles, 
  X, 
  LayoutGrid, 
  ChevronRight,
  RefreshCw 
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import ProductCard from "../components/ProductCard";

export default function CatalogPage() {
  const { products, categories } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const selectedCategory = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [videoOnly, setVideoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular"); // 'popular', 'price-asc', 'price-desc', 'newest'

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }

      // Video demo filter
      if (videoOnly && !product.video?.url) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesSku = product.sku?.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription?.toLowerCase().includes(query);
        const matchesSpecs = product.specifications?.some((s) =>
          s.value.toLowerCase().includes(query) || s.key.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesSku && !matchesDesc && !matchesSpecs) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price-desc") {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      // 'popular' default by enquiries/views
      return (b.enquiries || 0) - (a.enquiries || 0);
    });
  }, [products, selectedCategory, searchQuery, videoOnly, sortBy]);

  const handleCategoryChange = (catId) => {
    if (catId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const clearAllFilters = () => {
    searchParams.delete("category");
    setSearchParams(searchParams);
    setSearchQuery("");
    setVideoOnly(false);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-10 sm:py-14">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-secondary mb-4">
          <Link to="/" className="hover:text-oranza-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-ink font-semibold">Digital Product Catalog</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-oranza-100 text-oranza-800 text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutGrid className="w-3.5 h-3.5 text-oranza-600" />
              <span>Full Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Product Catalog
            </h1>
            <p className="text-sm text-ink-secondary mt-1">
              Showing {filteredProducts.length} of {products.length} products with technical specs and direct WhatsApp enquiry.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU, material..."
              className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-oranza-500/20 focus:border-oranza-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Category Navigation Bar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-oranza-500 text-white shadow-sm shadow-oranza-500/30"
                  : "bg-white text-ink-secondary hover:text-ink hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Categories ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-oranza-500 text-white shadow-sm shadow-oranza-500/30"
                    : "bg-white text-ink-secondary hover:text-ink hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.name} ({products.filter((p) => p.categoryId === cat.id).length})
              </button>
            ))}
          </div>

          {/* Quick Filters: Video Only & Sort */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVideoOnly(!videoOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                videoOnly
                  ? "bg-oranza-50 border-oranza-400 text-oranza-700 font-semibold"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <Video className={`w-3.5 h-3.5 ${videoOnly ? "text-oranza-500" : "text-gray-400"}`} />
              <span>With Video Demo</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-oranza-500"
            >
              <option value="popular">Most Inquired</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "all" || searchQuery || videoOnly) && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-ink-tertiary">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-oranza-100 text-oranza-800 text-xs font-medium">
                Category: {categories.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => handleCategoryChange("all")}>
                  <X className="w-3 h-3 text-oranza-600 hover:text-oranza-900" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-medium">
                Keyword: "{searchQuery}"
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3 text-gray-600 hover:text-gray-900" />
                </button>
              </span>
            )}
            {videoOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                Videos Only
                <button onClick={() => setVideoOnly(false)}>
                  <X className="w-3 h-3 text-amber-600 hover:text-amber-900" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-oranza-600 hover:text-oranza-700 font-medium underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-oranza-50 text-oranza-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-ink">No Products Found</h3>
            <p className="text-xs text-ink-secondary mt-1 max-w-xs mx-auto leading-relaxed">
              We couldn't find any products matching your selected category or search filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-5 px-5 py-2.5 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
