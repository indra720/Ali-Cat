import React from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  if (!product) return null;

  const displayPrice =
    product.priceType === "on_request" || !product.price
      ? "Price on Request"
      : `${product.currency || "₹"}${Number(product.price).toLocaleString("en-IN")}`;

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="group bg-white rounded-card border border-gray-200/80 hover:border-oranza-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container with Badges */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] bg-gray-100 overflow-hidden"
      >
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-ink shadow-sm backdrop-blur-sm">
            {product.categoryName}
          </span>
          {product.isFeatured && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-oranza-500 text-white shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
        </div>

        {/* Video Available Indicator */}
        {product.video && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
            <Play className="w-3 h-3 text-oranza-400 fill-oranza-400" />
            <span>Video Demo</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold tracking-wider text-ink-tertiary uppercase">
              {product.sku || "CODE: CAT"}
            </span>
            <span className="text-xs font-bold text-oranza-600 bg-oranza-50 px-2 py-0.5 rounded-full">
              {displayPrice}
            </span>
          </div>

          <Link to={`/products/${product.slug}`}>
            <h3 className="font-bold text-base text-ink group-hover:text-oranza-600 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-ink-secondary line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription || product.fullDescription}
          </p>
        </div>

        {/* Specifications snippet (first 2 specs) */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-200/60"
              >
                <strong className="font-medium text-gray-700">{spec.key}:</strong> {spec.value}
              </span>
            ))}
          </div>
        )}

        {/* CTA Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 py-2 px-3 text-center text-xs font-semibold text-oranza-600 hover:text-white bg-oranza-50 hover:bg-oranza-500 rounded-brand transition-all flex items-center justify-center gap-1 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>

          <WhatsAppButton
            product={product}
            size="sm"
            label="Inquire"
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
