import React, { createContext, useContext, useState, useEffect } from "react";
import {
  productsAPI,
  categoriesAPI,
  authAPI,
  settingsAPI,
  enquiriesAPI
} from "../services/api";
import { useToast } from "./ToastContext";

const defaultCompanyConfig = {
  name: "Oranza Living & Lifestyle",
  tagline: "Inspiring Spaces with Curated Design",
  defaultWhatsApp: "919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "catalog@oranzalifestyle.com",
  address: "Plot 42, Design District, Outer Ring Road, Bengaluru, India",
  instagram: "https://instagram.com",
  catalogCountText: "500+ Curated Products"
};

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const { toast } = useToast();

  // 1. Live Products state - 100% DYNAMIC from FastAPI SQLite DB
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // 2. Live Categories state - 100% DYNAMIC from FastAPI SQLite DB
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // 3. Live Company Settings state - DYNAMIC from FastAPI SQLite DB
  const [company, setCompany] = useState(defaultCompanyConfig);
  const [loadingCompany, setLoadingCompany] = useState(true);

  // 4. Authentication state with JWT
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem("oranza_catalog_auth");
      return saved ? JSON.parse(saved) : { isLoggedIn: false, user: null, token: null };
    } catch {
      return { isLoggedIn: false, user: null, token: null };
    }
  });

  // 5. Global Enquiry Stats
  const [enquiryStats, setEnquiryStats] = useState({ totalClicks: 0 });

  // ---------------------------------------------------------------------------
  // INITIAL DYNAMIC FETCH FROM FASTAPI BACKEND (on page load)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // 1. Fetch live products from FastAPI
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        const liveProducts = await productsAPI.getAll();
        setProducts(Array.isArray(liveProducts) ? liveProducts : []);
      } catch (err) {
        console.error("Could not fetch live products from backend:", err.message);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }

    // 2. Fetch live categories from FastAPI
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const liveCategories = await categoriesAPI.getAll();
        setCategories(Array.isArray(liveCategories) ? liveCategories : []);
      } catch (err) {
        console.error("Could not fetch live categories from backend:", err.message);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    }

    // 3. Fetch live store settings from FastAPI
    async function loadSettings() {
      try {
        const liveSettings = await settingsAPI.get();
        if (liveSettings) {
          setCompany(liveSettings);
        }
      } catch (err) {
        console.error("Could not fetch store settings:", err.message);
      } finally {
        setLoadingCompany(false);
      }
    }

    // 4. Verify existing JWT token with /auth/me
    async function verifyAuth() {
      const token = localStorage.getItem("oranza_jwt_token");
      if (token) {
        try {
          const user = await authAPI.getMe();
          setAuth({ isLoggedIn: true, user, token });
        } catch {
          localStorage.removeItem("oranza_jwt_token");
          setAuth({ isLoggedIn: false, user: null, token: null });
        }
      }
    }

    loadProducts();
    loadCategories();
    loadSettings();
    verifyAuth();
  }, []);

  // Save auth to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("oranza_catalog_auth", JSON.stringify(auth));
    } catch (e) {
      console.error("Failed to save auth to localStorage", e);
    }
  }, [auth]);

  // ---------------------------------------------------------------------------
  // LIVE ASYNC ACTIONS (Connected to FastAPI Endpoints)
  // ---------------------------------------------------------------------------

  // Add Product (POST /api/v1/products)
  const addProduct = async (newProduct) => {
    try {
      const created = await productsAPI.create(newProduct);
      setProducts((prev) => [created, ...prev]);
      
      // Update category productCount
      if (created.categoryId) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === created.categoryId
              ? { ...cat, productCount: (cat.productCount || 0) + 1 }
              : cat
          )
        );
      }
      toast.success(`"${created.title || 'Product'}" added successfully!`);
      return created;
    } catch (err) {
      toast.error(err.message || "Failed to add product");
      throw err;
    }
  };

  // Update Product (PUT /api/v1/products/{id})
  const updateProduct = async (id, updatedFields) => {
    try {
      const updated = await productsAPI.update(id, updatedFields);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      toast.success(`"${updated.title || 'Product'}" updated successfully!`);
      return updated;
    } catch (err) {
      toast.error(err.message || "Failed to update product");
      throw err;
    }
  };

  // Delete Product (DELETE /api/v1/products/{id})
  const deleteProduct = async (id) => {
    try {
      const target = products.find((p) => p.id === id);
      await productsAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));

      if (target && target.categoryId) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === target.categoryId
              ? { ...cat, productCount: Math.max(0, (cat.productCount || 1) - 1) }
              : cat
          )
        );
      }
      toast.delete(`"${target?.title || 'Product'}" deleted from catalog!`);
    } catch (err) {
      toast.error(err.message || "Failed to delete product");
      throw err;
    }
  };

  // Add Category (POST /api/v1/categories)
  const addCategory = async (catData) => {
    try {
      const created = await categoriesAPI.create(catData);
      setCategories((prev) => [...prev, created]);
      toast.success(`Category "${created.name}" created successfully!`);
      return created;
    } catch (err) {
      toast.error(err.message || "Failed to add category");
      throw err;
    }
  };

  // Update Category (PUT /api/v1/categories/{id})
  const updateCategory = async (id, updatedFields) => {
    try {
      const updated = await categoriesAPI.update(id, updatedFields);
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast.success(`Category "${updated.name}" updated successfully!`);
      return updated;
    } catch (err) {
      toast.error(err.message || "Failed to update category");
      throw err;
    }
  };

  // Delete Category (DELETE /api/v1/categories/{id})
  const deleteCategory = async (id) => {
    try {
      const cat = categories.find((c) => c.id === id);
      await categoriesAPI.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.delete(`Category "${cat?.name || id}" deleted!`);
    } catch (err) {
      toast.error(err.message || "Failed to delete category");
      throw err;
    }
  };

  // Record WhatsApp Enquiry Click (POST /api/v1/enquiries/click)
  const recordEnquiry = async (productId) => {
    setEnquiryStats((prev) => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
    }));

    if (productId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, enquiries: (p.enquiries || 0) + 1 } : p
        )
      );
    }

    try {
      const numId = typeof productId === "number" || (!isNaN(productId) && productId !== null) ? Number(productId) : null;
      await enquiriesAPI.recordClick(numId);
    } catch (err) {
      console.warn("Backend enquiry record failed (offline):", err.message);
    }
  };

  // Real Login with JWT (POST /api/v1/auth/login)
  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    if (data && data.access_token) {
      localStorage.setItem("oranza_jwt_token", data.access_token);
      setAuth({
        isLoggedIn: true,
        user: data.user,
        token: data.access_token
      });
      return { success: true, user: data.user };
    }
    return { success: false, error: "Invalid credentials" };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("oranza_jwt_token");
    setAuth({ isLoggedIn: false, user: null, token: null });
  };

  // Update Profile (PUT /api/v1/auth/me)
  const updateUserProfile = async (profileData) => {
    try {
      const updatedUser = await authAPI.updateProfile(profileData);
      if (updatedUser) {
        setAuth((prev) => ({
          ...prev,
          user: updatedUser
        }));
      }
      toast.success("Account profile updated successfully!");
      return updatedUser;
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
      throw err;
    }
  };

  // Delete Account (DELETE /api/v1/auth/me)
  const deleteAccount = async () => {
    try {
      await authAPI.deleteAccount();
      localStorage.removeItem("oranza_jwt_token");
      setAuth({ isLoggedIn: false, user: null, token: null });
      toast.delete("Your account was permanently deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete account");
      throw err;
    }
  };

  // Update Store Settings (PUT /api/v1/settings)
  const updateStoreSettings = async (settingsData) => {
    try {
      const updated = await settingsAPI.update(settingsData);
      if (updated) {
        setCompany(updated);
      }
      toast.success("Store settings updated successfully!");
      return updated;
    } catch (err) {
      toast.error(err.message || "Failed to update store settings");
      throw err;
    }
  };

  // Refresh data from backend
  const refreshData = async () => {
    try {
      setLoadingProducts(true);
      setLoadingCategories(true);
      const [liveProducts, liveCategories, liveSettings] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
        settingsAPI.get()
      ]);
      if (liveProducts) setProducts(liveProducts);
      if (liveCategories) setCategories(liveCategories);
      if (liveSettings) setCompany(liveSettings);
    } catch (e) {
      console.error("Refresh failed:", e);
    } finally {
      setLoadingProducts(false);
      setLoadingCategories(false);
    }
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        loadingProducts,
        categories,
        loadingCategories,
        auth,
        enquiryStats,
        company,
        loadingCompany,
        toast,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        recordEnquiry,
        login,
        logout,
        updateUserProfile,
        deleteAccount,
        updateStoreSettings,
        refreshData
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}
