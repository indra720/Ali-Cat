import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers, Plus, Trash2, Check, ExternalLink, Edit, X, Save, AlertTriangle } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";

export default function CategoriesManagePage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCatalog();

  // Add category state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [savingAdd, setSavingAdd] = useState(false);

  // Edit category modal state
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete category confirmation modal state
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deletingCat, setDeletingCat] = useState(false);

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setDeletingCat(true);
    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingCat(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSavingAdd(true);
    try {
      await addCategory({
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
      });
      setName("");
      setDescription("");
      setImage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSavingAdd(false);
    }
  };

  const handleStartEdit = (cat) => {
    setEditingCategory(cat);
    setEditName(cat.name || "");
    setEditDescription(cat.description || "");
    setEditImage(cat.image || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editingCategory) return;

    setSavingEdit(true);
    try {
      await updateCategory(editingCategory.id, {
        name: editName.trim(),
        description: editDescription.trim(),
        image: editImage.trim()
      });
      setEditingCategory(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingEdit(false);
    }
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
                  placeholder="e.g. Fine Jewelry"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Cover Image URL (Optional)
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
                Description (Optional)
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
              disabled={savingAdd}
              className="px-5 py-2.5 rounded-brand bg-oranza-500 hover:bg-oranza-600 disabled:opacity-50 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{savingAdd ? "Creating Category..." : "Add Category"}</span>
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
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-oranza-50 text-oranza-600 flex items-center justify-center shrink-0 border border-oranza-100">
                      <Layers className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-ink">{cat.name}</h4>
                    <p className="text-xs text-ink-secondary line-clamp-1">{cat.description || "No description provided"}</p>
                    <span className="text-[11px] text-oranza-600 font-semibold">
                      {cat.productCount || 0} Products
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/category/${cat.slug || cat.id}`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-ink hover:bg-gray-100 rounded-md transition-colors"
                    title="View Category Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleStartEdit(cat)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit Category Details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCategoryToDelete(cat)}
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

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-ink">
                  Edit Category: {editingCategory.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-brand border border-gray-300 text-xs focus:outline-none focus:border-oranza-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-brand border border-gray-300 text-xs font-semibold text-ink hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-brand bg-oranza-500 hover:bg-oranza-600 disabled:opacity-50 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingEdit ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Modern Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-ink">
                Confirm Category Deletion?
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Aap category <strong className="text-ink font-semibold">&ldquo;{categoryToDelete.name}&rdquo;</strong> ko delete karna chahte hain? Is category ke items catalog me rahenge, par category permanently remove ho jayegi.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={deletingCat}
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 py-2.5 rounded-brand border border-gray-300 text-xs font-semibold text-ink hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingCat}
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-brand bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{deletingCat ? "Deleting..." : "Yes, Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
