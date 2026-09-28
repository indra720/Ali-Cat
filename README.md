# 🍊 Oranza Catalog System (React + JavaScript)

> **Pure React (Vite) + JavaScript + Tailwind CSS**  
> Digital Product Catalog & Direct WhatsApp Lead Generation System  
> Styled with the exact **Orange (`#FF6A00`) + Pure White** theme matching your Ecommerce project.

---

## 🚀 How to Run the Project

Open your terminal in this directory:

```bash
cd "d:\Ali-Eco-Cat\catlog system"
npm run dev
```

The application will run on **`http://localhost:3001`**.

---

## 🌟 Key Features

1. **🏠 Landing Page (`/`):**
   - Hero banner with "Explore Catalog" and WhatsApp quick contact.
   - Interactive category cards with product count indicators.
   - Featured catalog highlights with price and video badges.
   - Direct sales inquiry banner.

2. **📱 Public Catalog (`/catalog`):**
   - Category filtering (All, Furniture, Lighting, Electronics, Decor).
   - Live search by product name, SKU, or technical specification.
   - Filter by "With Video Demo" only.
   - Sort by Most Inquired, Price (Low/High), or Newest.

3. **🖼️ Product Details Page (`/products/:slug`):**
   - Multi-photo gallery with thumbnail switcher.
   - **HD Product Video Walkthrough** (YouTube/Vimeo embed or MP4 support).
   - **Technical Specifications Sheet** (Material, Color, Dimensions, Warranty, etc.).
   - **Direct WhatsApp Inquiry Button**:
     Generates an auto-formatted message with product name, SKU, price, and catalog URL directly to the seller's WhatsApp number.
   - Related products from the same category.

4. **📊 Seller Dashboard (`/dashboard`):**
   - Live metrics: Total Products, Categories, Video Walkthroughs, and WhatsApp Leads.
   - Full inventory management table with live preview and delete options.
   - **Add Product Form (`/dashboard/products/new`)**:
     - Product Name & SKU
     - Category selection
     - Price or "Price on Request"
     - Multi-image URL gallery
     - **Product Video URL and title**
     - **Dynamic Technical Specifications Table** (Add unlimited key-value rows)
     - Custom WhatsApp number configuration
   - **Category Manager (`/dashboard/categories`)**:
     - Create and delete categories with custom cover photos.

5. **🔐 Authentication (`/login`, `/register`):**
   - Seller / Company admin login with 1-Click Instant Demo Login shortcut.

---

## 🎨 Theme Colors (Consistent with Ecommerce)

- **Primary Orange:** `#FF6A00`
- **Orange Hover / Dark:** `#E85D00`
- **Light Orange Accent:** `#FFF3E8`
- **Surface / Background:** `#FFFFFF` & `#F8F9FA`
- **WhatsApp Action:** `#25D366`
