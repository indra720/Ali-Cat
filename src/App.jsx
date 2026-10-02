import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CatalogProvider } from "./context/CatalogContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddProductPage from "./pages/AddProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesManagePage from "./pages/CategoriesManagePage";
import ContactPage from "./pages/ContactPage";
import EditProductPage from "./pages/EditProductPage";
import ProfilePage from "./pages/ProfilePage";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <CatalogProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-surface text-ink antialiased">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Discovery Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/enquiry" element={<ContactPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Seller / Admin Management Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard/products/new" element={<AddProductPage />} />
              <Route path="/dashboard/products/edit/:id" element={<EditProductPage />} />
              <Route path="/dashboard/categories" element={<CategoriesManagePage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </BrowserRouter>
    </CatalogProvider>
  </ToastProvider>
  );
}
