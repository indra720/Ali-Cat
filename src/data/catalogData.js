export const initialCategories = [
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Premium living room, office, and dining furniture handcrafted for comfort.",
    icon: "Armchair",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    productCount: 5,
  },
  {
    id: "lighting",
    name: "Lighting & Lamps",
    slug: "lighting",
    description: "Modern architectural chandeliers, warm ambient floor lamps, and pendants.",
    icon: "Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    productCount: 2,
  },
  {
    id: "electronics",
    name: "Electronics & Tech",
    slug: "electronics",
    description: "State-of-the-art office displays, smart gadgets, and productivity tech.",
    icon: "Tv",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
    productCount: 2,
  },
  {
    id: "decor",
    name: "Home Decor",
    slug: "decor",
    description: "Artistic ceramic vases, wall panels, and bespoke interior accessories.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    title: "Modern Velvet 3-Seater Sofa",
    slug: "modern-velvet-3-seater-sofa",
    sku: "SOFA-MOD-001",
    categoryId: "furniture",
    categoryName: "Furniture",
    shortDescription: "Ultra-comfortable high-density foam cushioning with stain-resistant velvet fabric.",
    fullDescription: "Designed for modern living spaces, the Modern Velvet 3-Seater Sofa combines sophisticated aesthetics with everyday endurance. Built with a solid kiln-dried hardwood frame and reinforced joints, this sofa ensures decades of stability. The plush cushioning utilizes pocketed inner springs layered with high-resiliency foam for the perfect balance of cloud-like softness and ergonomic posture support.",
    priceType: "fixed",
    price: 25000,
    currency: "₹",
    isFeatured: true,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80",
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4", // demo high-res video embed
      title: "Product Showcase & Comfort Test Video"
    },
    specifications: [
      { id: "s1", key: "Seating Capacity", value: "3 Seater" },
      { id: "s2", key: "Upholstery Material", value: "Premium Grade Velvet (350 GSM)" },
      { id: "s3", key: "Frame Material", value: "Solid Treated Sal Wood" },
      { id: "s4", key: "Color", value: "Rich Forest Green / Mustard Orange" },
      { id: "s5", key: "Dimensions", value: "84\" Length x 36\" Depth x 32\" Height" },
      { id: "s6", key: "Warranty", value: "5 Years Frame & Foam Warranty" },
      { id: "s7", key: "Care Instructions", value: "Spot clean with damp cloth, avoid harsh chemical cleaners" }
    ],
    views: 412,
    enquiries: 58,
    createdAt: "2026-09-01"
  },
  {
    id: "prod-2",
    title: "Luxury Cognac Leather Chesterfield",
    slug: "luxury-cognac-leather-chesterfield",
    sku: "SOFA-LUX-002",
    categoryId: "furniture",
    categoryName: "Furniture",
    shortDescription: "Iconic deep button-tufted genuine top-grain Italian leather couch.",
    fullDescription: "A statement centerpiece for luxury residences and executive offices. Handcrafted by master artisans with individual button-tufting, rolled arms, and antiqued brass nailhead trim. The leather develops a rich, distinctive patina over the years, making each piece uniquely timeless.",
    priceType: "fixed",
    price: 48000,
    currency: "₹",
    isFeatured: true,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Leather Texture & Craftsmanship Video"
    },
    specifications: [
      { id: "s1", key: "Style", value: "Traditional Chesterfield" },
      { id: "s2", key: "Upholstery", value: "100% Genuine Top-Grain Cognac Leather" },
      { id: "s3", key: "Suspension", value: "8-Way Hand-Tied Coil Spring System" },
      { id: "s4", key: "Dimensions", value: "90\" L x 38\" D x 31\" H" },
      { id: "s5", key: "Leg Finish", value: "Turned Walnut Legs with Brass Casters" },
      { id: "s6", key: "Warranty", value: "10 Years Structural Warranty" }
    ],
    views: 680,
    enquiries: 94,
    createdAt: "2026-09-05"
  },
  {
    id: "prod-3",
    title: "Ergonomic Pro Mesh Executive Chair",
    slug: "ergonomic-pro-mesh-executive-chair",
    sku: "CHAIR-ERG-003",
    categoryId: "furniture",
    categoryName: "Furniture",
    shortDescription: "3D lumbar support, breathable Korean mesh, and 4D adjustable armrests.",
    fullDescription: "Engineered specifically for long 8+ hour work days. The dynamic lumbar self-adjusting mechanism responds continuously to your spinal curve. Certified with BIFMA Class-4 gas lift and silent PU wheels that protect wooden floors.",
    priceType: "fixed",
    price: 13500,
    currency: "₹",
    isFeatured: true,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&q=80"
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Ergonomic Adjustability Walkthrough"
    },
    specifications: [
      { id: "s1", key: "Max Weight Capacity", value: "150 kg" },
      { id: "s2", key: "Mechanism", value: "Multi-lock Syncro-Tilt with 135° Recline" },
      { id: "s3", key: "Gas Lift", value: "Class 4 Certified Heavy Duty" },
      { id: "s4", key: "Mesh", value: "High-Tension Breathable Korean Mesh" },
      { id: "s5", key: "Warranty", value: "3 Years Comprehensive Warranty" }
    ],
    views: 310,
    enquiries: 42,
    createdAt: "2026-09-10"
  },
  {
    id: "prod-4",
    title: "Nordic Solid Oak 6-Seater Dining Table",
    slug: "nordic-solid-oak-dining-table",
    sku: "TBL-NOR-004",
    categoryId: "furniture",
    categoryName: "Furniture",
    shortDescription: "Clean Scandinavian minimalist silhouette crafted from solid white oak.",
    fullDescription: "Celebrate family gatherings around this masterfully finished Nordic dining table. Sealed with a matte organic oil finish that protects against wine and food spills while maintaining the raw tactile warmth of natural wood grain.",
    priceType: "fixed",
    price: 32000,
    currency: "₹",
    isFeatured: false,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80"
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Wood Grain Detail & Setup Video"
    },
    specifications: [
      { id: "s1", key: "Tabletop Material", value: "100% Solid European White Oak (1.5\" Thick)" },
      { id: "s2", key: "Dimensions", value: "72\" L x 36\" W x 30\" H" },
      { id: "s3", key: "Seating", value: "Comfortable 6-8 Seater" },
      { id: "s4", key: "Finish", value: "Matte Organic Polyurethane Sealant" }
    ],
    views: 290,
    enquiries: 31,
    createdAt: "2026-09-12"
  },
  {
    id: "prod-5",
    title: "Aura Geometric Pendant Chandelier",
    slug: "aura-geometric-pendant-chandelier",
    sku: "LGT-AUR-005",
    categoryId: "lighting",
    categoryName: "Lighting & Lamps",
    shortDescription: "Brushed gold architectural chandelier with dimmable warm ambient LED rings.",
    fullDescription: "A striking art installation as much as a luminaire. The Aura Chandelier features interlaced brass hoops fitted with high-CRI diffusion strips that eliminate glare while casting flattering 3000K warm light across the room.",
    priceType: "fixed",
    price: 14500,
    currency: "₹",
    isFeatured: true,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Lighting Atmosphere & Dimming Demo"
    },
    specifications: [
      { id: "s1", key: "Light Source", value: "Integrated Tri-Color Dimmable LED (55W)" },
      { id: "s2", key: "Color Temperature", value: "3000K / 4000K / 6500K Adjustable" },
      { id: "s3", key: "Body Material", value: "Electroplated Aviation-Grade Aluminum" },
      { id: "s4", key: "Drop Height", value: "Adjustable cable up to 5 feet" }
    ],
    views: 520,
    enquiries: 73,
    createdAt: "2026-09-15"
  },
  {
    id: "prod-6",
    title: "34\" Curved UltraWide Studio Display",
    slug: "34-curved-ultrawide-studio-display",
    sku: "ELC-DSP-006",
    categoryId: "electronics",
    categoryName: "Electronics & Tech",
    shortDescription: "WQHD 3440x1440 IPS panel, 98% DCI-P3 color accuracy, and 90W USB-C PD.",
    fullDescription: "The ultimate productivity canvas for designers, financial analysts, and programmers. Connect your laptop with a single USB-C cable for high-res display output, 90W laptop charging, and high-speed data transfer simultaneously.",
    priceType: "on_request",
    price: null,
    currency: "₹",
    isFeatured: false,
    whatsappNumber: "919876543210",
    images: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585792180666-f7547c6a6c7c?auto=format&fit=crop&w=1200&q=80"
    ],
    video: {
      type: "embed",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Color Fidelity & Port Demonstration"
    },
    specifications: [
      { id: "s1", key: "Screen Size & Curvature", value: "34 Inch 1900R Curved" },
      { id: "s2", key: "Resolution", value: "3440 x 1440 (UltraWide QHD)" },
      { id: "s3", key: "Refresh Rate", value: "144 Hz with FreeSync Premium" },
      { id: "s4", key: "Connectivity", value: "1x USB-C (90W), 2x HDMI 2.1, 1x DP 1.4, 4x USB 3.0" }
    ],
    views: 450,
    enquiries: 66,
    createdAt: "2026-09-18"
  }
];

export const companyConfig = {
  name: "Oranza Living & Lifestyle",
  tagline: "Inspiring Spaces with Curated Design",
  defaultWhatsApp: "919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "catalog@oranzalifestyle.com",
  address: "Plot 42, Design District, Outer Ring Road, Bengaluru, India",
  instagram: "https://instagram.com",
  catalogCountText: "500+ Curated Products"
};
