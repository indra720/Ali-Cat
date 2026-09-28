import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers, Plus, Trash2, Check, ExternalLink } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";

export default function CategoriesManagePage() {
  const { categories, addCategory, deleteCategory } = useCatalog();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      description: description.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    });

    setName("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-xs text-ink-tertiary">Category Management</span>
        </div>

        {/* Add New Category */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-oranza-500" />
            <span>Create New Catalog Category</span>
          </h2>
          <p className="text-xs text-ink-secondary mb-5">
            Group your products logically to help buyers browse smoothly.
          </p>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office Ergonomics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="Brief summary of items in this category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-brand bg-oranza-500 hover:bg-oranza-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8">
          <h3 className="text-base font-bold text-ink mb-4">
            Existing Categories ({categories.length})
          </h3>

          <div className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <div key={cat.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-ink">{cat.name}</h4>
                    <p className="text-xs text-ink-secondary line-clamp-1">{cat.description}</p>
                    <span className="text-[11px] text-oranza-600 font-semibold">
                      {cat.productCount || 0} Products
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/category/${cat.slug}`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-ink hover:bg-gray-100 rounded-md"
                    title="View Category Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
