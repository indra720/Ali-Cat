/**
 * ============================================================================
 * CENTRALIZED API SERVICE LAYER (src/services/api.js)
 * ============================================================================
 * Ye module frontend ko FastAPI Backend (http://127.0.0.1:8000/api/v1) se jodta hai.
 * Sabhi network requests, headers (JWT Bearer Token), error handling, aur data normalization
 * isi single file me handle hoti hai.
 */

export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";
export const BACKEND_URL = "http://127.0.0.1:8000";

// Helper: Common headers with optional JWT authentication token
function getHeaders(isMultipart = false) {
  const headers = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("oranza_jwt_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Helper: Handle response and errors
async function handleResponse(response) {
  if (!response.ok) {
    let errorDetail = "Something went wrong";
    try {
      const errorData = await response.json();
      errorDetail = errorData.detail || errorDetail;
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(errorDetail);
  }
  if (response.status === 204) {
    return null; // No Content
  }
  return response.json();
}

/**
 * Adapter Helper: Backend snake_case ko Frontend camelCase me normalize karta hai
 * Isse ProductCard, CatalogPage, ProductDetailPage bina kisi UI change ke live chalte hain!
 */
export function normalizeProduct(p) {
  if (!p) return null;
  return {
    ...p,
    id: p.id,
    title: p.title,
    slug: p.slug,
    sku: p.sku || "",
    categoryId: p.category_id || p.categoryId,
    categoryName: p.category_id ? (p.category_id.charAt(0).toUpperCase() + p.category_id.slice(1)) : "General",
    price: p.price,
    priceType: p.price_type || p.priceType || "fixed",
    currency: p.currency || "₹",
    shortDescription: p.short_description || p.shortDescription || "",
    fullDescription: p.full_description || p.fullDescription || "",
    whatsappNumber: p.whatsapp_number || p.whatsappNumber || "919876543210",
    isFeatured: p.is_featured !== undefined ? p.is_featured : (p.isFeatured || false),
    images: Array.isArray(p.images) ? p.images : [],
    video: p.video_url
      ? { type: "embed", url: p.video_url, title: "Video Demonstration" }
      : (p.video || null),
    specifications: Array.isArray(p.specifications) ? p.specifications : [],
    views: p.views || 0,
    enquiries: p.enquiries || 0,
    createdAt: p.created_at ? p.created_at.split("T")[0] : (p.createdAt || "")
  };
}

export function normalizeCategory(c) {
  if (!c) return null;
  return {
    ...c,
    id: c.id,
    name: c.name,
    slug: c.slug || c.id,
    description: c.description || "",
    icon: c.icon || "Package",
    image: c.hero_image || c.image || "",
    productCount: c.product_count !== undefined ? c.product_count : (c.productCount || 0)
  };
}

export function normalizeSettings(s) {
  if (!s) return null;
  return {
    ...s,
    name: s.name || "Oranza Living & Lifestyle",
    tagline: s.tagline || "Inspiring Spaces with Curated Design",
    defaultWhatsApp: s.default_whatsapp || s.defaultWhatsApp || "919876543210",
    phoneDisplay: s.phone_display || s.phoneDisplay || "+91 98765 43210",
    email: s.email || "catalog@oranzalifestyle.com",
    address: s.address || "Plot 42, Design District, Outer Ring Road, Bengaluru, India",
    instagram: s.instagram || "https://instagram.com",
    catalogCountText: s.catalog_count_text || s.catalogCountText || "500+ Curated Products"
  };
}

// ============================================================================
// 1. AUTHENTICATION APIS
// ============================================================================
export const authAPI = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};

// ============================================================================
// 2. PRODUCTS APIS
// ============================================================================
export const productsAPI = {
  async getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.category_id) query.append("category_id", params.category_id);
    if (params.search) query.append("search", params.search);
    if (params.is_featured !== undefined) query.append("is_featured", params.is_featured);
    if (params.skip !== undefined) query.append("skip", params.skip);
    if (params.limit !== undefined) query.append("limit", params.limit);

    const url = `${API_BASE_URL}/products${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, { headers: getHeaders() });
    const data = await handleResponse(res);
    return Array.isArray(data) ? data.map(normalizeProduct) : [];
  },

  async getById(identifier) {
    const res = await fetch(`${API_BASE_URL}/products/${identifier}`, {
      headers: getHeaders()
    });
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  async create(productData) {
    // Format payload for backend
    const payload = {
      title: productData.title,
      category_id: productData.categoryId || productData.category_id,
      sku: productData.sku,
      price: productData.price ? parseFloat(productData.price) : null,
      price_type: productData.priceType || productData.price_type || "fixed",
      currency: productData.currency || "₹",
      short_description: productData.shortDescription || productData.short_description,
      full_description: productData.fullDescription || productData.full_description,
      whatsapp_number: productData.whatsappNumber || productData.whatsapp_number || "919876543210",
      is_featured: productData.isFeatured !== undefined ? productData.isFeatured : false,
      images: productData.images || [],
      video_url: productData.video?.url || productData.video_url || null,
      specifications: productData.specifications || []
    };

    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  async update(productId, productData) {
    const payload = {};
    if (productData.title) payload.title = productData.title;
    if (productData.categoryId || productData.category_id) payload.category_id = productData.categoryId || productData.category_id;
    if (productData.sku !== undefined) payload.sku = productData.sku;
    if (productData.price !== undefined) payload.price = productData.price ? parseFloat(productData.price) : null;
    if (productData.priceType || productData.price_type) payload.price_type = productData.priceType || productData.price_type;
    if (productData.currency) payload.currency = productData.currency;
    if (productData.shortDescription || productData.short_description) payload.short_description = productData.shortDescription || productData.short_description;
    if (productData.fullDescription || productData.full_description) payload.full_description = productData.fullDescription || productData.full_description;
    if (productData.whatsappNumber || productData.whatsapp_number) payload.whatsapp_number = productData.whatsappNumber || productData.whatsapp_number;
    if (productData.isFeatured !== undefined) payload.is_featured = productData.isFeatured;
    if (productData.images) payload.images = productData.images;
    if (productData.video?.url || productData.video_url) payload.video_url = productData.video?.url || productData.video_url;
    if (productData.specifications) payload.specifications = productData.specifications;

    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  async delete(productId) {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};

// ============================================================================
// 3. CATEGORIES APIS
// ============================================================================
export const categoriesAPI = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/categories`, { headers: getHeaders() });
    const data = await handleResponse(res);
    return Array.isArray(data) ? data.map(normalizeCategory) : [];
  },

  async getById(identifier) {
    const res = await fetch(`${API_BASE_URL}/categories/${identifier}`, { headers: getHeaders() });
    const data = await handleResponse(res);
    return normalizeCategory(data);
  },

  async create(catData) {
    const payload = {
      id: catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: catData.name,
      description: catData.description || "",
      icon: catData.icon || "Package",
      hero_image: catData.image || catData.hero_image || null,
      is_featured: catData.is_featured !== undefined ? catData.is_featured : true
    };
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await handleResponse(res);
    return normalizeCategory(data);
  },

  async delete(categoryId) {
    const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};

// ============================================================================
// 4. FILE & IMAGE UPLOAD API
// ============================================================================
export const uploadsAPI = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/uploads/image`, {
      method: "POST",
      headers: getHeaders(true), // multipart/form-data
      body: formData
    });
    return handleResponse(res);
  }
};

// ============================================================================
// 5. DASHBOARD ANALYTICS API
// ============================================================================
export const analyticsAPI = {
  async getDashboard() {
    const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, { headers: getHeaders() });
    return handleResponse(res);
  }
};

// ============================================================================
// 6. CONTACT & CRM LEADS APIS
// ============================================================================
export const contactAPI = {
  async submit(inquiryData) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryData)
    });
    return handleResponse(res);
  },

  async getMessages(skip = 0, limit = 50) {
    const res = await fetch(`${API_BASE_URL}/contact/messages?skip=${skip}&limit=${limit}`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  async markRead(messageId) {
    const res = await fetch(`${API_BASE_URL}/contact/messages/${messageId}/read`, {
      method: "PUT",
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};

// ============================================================================
// 7. STORE SETTINGS APIS
// ============================================================================
export const settingsAPI = {
  async get() {
    const res = await fetch(`${API_BASE_URL}/settings`, { headers: getHeaders() });
    const data = await handleResponse(res);
    return normalizeSettings(data);
  },

  async update(settingsData) {
    const payload = {};
    if (settingsData.name) payload.name = settingsData.name;
    if (settingsData.tagline) payload.tagline = settingsData.tagline;
    if (settingsData.defaultWhatsApp || settingsData.default_whatsapp) payload.default_whatsapp = settingsData.defaultWhatsApp || settingsData.default_whatsapp;
    if (settingsData.phoneDisplay || settingsData.phone_display) payload.phone_display = settingsData.phoneDisplay || settingsData.phone_display;
    if (settingsData.email) payload.email = settingsData.email;
    if (settingsData.address) payload.address = settingsData.address;
    if (settingsData.instagram) payload.instagram = settingsData.instagram;
    if (settingsData.catalogCountText || settingsData.catalog_count_text) payload.catalog_count_text = settingsData.catalogCountText || settingsData.catalog_count_text;

    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await handleResponse(res);
    return normalizeSettings(data);
  }
};

// ============================================================================
// 8. DATA EXPORT CSV APIS (BLOB DOWNLOAD)
// ============================================================================
export const exportAPI = {
  async downloadLeadsCSV() {
    const res = await fetch(`${API_BASE_URL}/contact/export/csv`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to export leads CSV");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oranza_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async downloadProductsCSV() {
    const res = await fetch(`${API_BASE_URL}/products/export/csv`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to export products CSV");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oranza_catalog_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};

// ============================================================================
// 9. WHATSAPP ENQUIRY TRACKER
// ============================================================================
export const enquiriesAPI = {
  async recordClick(productId = null) {
    const url = productId
      ? `${API_BASE_URL}/enquiries/click?product_id=${productId}`
      : `${API_BASE_URL}/enquiries/click`;
    const res = await fetch(url, { method: "POST" });
    return handleResponse(res);
  }
};
