# 🍊 Oranza Catalog System — Project Specification & Architecture Blueprint

> **A High-Performance Digital Product Showcase & WhatsApp Lead Generation Platform**  
> Designed with the signature **Oranza Orange & White** theme to seamlessly complement your existing E-Commerce ecosystem.

---

## 1. Executive Summary & Vision

The **Catalog System** is an independent, specialized digital product catalog application. Unlike a traditional e-commerce store with shopping carts, checkout gateways, and shipping logistics, the Catalog System is built for **high-impact product discovery, rich multimedia presentation, and direct seller-to-buyer WhatsApp lead conversion**.

### Core Value Proposition
- **Showcase Over Transactions:** Display products in high fidelity with multi-angle image galleries, product video demonstrations, and structured technical specifications.
- **Instant WhatsApp Communication:** Eliminate checkout friction. Interested buyers initiate 1-click WhatsApp conversations with pre-filled product details.
- **Clean Seller / Admin Portal:** Companies and sellers can effortlessly add, update, organize, and publish products and categories.
- **Consistent Brand Identity:** Inherits the vibrant **Orange (`#FF6A00`) + Pure White (`#FFFFFF`)** styling of your primary e-commerce project.

---

## 2. E-Commerce vs. Catalog System: Comparison Matrix

| Feature | 🛒 Traditional E-Commerce (`Ecommerce/`) | 📱 Catalog System (`catlog system/`) |
| :--- | :--- | :--- |
| **Primary Goal** | Direct online purchase & automated transaction | Product demonstration & high-intent lead generation |
| **Cart & Bag** | ✅ Yes (Add to cart, quantity, promo codes) | ❌ No (Eliminates friction; direct interest action) |
| **Checkout Flow** | ✅ Yes (Multi-step billing, shipping, order confirmation) | ❌ No (Replaced by direct WhatsApp inquiry) |
| **Payment Gateway** | ✅ Yes (Stripe, Razorpay, COD, Cards) | ❌ No (Deals finalized directly with seller via chat) |
| **Product Media** | Standard thumbnails & static images | **Rich Media**: Multi-angle zoom gallery + **Video Player** |
| **Specifications** | Generic bullet points | **Structured Key-Value Spec Sheet** (Dimensions, Material, etc.) |
| **Ideal For** | Retail FMCG, apparel, fast-moving items | High-ticket items, furniture, machinery, custom goods, B2B |

---

## 3. User Journey & Architectural Flow

```
[Public Customer Experience]
Company Landing Page
       ↓
Product Catalog (Category Filter & Search)
       ↓
Product Details Page (Images + Video + Specs)
       ↓
WhatsApp Direct Enquiry ("Hi, I am interested in Modern Sofa...")

[Seller / Company Admin Experience]
Register / Login
       ↓
Seller Dashboard (Products, Categories, Inquiries)
       ↓
Add / Edit Product (Images, Video URL, Dynamic Specs, Price)
       ↓
Publish to Live Catalog
```

---

## 4. Design System & Theme Consistency (Orange + White)

The Catalog System directly matches the visual identity of your `Ecommerce` project defined in `tailwind.config.ts` and `globals.css`:

### Color Palette Tokens
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `oranza-DEFAULT` / `brand-orange` | `#FF6A00` | Primary buttons, active tabs, brand accents, badges |
| `oranza-600` / `brand-orange-dark`| `#E85D00` | Hover states, active pressed states |
| `oranza-50` / `brand-orange-light`| `#FFF3E8` | Light pill backgrounds, tag badges, card glow |
| `surface-DEFAULT` | `#FFFFFF` | Main background, modal cards, clean surfaces |
| `surface-secondary` | `#F8F9FA` | Page background, category chips, spec table striping |
| `ink-DEFAULT` | `#111827` | Headings, titles, high-contrast readable text |
| `ink-secondary` | `#4B5563` | Subtitles, product descriptions, breadcrumbs |
| `border` | `#E5E5E5` | Subtle dividers, card borders |
| `whatsapp-green` | `#25D366` | WhatsApp CTA buttons, enquiry status badges |

---

## 5. Main Functional Modules

### Module 1: 🏠 Public Landing Page
- **Header & Navigation:** Company logo, Navigation links (Home, Catalog, Categories, About, Contact), and quick "Seller Dashboard" access button.
- **Hero Section:** High-impact banner with taglines (e.g., *"Explore Our Premium Catalog"*), search bar, and primary *"Browse Catalog"* CTA.
- **Category Carousel / Strip:** Visual circle or card-based category shortcuts (e.g., Furniture, Electronics, Lighting, Decor).
- **Featured & Trending Showcase:** Grid of top curated products with high-resolution imagery and direct "Quick View" or "View Details" buttons.
- **Why Choose Us / Trust Badges:** Quality guarantee, direct manufacturer pricing, fast custom quotation, dedicated support.
- **Footer:** Brand info, category links, direct contact details, WhatsApp quick link.

### Module 2: 🔐 Authentication (Seller & Admin)
- **Login Screen:** Email/password credentials for seller/company owner.
- **Register Screen:** New seller registration (Company Name, Email, Phone/WhatsApp number, Password).
- **Session Management:** Secure JWT or cookie-based session with protected routes (`/dashboard/*`).
- **Profile / Company Branding:** Setting up company logo, address, and default WhatsApp inquiry number.

### Module 3: 📊 Seller / Admin Dashboard
- **Analytics Overview:**
  - Total Products active in catalog.
  - Total Categories.
  - Total WhatsApp Enquiry Clicks tracked.
- **Quick Action Bar:** `+ Add New Product`, `+ Add Category`, `View Live Catalog`.
- **Product Management Table:**
  - Image thumbnail, Product title, Category, Price / "Price on Request", WhatsApp clicks, Actions (Edit, Delete, Duplicate, Preview).
- **Category Manager:**
  - Create, reorder, and assign icons/images to product categories.

### Module 4: ➕ Product Creation & Edit Engine
The product management form is specially tailored for catalog richness:
1. **Basic Info:**
   - Product Name (e.g., *Modern Velvet 3-Seater Sofa*)
   - SKU / Model Code (e.g., *SOFA-MOD-001*)
   - Category (Select dropdown or create inline)
   - Price Display Mode:
     - Fixed Price (e.g., *₹25,000*)
     - Price Range (e.g., *₹25,000 - ₹32,000*)
     - "Price on Request" / "Wholesale Pricing"
2. **Media Assets:**
   - **Image Gallery:** Multi-image upload or URL input with drag-to-reorder primary thumbnail.
   - **Product Video:** Support for **Direct Video Upload (MP4/WebM)** or **YouTube / Vimeo embed link**.
3. **Structured Technical Specifications (Dynamic Key-Value Builder):**
   - Sellers can add unlimited custom specifications:
     - `Material`: Premium Velvet Fabric
     - `Color`: Warm Terracotta / Orange
     - `Dimensions`: 84" W x 36" D x 34" H
     - `Warranty`: 5 Years Manufacturer
     - `Origin`: Handcrafted in India
4. **WhatsApp Contact Config:**
   - Override default company number with a product-specific sales executive number if desired.

### Module 5: 📱 Clean Public Catalog Page
- **Category Filter Tabs / Sidebar:** Easily switch between All, Furniture, Electronics, Lighting, etc.
- **Live Search & Sort:** Search by product name, SKU, or specification keyword.
- **Clean Responsive Grid:** Cards designed with large visual aspect ratios, hover zooms, category tags, and "View Product" button.
- **No Cart Clutter:** Direct access to detailed product pages without add-to-cart distractions.

### Module 6: 🖼️ Product Details Page with WhatsApp Conversion Engine
This is the core highlight of the project:
1. **Back Navigation & Breadcrumbs:** Quick return to category or catalog view.
2. **Interactive Media Section:**
   - **Image Gallery:** Large primary view with thumbnail selector and click-to-zoom.
   - **Video Demonstration Player:** Dedicated "Watch Product Video" tab or embedded player to showcase the product in motion.
3. **Product Information:**
   - Title, Category badge, SKU code, and Price / RFQ badge.
   - Full formatted description.
4. **Structured Specifications Table:** Clean striped table displaying technical specs.
5. **Sticky WhatsApp Enquiry CTA:**
   - Prominent WhatsApp Green button with WhatsApp icon.
   - Generates an automated, pre-formatted message sent directly to the seller:
     ```
     Hi [Company Name]! 
     I saw your product on the catalog and I am interested:
     
     *Product:* Modern Velvet 3-Seater Sofa
     *SKU:* SOFA-MOD-001
     *Price:* ₹25,000
     *Catalog Link:* https://yoursite.com/products/modern-sofa
     
     Could you please provide availability and quotation?
     ```
6. **Continuous Discovery / Next Products:** Bottom carousel featuring "Related Products" from the same category.

---

## 6. Data Architecture & TypeScript Interfaces

```typescript
export interface SpecificationItem {
  id: string;
  key: string;       // e.g., "Material", "Color", "Dimensions"
  value: string;     // e.g., "Solid Teak Wood", "Honey Oak", "6x4 ft"
}

export interface ProductVideo {
  type: 'embed' | 'direct'; // 'embed' (YouTube/Vimeo) or 'direct' (MP4 file)
  url: string;
  thumbnailUrl?: string;
}

export interface CatalogProduct {
  id: string;
  title: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  priceType: 'fixed' | 'range' | 'on_request';
  price?: number;
  priceMax?: number;
  currency: string;          // e.g., "INR" (₹)
  images: string[];          // Array of image URLs
  primaryImage: string;
  video?: ProductVideo;
  specifications: SpecificationItem[];
  whatsAppNumber: string;    // Seller WhatsApp number (with country code, e.g. "919876543210")
  isFeatured: boolean;
  isActive: boolean;
  enquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  iconName?: string;
  productCount: number;
}
```

---

## 7. Recommended Technology Stack

Using **Next.js 14 (App Router) + TypeScript + Tailwind CSS** (Same as `Ecommerce/`):
- **Framework:** `next` (v14.x)
- **Language:** `typescript` (v5.x)
- **Styling:** `tailwindcss` (v3.4.x) + `tailwind-merge` + `clsx`
- **Icons:** `lucide-react`
- **Forms & Validation:** `react-hook-form` + `zod`
- **Animation & Transitions:** Tailwind transitions / micro-interactions

---

## 8. Target Directory Structure for `catlog system/`

```
catlog system/
├── package.json
├── tsconfig.json
├── tailwind.config.ts        (Matching Oranza Orange palette)
├── postcss.config.mjs
├── next.config.mjs
├── public/
│   ├── images/
│   └── icons/
└── src/
    ├── app/
    │   ├── globals.css        (Same Oranza CSS variables & animations)
    │   ├── layout.tsx         (Root layout with Header & Footer)
    │   ├── page.tsx           (🏠 Landing Page)
    │   ├── catalog/
    │   │   └── page.tsx       (📱 Public Catalog & Filter View)
    │   ├── category/
    │   │   └── [slug]/
    │   │       └── page.tsx   (Category-filtered product view)
    │   ├── products/
    │   │   └── [slug]/
    │   │       └── page.tsx   (🖼️ Product Detail: Gallery + Video + Specs + WhatsApp CTA)
    │   ├── login/
    │   │   └── page.tsx       (🔐 Seller Login)
    │   ├── register/
    │   │   └── page.tsx       (🔐 Seller Registration)
    │   ├── dashboard/
    │   │   ├── layout.tsx     (Dashboard layout with sidebar)
    │   │   ├── page.tsx       (📊 Analytics & Product overview)
    │   │   ├── products/
    │   │   │   ├── page.tsx   (Product list & management table)
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx (➕ Add product with video & specs)
    │   │   │   └── [id]/
    │   │   │       └── page.tsx (Edit product)
    │   │   ├── categories/
    │   │   │   └── page.tsx   (Category management)
    │   │   └── settings/
    │   │       └── page.tsx   (Seller profile & WhatsApp config)
    ├── components/
    │   ├── common/
    │   │   ├── Header.tsx     (Branded Orange & White navigation)
    │   │   ├── Footer.tsx
    │   │   └── WhatsAppButton.tsx (Smart WhatsApp link generator)
    │   ├── home/
    │   │   ├── HeroSection.tsx
    │   │   ├── CategoryStrip.tsx
    │   │   └── FeaturedGrid.tsx
    │   ├── catalog/
    │   │   ├── ProductCard.tsx
    │   │   └── FilterBar.tsx
    │   ├── product/
    │   │   ├── ImageGallery.tsx
    │   │   ├── VideoPlayer.tsx (Embedded / HTML5 video player)
    │   │   └── SpecsTable.tsx
    │   └── dashboard/
    │       ├── DashboardSidebar.tsx
    │       ├── ProductForm.tsx (Dynamic spec builder & video selector)
    │       └── StatsCards.tsx
    ├── context/
    │   └── CatalogContext.tsx (Product state management & local persistence)
    ├── data/
    │   └── initialCatalog.ts  (Rich mock furniture/electronics products with videos & specs)
    ├── types/
    │   └── index.ts
    └── utils/
        ├── cn.ts
        └── whatsapp.ts        (WhatsApp message encoder & URL builder)
```
