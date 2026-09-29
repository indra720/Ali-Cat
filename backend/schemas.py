"""
=============================================================================
PYDANTIC SCHEMAS (schemas.py)
=============================================================================
Model vs Schema ka difference:
- models.py: SQL Database Tables ke liye (Data kahan aur kaise store hoga).
- schemas.py: API Request aur Response ke liye (Frontend kya bhejega aur Backend kya return karega).
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# ---------------------------------------------------------------------------
# Specification Sub-schema
# ---------------------------------------------------------------------------
class SpecItem(BaseModel):
    key: str
    value: str

# ---------------------------------------------------------------------------
# USER & AUTH SCHEMAS
# ---------------------------------------------------------------------------
class UserBase(BaseModel):
    email: str = Field(..., description="User email address")
    full_name: str = Field(..., min_length=2, max_length=100)
    role: str = Field(default="seller", description="'admin', 'seller', or 'customer'")
    phone: Optional[str] = None
    store_name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, description="Plain text password (will be hashed with bcrypt)")

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ---------------------------------------------------------------------------
# CATEGORY SCHEMAS
# ---------------------------------------------------------------------------
class CategoryBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    icon: Optional[str] = "Layers"
    hero_image: Optional[str] = None
    is_featured: bool = False

class CategoryCreate(CategoryBase):
    id: str = Field(..., min_length=2, max_length=50, description="e.g. 'furniture', 'electronics'")

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    hero_image: Optional[str] = None
    is_featured: Optional[bool] = None

class CategoryResponse(CategoryBase):
    id: str
    slug: str
    created_at: datetime
    product_count: Optional[int] = 0

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# PRODUCT SCHEMAS
# ---------------------------------------------------------------------------
class ProductBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    category_id: str
    sku: str = Field(..., min_length=2, max_length=50)
    price: float = Field(default=0.0, ge=0)
    price_type: str = Field(default="fixed", description="'fixed' ya 'on_request'")
    currency: str = "₹"
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    whatsapp_number: str = "+919876543210"
    video_url: Optional[str] = None
    video_title: Optional[str] = None
    is_featured: bool = False
    images: List[str] = []
    specifications: List[SpecItem] = []

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    category_id: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None
    price_type: Optional[str] = None
    currency: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    whatsapp_number: Optional[str] = None
    video_url: Optional[str] = None
    video_title: Optional[str] = None
    is_featured: Optional[bool] = None
    images: Optional[List[str]] = None
    specifications: Optional[List[SpecItem]] = None

class ProductResponse(ProductBase):
    id: int
    slug: str
    views: int
    enquiries: int
    created_at: datetime
    seller_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)
