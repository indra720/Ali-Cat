import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const { categories, products } = useCatalog();

  const category = categories.find((c) => c.slug === slug || c.id === slug);
  const categoryProducts = products.filter(
    (p) => p.categoryId === slug || (category && p.categoryId === category.id)
  );

  return (
    <div className="min-h-screen bg-surface-secondary py-10 sm:py-14">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-secondary mb-6">
          <Link to="/" className="hover:text-oranza-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/catalog" className="hover:text-oranza-600 transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-ink font-semibold">{category?.name || slug}</span>
        </nav>

        {/* Category Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white mb-10 shadow-md">
          {category?.image && (
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 filter blur-[1px]"
            />
          )}
          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-oranza-500 text-white uppercase tracking-wider">
              Category Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              {category?.name || slug}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 mt-2 leading-relaxed">
              {category?.description || "Browse all curated designs, detailed dimensions, and product videos in this collection."}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-oranza-300 font-semibold">
              <span>{categoryProducts.length} Products Available</span>
              <span>•</span>
              <span>Direct WhatsApp Inquiries</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <LayoutGrid className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-ink">No Products in this Category</h3>
            <p className="text-xs text-ink-secondary mt-1">
              Check back soon as we add more items, or explore our full catalog.
            </p>
            <Link
              to="/catalog"
              className="mt-5 inline-block px-5 py-2.5 rounded-brand bg-oranza-500 text-white text-xs font-semibold"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
