"""
=============================================================================
SQL DATABASE MODELS / TABLES (models.py)
=============================================================================
Ye file hamari SQL Tables define karti hai:
- User (Authentication, Roles: Admin/Seller/Customer)
- Category (Product categorization)
- Product (Products, Images, Specs, Seller relationship)
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# ---------------------------------------------------------------------------
# 1. User SQL Table (Authentication & Roles)
# ---------------------------------------------------------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False) # Hashed bcrypt string (NEVER plain password!)
    full_name = Column(String, nullable=False)
    role = Column(String, default="seller")          # "admin", "seller", "customer"
    phone = Column(String, nullable=True)
    store_name = Column(String, nullable=True)       # For sellers: e.g. "Apex Retail"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # 1 User/Seller can manage multiple products
    products = relationship("Product", back_populates="seller")


# ---------------------------------------------------------------------------
# 2. Category SQL Table
# ---------------------------------------------------------------------------
class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True) # e.g. "furniture", "electronics"
    name = Column(String, nullable=False)             # e.g. "Furniture & Decor"
    slug = Column(String, unique=True, index=True)    # e.g. "furniture-and-decor"
    description = Column(Text, nullable=True)
    icon = Column(String, nullable=True)              # e.g. "Armchair"
    hero_image = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # 1 Category has multiple Products
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# 3. Product SQL Table
# ---------------------------------------------------------------------------
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, index=True)
    sku = Column(String, unique=True, index=True)
    price = Column(Float, default=0.0)
    price_type = Column(String, default="fixed")      # "fixed" ya "on_request"
    currency = Column(String, default="₹")
    short_description = Column(Text, nullable=True)
    full_description = Column(Text, nullable=True)
    whatsapp_number = Column(String, default="+919876543210")
    video_url = Column(String, nullable=True)
    video_title = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    views = Column(Integer, default=1)
    enquiries = Column(Integer, default=0)            # WhatsApp click count
    created_at = Column(DateTime, default=datetime.utcnow)

    # Multi-Image Gallery & Specifications (JSON array)
    images = Column(JSON, default=list)               # e.g. ["https://...1", "https://...2"]
    specifications = Column(JSON, default=list)       # e.g. [{"key": "Color", "value": "Teak"}]

    # Foreign Keys
    category_id = Column(String, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
    category = relationship("Category", back_populates="products")

    seller_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    seller = relationship("User", back_populates="products")


# ---------------------------------------------------------------------------
# 4. Contact Message SQL Table (Customer Inquiries & Leads)
# ---------------------------------------------------------------------------
class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    category = Column(String, default="General Inquiry")
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class StoreSettings(Base):
    """
    Store / Company Settings Table (Singleton Row id=1)
    Store ka global configuration (WhatsApp number, name, showroom address, email, etc.)
    """
    __tablename__ = "store_settings"

    id = Column(Integer, primary_key=True, default=1)
    name = Column(String, default="Oranza Living & Lifestyle")
    tagline = Column(String, default="Inspiring Spaces with Curated Design")
    default_whatsapp = Column(String, default="919876543210")
    phone_display = Column(String, default="+91 98765 43210")
    email = Column(String, default="catalog@oranzalifestyle.com")
    address = Column(String, default="Plot 42, Design District, Outer Ring Road, Bengaluru, India")
    instagram = Column(String, default="https://instagram.com")
    catalog_count_text = Column(String, default="500+ Curated Products")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


