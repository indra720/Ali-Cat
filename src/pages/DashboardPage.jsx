import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, 
  Layers, 
  MessageCircle, 
  Eye, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Edit, 
  Play, 
  LogOut, 
  Sparkles,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";

export default function DashboardPage() {
  const { 
    products, 
    categories, 
    auth, 
    logout, 
    deleteProduct, 
    enquiryStats, 
    resetToDemoData 
  } = useCatalog();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalViews = products.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalEnquiries = enquiryStats.totalClicks || products.reduce((acc, p) => acc + (p.enquiries || 0), 0);

  return (
    <div className="min-h-screen bg-surface-secondary py-8 sm:py-10">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-oranza-100 text-oranza-800 uppercase tracking-wide">
                Seller Console
              </span>
              <span className="text-xs text-ink-tertiary">
                {auth.user?.company || "Oranza Living"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
              Catalog Management Dashboard
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Add new products, embed videos, update technical spec sheets, and monitor WhatsApp enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              to="/catalog"
              target="_blank"
              className="px-3.5 py-2 text-xs font-semibold text-ink-secondary hover:text-ink bg-gray-50 border border-gray-200 rounded-brand flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
              <span>Live Catalog</span>
            </Link>

            <Link
              to="/dashboard/products/new"
              className="px-4 py-2 text-xs font-bold text-white bg-oranza-500 hover:bg-oranza-600 rounded-brand shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-brand flex items-center gap-1 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-tertiary">Active Products</p>
              <p className="text-2xl font-black text-ink mt-1">{products.length}</p>
              <span className="text-[11px] text-green-600 font-medium">Published on catalog</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-oranza-50 text-oranza-500 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-tertiary">Active Categories</p>
              <p className="text-2xl font-black text-ink mt-1">{categories.length}</p>
              <Link to="/dashboard/categories" className="text-[11px] text-oranza-600 font-medium hover:underline">
                Manage categories →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-tertiary">WhatsApp Leads Generated</p>
              <p className="text-2xl font-black text-[#25D366] mt-1">{totalEnquiries}</p>
              <span className="text-[11px] text-ink-secondary font-medium">Inquiry button clicks</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-tertiary">Video Walkthroughs</p>
              <p className="text-2xl font-black text-ink mt-1">
                {products.filter((p) => p.video?.url).length}
              </p>
              <span className="text-[11px] text-indigo-600 font-medium">Interactive media</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Products Management Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink">Catalog Inventory</h2>
              <p className="text-xs text-ink-secondary">
                View, edit, or delete items currently showcased to customers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetToDemoData}
                className="px-3 py-1.5 rounded-md border border-gray-200 text-xs text-ink-secondary hover:text-ink hover:bg-gray-50 flex items-center gap-1"
                title="Restore default mock items"
              >
                <RotateCcw className="w-3 h-3 text-gray-400" />
                <span>Reset Demo Items</span>
              </button>
              <Link
                to="/dashboard/products/new"
                className="px-3.5 py-1.5 rounded-md bg-oranza-500 hover:bg-oranza-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Item</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/75 border-b border-gray-200 text-ink-tertiary uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price / RFQ</th>
                  <th className="py-3 px-4">Media</th>
                  <th className="py-3 px-4">Specs</th>
                  <th className="py-3 px-4 text-center">WhatsApp Leads</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-ink">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-oranza-50/30 transition-colors">
                    {/* Product & SKU */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=100&q=80"}
                          alt={prod.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/products/${prod.slug}`}
                            className="font-bold text-sm text-ink hover:text-oranza-600 transition-colors line-clamp-1"
                          >
                            {prod.title}
                          </Link>
                          <span className="text-[11px] text-ink-tertiary font-mono">
                            {prod.sku || "CODE: --"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                        {prod.categoryName}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {prod.priceType === "on_request" || !prod.price
                        ? "Price on Request"
                        : `${prod.currency || "₹"}${Number(prod.price).toLocaleString("en-IN")}`}
                    </td>

                    {/* Media Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium text-[10px]">
                          {prod.images?.length || 1} Photos
                        </span>
                        {prod.video?.url && (
                          <span className="px-2 py-0.5 rounded bg-oranza-100 text-oranza-800 font-bold text-[10px] flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            Video
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Specifications */}
                    <td className="py-3 px-4">
                      <span className="text-xs text-ink-secondary">
                        {prod.specifications?.length || 0} fields
                      </span>
                    </td>

                    {/* WhatsApp Clicks */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1EBE5D] font-bold text-xs">
                        <WhatsAppIcon className="w-3 h-3" />
                        {prod.enquiries || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-ink"
                          title="Preview Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${prod.title}" from catalog?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
