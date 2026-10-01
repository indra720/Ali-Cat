import React, { useState, useEffect } from "react";
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
  RotateCcw,
  Download,
  FileSpreadsheet,
  CheckCircle,
  PhoneCall
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
import { exportAPI, contactAPI } from "../services/api";

export default function DashboardPage() {
  const { 
    products, 
    categories, 
    auth, 
    logout, 
    deleteProduct, 
    enquiryStats, 
    refreshData 
  } = useCatalog();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [exportingLeads, setExportingLeads] = useState(false);
  const [exportingProducts, setExportingProducts] = useState(false);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await contactAPI.getMessages();
        if (Array.isArray(data)) setLeads(data);
      } catch (err) {
        console.warn("Could not fetch inquiries:", err.message);
      }
    }
    fetchLeads();
  }, []);

  const handleExportLeads = async () => {
    try {
      setExportingLeads(true);
      await exportAPI.downloadLeadsCSV();
    } catch (e) {
      alert("Export failed: " + e.message);
    } finally {
      setExportingLeads(false);
    }
  };

  const handleExportProducts = async () => {
    try {
      setExportingProducts(true);
      await exportAPI.downloadProductsCSV();
    } catch (e) {
      alert("Export failed: " + e.message);
    } finally {
      setExportingProducts(false);
    }
  };

  const handleMarkLeadRead = async (id) => {
    try {
      await contactAPI.markRead(id);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, is_read: true } : l)));
    } catch (e) {
      console.error(e);
    }
  };

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

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportLeads}
              disabled={exportingLeads}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-brand flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download customer leads as Excel CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{exportingLeads ? "Exporting..." : "Export Leads (CSV)"}</span>
            </button>

            <button
              onClick={handleExportProducts}
              disabled={exportingProducts}
              className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-brand flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download catalog products inventory as Excel CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>{exportingProducts ? "Exporting..." : "Export Catalog (CSV)"}</span>
            </button>

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
                onClick={refreshData}
                className="px-3 py-1.5 rounded-md border border-gray-200 text-xs text-ink-secondary hover:text-ink hover:bg-gray-50 flex items-center gap-1"
                title="Sync latest inventory from database"
              >
                <RotateCcw className="w-3 h-3 text-gray-400" />
                <span>Sync with DB</span>
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

                        <Link
                          to={`/dashboard/products/edit/${prod.id}`}
                          className="p-1.5 rounded-md hover:bg-oranza-50 text-gray-500 hover:text-oranza-600 transition-colors"
                          title="Edit Product Details & Media"
                        >
                          <Edit className="w-3.5 h-3.5" />
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

        {/* Customer Inquiries / CRM Leads Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-lg font-bold text-ink">Recent Customer Inquiries & Leads</h3>
              </div>
              <p className="text-xs text-ink-secondary mt-0.5">
                Live customer enquiries submitted via Contact Page and quotation requests.
              </p>
            </div>
            <button
              onClick={handleExportLeads}
              className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-brand flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export to Excel</span>
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No inquiries received yet. When customers submit the Contact Form, they appear here instantly!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-ink-secondary font-semibold">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Customer Name</th>
                    <th className="py-2.5 px-3">WhatsApp / Phone</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "Recent"}
                      </td>
                      <td className="py-3 px-3 font-semibold text-ink">
                        {lead.name}
                        {lead.email && <div className="text-[10px] text-gray-400 font-normal">{lead.email}</div>}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-medium">
                          {lead.category || "General"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-600 max-w-xs truncate" title={lead.message}>
                        {lead.message}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {lead.is_read ? (
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px]">
                            Contacted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[10px]">
                            New Lead
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {!lead.is_read && (
                          <button
                            onClick={() => handleMarkLeadRead(lead.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                          >
                            Mark Read
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

