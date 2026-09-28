import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Video, 
  Image as ImageIcon, 
  Check, 
  FileText, 
  Sparkles, 
  PhoneCall,
  Upload,
  RotateCcw
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, updateProduct, company } = useCatalog();

  const product = products.find((p) => p.id === id);

  // Form State
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priceType, setPriceType] = useState("fixed");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Images state
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState([]);

  // Video state
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  // Dynamic Specifications
  const [specifications, setSpecifications] = useState([]);

  // Prepopulate form when product is found
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setSku(product.sku || "");
      setCategoryId(product.categoryId || categories[0]?.id || "furniture");
      setPriceType(product.priceType || "fixed");
      setPrice(product.price !== null && product.price !== undefined ? String(product.price) : "");
      setShortDescription(product.shortDescription || "");
      setFullDescription(product.fullDescription || "");
      setWhatsappNumber(product.whatsappNumber || company.defaultWhatsApp);
      setIsFeatured(Boolean(product.isFeatured));
      setImages(product.images || []);
      setHasVideo(Boolean(product.video?.url));
      setVideoUrl(product.video?.url || "");
      setVideoTitle(product.video?.title || "Product Video Demo");
      setSpecifications(product.specifications || []);
    }
  }, [product, categories, company]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-ink">Product Not Found</h2>
          <p className="text-xs text-ink-secondary mt-1">
            Cannot find product ID: {id} to edit.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-brand bg-oranza-500 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  // Handle URL image addition
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  // Handle Local Computer Image File Upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImages((prev) => [...prev, uploadEvent.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (idxToRemove) => {
    setImages(images.filter((_, idx) => idx !== idxToRemove));
  };

  // Specifications Handlers
  const handleAddSpecRow = () => {
    setSpecifications([
      ...specifications,
      { id: String(Date.now()), key: "", value: "" }
    ]);
  };

  const handleSpecChange = (id, field, val) => {
    setSpecifications(
      specifications.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleRemoveSpec = (id) => {
    setSpecifications(specifications.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCat = categories.find((c) => c.id === categoryId);

    const updatedFields = {
      title,
      sku: sku.trim() || product.sku,
      categoryId,
      categoryName: selectedCat ? selectedCat.name : product.categoryName,
      priceType,
      price: priceType === "fixed" && price ? parseFloat(price) : null,
      shortDescription,
      fullDescription,
      whatsappNumber: whatsappNumber.replace(/[^0-9]/g, "") || company.defaultWhatsApp,
      isFeatured,
      images: images.length > 0 ? images : product.images,
      video: hasVideo && videoUrl.trim() ? {
        type: "embed",
        url: videoUrl.trim(),
        title: videoTitle || "Product Video Demo"
      } : null,
      specifications: specifications.filter((s) => s.key.trim() && s.value.trim()),
    };

    updateProduct(product.id, updatedFields);
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-xs text-ink-tertiary">Edit Product: #{product.sku}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Basic Product Info */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <FileText className="w-5 h-5 text-oranza-500" />
                <span>Edit Product Information</span>
              </h2>
              <p className="text-xs text-ink-secondary mt-0.5">
                Update product title, category, pricing, and description.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  SKU / Model Number
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Pricing Display Mode
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value)}
                    className="w-1/2 px-3 py-2.5 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 bg-white"
                  >
                    <option value="fixed">Fixed Price (₹)</option>
                    <option value="on_request">Price on Request</option>
                  </select>

                  {priceType === "fixed" ? (
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="25000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
                      />
                    </div>
                  ) : (
                    <span className="w-1/2 text-xs text-gray-500 bg-gray-50 px-3 py-2.5 rounded-brand border border-dashed border-gray-300 text-center">
                      RFQ Tag will appear
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Short Highlight (1 sentence)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Full Description
              </label>
              <textarea
                rows={4}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isFeaturedEdit"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-oranza-600 rounded border-gray-300 focus:ring-oranza-500"
              />
              <label htmlFor="isFeaturedEdit" className="text-xs font-semibold text-ink cursor-pointer flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-oranza-500" />
                <span>Feature this product prominently on the Homepage</span>
              </label>
            </div>
          </div>

          {/* 2. Media: Photos (URL + Computer File Upload) & Video */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-oranza-500" />
                <span>Product Media & Video Walkthrough</span>
              </h2>
              <p className="text-xs text-ink-secondary mt-0.5">
                Add photos via direct URL or upload from your computer.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Upload New Photos (From Computer or Web URL)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Direct file upload from computer */}
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-brand bg-oranza-50 hover:bg-oranza-100 text-oranza-700 font-bold text-xs border border-oranza-200 transition-colors">
                  <Upload className="w-4 h-4 text-oranza-600" />
                  <span>Browse Device Photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* URL input */}
                <div className="flex-1 flex gap-2">
                  <input
                    type="url"
                    placeholder="Or paste image URL (https://...)"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ink text-xs font-bold rounded-brand transition-colors"
                  >
                    + Add URL
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((url, i) => (
                  <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                    <img src={url} alt={`img-${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-oranza-500 text-white text-[9px] font-bold text-center py-0.5">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Setup */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-oranza-500" />
                  <span>Product Video Demonstration</span>
                </label>
                <input
                  type="checkbox"
                  checked={hasVideo}
                  onChange={(e) => setHasVideo(e.target.checked)}
                  className="w-4 h-4 text-oranza-600 rounded"
                />
              </div>

              {hasVideo && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80">
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-secondary mb-1">
                      Video Title / Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sofa Comfort Walkthrough"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-brand border border-gray-300 text-xs bg-white focus:outline-none focus:border-oranza-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ink-secondary mb-1">
                      Video Embed URL (YouTube/Vimeo/MP4)
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/embed/..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-brand border border-gray-300 text-xs bg-white focus:outline-none focus:border-oranza-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Specifications */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-oranza-500" />
                  <span>Technical Specifications Sheet</span>
                </h2>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Update product dimensions, materials, and warranty.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSpecRow}
                className="px-3.5 py-1.5 rounded-brand bg-oranza-50 hover:bg-oranza-100 text-oranza-700 text-xs font-bold border border-oranza-200 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {specifications.map((spec) => (
                <div key={spec.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Attribute (e.g. Material)"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(spec.id, "key", e.target.value)}
                    className="w-2/5 px-3 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. Premium Fabric)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(spec.id, "value", e.target.value)}
                    className="w-3/5 px-3 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(spec.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4. WhatsApp Number */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp Inquiry Routing</span>
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-brand border border-gray-300 text-sm focus:outline-none focus:border-oranza-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-brand border border-gray-300 text-xs font-semibold text-ink-secondary hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-sm shadow-glow-orange transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save & Update Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
