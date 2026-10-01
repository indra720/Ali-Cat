"""
Seed full demo catalog products & categories into SQLite database (catalog.db)
"""
from database import SessionLocal
import models

def seed():
    db = SessionLocal()
    try:
        # 1. Categories
        categories = [
            {
                "id": "furniture",
                "name": "Furniture",
                "slug": "furniture",
                "description": "Premium living room, office, and dining furniture handcrafted for comfort.",
                "icon": "Armchair",
                "hero_image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
                "is_featured": True
            },
            {
                "id": "lighting",
                "name": "Lighting & Lamps",
                "slug": "lighting",
                "description": "Modern architectural chandeliers, warm ambient floor lamps, and pendants.",
                "icon": "Lamp",
                "hero_image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
                "is_featured": True
            },
            {
                "id": "electronics",
                "name": "Electronics & Tech",
                "slug": "electronics",
                "description": "State-of-the-art office displays, smart gadgets, and productivity tech.",
                "icon": "Tv",
                "hero_image": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
                "is_featured": True
            },
            {
                "id": "decor",
                "name": "Home Decor",
                "slug": "decor",
                "description": "Artistic ceramic vases, wall panels, and bespoke interior accessories.",
                "icon": "Sparkles",
                "hero_image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
                "is_featured": True
            }
        ]

        for cat in categories:
            existing = db.query(models.Category).filter(models.Category.id == cat["id"]).first()
            if not existing:
                db.add(models.Category(**cat))
            else:
                existing.name = cat["name"]
                existing.description = cat["description"]
                existing.hero_image = cat["hero_image"]
        db.commit()

        # 2. Products
        products = [
            {
                "title": "Modern Velvet 3-Seater Sofa",
                "slug": "modern-velvet-3-seater-sofa",
                "sku": "SOFA-MOD-001",
                "category_id": "furniture",
                "price": 25000.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": True,
                "whatsapp_number": "919876543210",
                "short_description": "Ultra-comfortable high-density foam cushioning with stain-resistant velvet fabric.",
                "full_description": "Designed for modern living spaces, the Modern Velvet 3-Seater Sofa combines sophisticated aesthetics with everyday endurance. Built with a solid kiln-dried hardwood frame and reinforced joints, this sofa ensures decades of stability.",
                "images": [
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Seating Capacity", "value": "3 Seater"},
                    {"key": "Upholstery Material", "value": "Premium Grade Velvet (350 GSM)"},
                    {"key": "Frame Material", "value": "Solid Treated Sal Wood"},
                    {"key": "Dimensions", "value": "84\" L x 36\" D x 32\" H"}
                ],
                "views": 412,
                "enquiries": 58
            },
            {
                "title": "Luxury Cognac Leather Chesterfield",
                "slug": "luxury-cognac-leather-chesterfield",
                "sku": "SOFA-LUX-002",
                "category_id": "furniture",
                "price": 48000.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": True,
                "whatsapp_number": "919876543210",
                "short_description": "Iconic deep button-tufted genuine top-grain Italian leather couch.",
                "full_description": "A statement centerpiece for luxury residences and executive offices. Handcrafted by master artisans with individual button-tufting, rolled arms, and antiqued brass nailhead trim.",
                "images": [
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Leather Type", "value": "100% Genuine Top-Grain Italian Leather"},
                    {"key": "Cushioning", "value": "High-Resiliency Memory Foam"},
                    {"key": "Leg Finish", "value": "Hand-turned solid oak with brass casters"}
                ],
                "views": 380,
                "enquiries": 42
            },
            {
                "title": "Minimalist Nordic Dining Table Set",
                "slug": "minimalist-nordic-dining-table-set",
                "sku": "DIN-SET-003",
                "category_id": "furniture",
                "price": 32000.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": False,
                "whatsapp_number": "919876543210",
                "short_description": "Solid natural white oak 6-seater dining table with ergonomically curved chairs.",
                "full_description": "Embodying Scandinavian simplicity, this dining collection showcases the warmth and natural grain patterns of certified European white oak.",
                "images": [
                    "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Capacity", "value": "6 Seater Dining"},
                    {"key": "Tabletop Finish", "value": "Matte Polyurethane protective coat"}
                ],
                "views": 290,
                "enquiries": 31
            },
            {
                "title": "Ergonomic Mesh Task Chair",
                "slug": "ergonomic-mesh-task-chair",
                "sku": "CHR-ERG-004",
                "category_id": "furniture",
                "price": 14500.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": False,
                "whatsapp_number": "919876543210",
                "short_description": "Breathable 4D adjustable armrest office chair with dynamic lumbar response.",
                "full_description": "Engineered for 10+ hour workdays, this task chair provides continuous spinal alignment with synchronized tilting mechanisms.",
                "images": [
                    "https://images.unsplash.com/photo-1580481077195-c26620573e04?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Base Material", "value": "Aviation-grade Die-cast Aluminum alloy"},
                    {"key": "Gas Lift", "value": "Class-4 BIFMA Certified Pneumatic Cylinder"}
                ],
                "views": 610,
                "enquiries": 89
            },
            {
                "title": "Nordic Ambient Arc Floor Lamp",
                "slug": "nordic-ambient-arc-floor-lamp",
                "sku": "LMP-ARC-005",
                "category_id": "lighting",
                "price": 8500.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": True,
                "whatsapp_number": "919876543210",
                "short_description": "Brushed brass arched floor lamp with weighted marble base and dimmable warm LED.",
                "full_description": "An architectural lighting sculpture that bridges form and illumination effortlessly. The sweeping cantilever arc allows overhead lighting without ceiling wiring.",
                "images": [
                    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Light Source", "value": "Integrated Tri-Color Dimmable LED (55W)"},
                    {"key": "Color Temperature", "value": "3000K / 4000K / 6500K Adjustable"}
                ],
                "views": 520,
                "enquiries": 73
            },
            {
                "title": "34\" Curved UltraWide Studio Display",
                "slug": "34-curved-ultrawide-studio-display",
                "sku": "ELC-DSP-006",
                "category_id": "electronics",
                "price": 38000.0,
                "price_type": "fixed",
                "currency": "₹",
                "is_featured": False,
                "whatsapp_number": "919876543210",
                "short_description": "WQHD 3440x1440 IPS panel, 98% DCI-P3 color accuracy, and 90W USB-C PD.",
                "full_description": "The ultimate productivity canvas for designers, financial analysts, and programmers. Connect your laptop with a single USB-C cable for display, 90W charging, and data transfer simultaneously.",
                "images": [
                    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1585792180666-f7547c6a6c7c?auto=format&fit=crop&w=1200&q=80"
                ],
                "video_url": "https://www.youtube.com/embed/ScMzIvxBSi4",
                "specifications": [
                    {"key": "Screen Size", "value": "34 Inch 1900R Curved"},
                    {"key": "Resolution", "value": "3440 x 1440 (UltraWide QHD)"},
                    {"key": "Refresh Rate", "value": "144 Hz with FreeSync Premium"}
                ],
                "views": 450,
                "enquiries": 66
            }
        ]

        for p_data in products:
            existing_p = db.query(models.Product).filter(models.Product.slug == p_data["slug"]).first()
            if not existing_p:
                db.add(models.Product(**p_data))
        db.commit()
        print("[SUCCESS] All 4 categories and 6 products seeded in SQLite database!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
