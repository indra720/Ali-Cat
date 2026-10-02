import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MessageCircle, 
  Play, 
  Image as ImageIcon, 
  CheckCircle, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  FileText, 
  ChevronRight,
  Eye,
  Check,
  QrCode,
  Printer
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { productsAPI } from "../services/api";
import VideoPlayer from "../components/VideoPlayer";
import WhatsAppButton from "../components/WhatsAppButton";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
import ProductCard from "../components/ProductCard";
import QRCodeModal from "../components/QRCodeModal";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, company, loadingProducts } = useCatalog();

  const [directProduct, setDirectProduct] = useState(null);
  const [fetchingDirect, setFetchingDirect] = useState(false);

  // Find product by slug or id
  const catalogProduct = products.find((p) => p.slug === slug || String(p.id) === String(slug));
  const product = catalogProduct || directProduct;

  // Automatically record view count on backend and fetch directly from DB:
  useEffect(() => {
    if (slug) {
      setFetchingDirect(true);
      productsAPI.getById(slug)
        .then((data) => {
          if (data) setDirectProduct(data);
        })
        .catch((err) => {
          console.warn("Could not fetch product detail directly:", err.message);
        })
        .finally(() => {
          setFetchingDirect(false);
        });
    }
  }, [slug]);

  // Active media view: index of image or "video"
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState("gallery"); // "gallery" or "video"
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  if (loadingProducts || (fetchingDirect && !product)) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-oranza-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-ink-secondary">Loading live product details from database...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-ink">Product Not Found</h2>
          <p className="text-sm text-ink-secondary mt-2">
            The product you're looking for might have been moved or removed from the catalog.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-brand bg-oranza-500 text-white font-semibold text-xs shadow-sm hover:bg-oranza-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];

  const displayPrice =
    product.priceType === "on_request" || !product.price
      ? "Price on Request"
      : `${product.currency || "₹"}${Number(product.price).toLocaleString("en-IN")}`;

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-8 sm:py-12">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-oranza-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <nav className="hidden sm:flex items-center gap-2 text-xs text-ink-secondary">
            <Link to="/" className="hover:text-oranza-600">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/catalog" className="hover:text-oranza-600">Catalog</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link to={`/category/${product.categoryId}`} className="hover:text-oranza-600">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-ink font-semibold truncate max-w-xs">{product.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-oranza-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
              title="Showroom QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-oranza-500" />
              <span className="hidden sm:inline">Showroom QR</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
              title="Print / Save PDF Spec Sheet"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Print Spec Sheet</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Media Gallery & Video (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Media Mode Tabs */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <button
                  onClick={() => setActiveMediaTab("gallery")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    activeMediaTab === "gallery"
                      ? "bg-oranza-50 text-oranza-600 border border-oranza-200"
                      : "text-ink-secondary hover:text-ink hover:bg-gray-50"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo Gallery ({images.length})</span>
                </button>

                {product.video && (
                  <button
                    onClick={() => setActiveMediaTab("video")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeMediaTab === "video"
                        ? "bg-oranza-500 text-white shadow-sm"
                        : "text-ink-secondary hover:text-ink hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Product Video</span>
                  </button>
                )}
              </div>

              {/* Main Media Display Viewport */}
              {activeMediaTab === "gallery" ? (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80">
                    {images.length > 0 ? (
                      <>
                        <img
                          src={images[selectedImageIndex] || images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover object-center transition-all duration-300"
                        />
                        {/* Image Counter Badge */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                        <ImageIcon className="w-12 h-12 mb-2 text-gray-300" />
                        <span className="text-sm font-semibold">No Image Uploaded</span>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                            selectedImageIndex === idx
                              ? "border-oranza-500 ring-2 ring-oranza-500/30 scale-95"
                              : "border-gray-200 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}

                      {product.video && (
                        <button
                          onClick={() => setActiveMediaTab("video")}
                          className="w-20 h-20 rounded-xl bg-gray-900 text-white shrink-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-oranza-400 hover:bg-black transition-all"
                        >
                          <Play className="w-5 h-5 text-oranza-400 fill-oranza-400" />
                          <span className="text-[10px] font-bold uppercase">Video</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Video Player View */
                <div className="space-y-3">
                  <VideoPlayer video={product.video} />
                  <p className="text-xs text-ink-secondary text-center">
                    Product demonstration showcasing texture, finish, and structural details.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Information, Specs & WhatsApp CTA (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-oranza-100 text-oranza-800 tracking-wide uppercase">
                    {product.categoryName}
                  </span>
                  <span className="text-xs font-mono font-medium text-ink-tertiary">
                    SKU: {product.sku || "N/A"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                  {product.title}
                </h1>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-oranza-50/70 border border-oranza-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-oranza-900 uppercase tracking-wider block">
                      Catalog Reference Price
                    </span>
                    <span className="text-2xl font-black text-oranza-600">
                      {displayPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-secondary text-right max-w-[140px] leading-tight">
                    *Ex-factory quotation subject to custom finishes.
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                    Product Overview
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed whitespace-pre-line">
                    {product.fullDescription || product.shortDescription}
                  </p>
                </div>

                {/* Technical Specifications Sheet */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-oranza-500" />
                      <span>Technical Specifications</span>
                    </h3>

                    <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs">
                      {product.specifications.map((spec, i) => (
                        <div
                          key={spec.id || i}
                          className={`flex items-center justify-between p-2.5 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50/80"
                          }`}
                        >
                          <span className="font-semibold text-ink-secondary w-2/5">
                            {spec.key}
                          </span>
                          <span className="text-ink font-medium w-3/5 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Spec Sheet Quick Utilities */}
                    <div className="flex items-center gap-2 pt-2.5">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 py-2 px-3 rounded-lg border border-gray-200 hover:border-oranza-400 hover:bg-oranza-50/50 text-ink-secondary hover:text-oranza-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-oranza-500" />
                        <span>Print / Save Spec Sheet (PDF)</span>
                      </button>
                      <button
                        onClick={() => setIsQrModalOpen(true)}
                        className="py-2 px-3 rounded-lg border border-gray-200 hover:border-oranza-400 hover:bg-oranza-50/50 text-ink-secondary hover:text-oranza-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                        title="Generate Showroom QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5 text-oranza-500" />
                        <span>Showroom QR</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PRIMARY WHATSAPP CONTACT ACTION CARD */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Interested in this product?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Tap below to chat directly with our team on WhatsApp. Your inquiry will include the product title, SKU code, and catalog link automatically!
                      </p>
                    </div>
                  </div>

                  <WhatsAppButton
                    product={product}
                    size="lg"
                    label="Inquire via WhatsApp Now"
                    className="w-full shadow-md hover:shadow-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    Direct Manufacturer Assistance
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-oranza-500" />
                    Custom Quotations Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Discovery: Related Category Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-ink">
                  More from {product.categoryName}
                </h3>
                <p className="text-xs text-ink-secondary mt-1">
                  Explore other related designs and models in this collection.
                </p>
              </div>

              <Link
                to={`/category/${product.categoryId}`}
                className="text-xs font-bold text-oranza-600 hover:text-oranza-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Showroom QR Code Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        product={product}
      />
    </div>
  );
}
