import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts, initialCategories, companyConfig } from "../data/catalogData";

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  // Load products from localStorage or use initial demo
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("oranza_catalog_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Load categories from localStorage or use initial demo
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("oranza_catalog_categories");
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Authentication state for Seller / Company Admin
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem("oranza_catalog_auth");
      return saved ? JSON.parse(saved) : { isLoggedIn: false, user: null };
    } catch {
      return { isLoggedIn: false, user: null };
    }
  });

  // Track global enquiry counts
  const [enquiryStats, setEnquiryStats] = useState(() => {
    try {
      const saved = localStorage.getItem("oranza_catalog_stats");
      return saved ? JSON.parse(saved) : { totalClicks: 142 };
    } catch {
      return { totalClicks: 142 };
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("oranza_catalog_products", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("oranza_catalog_categories", JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories to localStorage", e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem("oranza_catalog_auth", JSON.stringify(auth));
    } catch (e) {
      console.error("Failed to save auth to localStorage", e);
    }
  }, [auth]);

  useEffect(() => {
    try {
      localStorage.setItem("oranza_catalog_stats", JSON.stringify(enquiryStats));
    } catch (e) {
      console.error("Failed to save stats to localStorage", e);
    }
  }, [enquiryStats]);

  // Actions
  const addProduct = (newProduct) => {
    const slug = newProduct.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const product = {
      ...newProduct,
      id: "prod-" + Date.now(),
      slug: slug || "product-" + Date.now(),
      views: 1,
      enquiries: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProducts((prev) => [product, ...prev]);

    // Update category productCount
    if (product.categoryId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === product.categoryId
            ? { ...cat, productCount: (cat.productCount || 0) + 1 }
            : cat
        )
      );
    }
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    const target = products.find((p) => p.id === id);
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
  };

  const addCategory = (catData) => {
    const slug = catData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newCat = {
      ...catData,
      id: "cat-" + Date.now(),
      slug,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const recordEnquiry = (productId) => {
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
  };

  const login = (email, password) => {
    // Simple demo auth
    const user = {
      name: email.split("@")[0] || "Seller Admin",
      email,
      company: companyConfig.name,
      role: "Seller Admin",
    };
    setAuth({ isLoggedIn: true, user });
    return true;
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  const resetToDemoData = () => {
    setProducts(initialProducts);
    setCategories(initialCategories);
    localStorage.removeItem("oranza_catalog_products");
    localStorage.removeItem("oranza_catalog_categories");
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        auth,
        enquiryStats,
        company: companyConfig,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        recordEnquiry,
        login,
        logout,
        resetToDemoData,
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
