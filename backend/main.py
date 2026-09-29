"""
=============================================================================
ALI-CATALOG BACKEND - PHASE 3: AUTHENTICATION & SECURITY
=============================================================================
FastAPI + SQLAlchemy + JWT Authentication + bcrypt Password Hashing
"""

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

# Local imports
import models
import schemas
import crud
import auth
from database import engine, get_db

# ---------------------------------------------------------------------------
# 1. Automatic Database Table Creation
# ---------------------------------------------------------------------------
# Ye line users, categories, products saari SQL tables create karegi
models.Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------------------------
# 2. FastAPI App Setup
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Ali-Eco Catalog System API",
    description="Full-stack Backend with JWT Authentication, bcrypt, and Role-Based Access Control",
    version="3.0.0"
)

# ---------------------------------------------------------------------------
# 3. CORS Middleware
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# 4. Startup Seeder (Default Admin & Seller Users + Demo Data)
# ---------------------------------------------------------------------------
@app.on_event("startup")
def seed_initial_data():
    from database import SessionLocal
    db = SessionLocal()
    try:
        # 1. Seed Demo Admin & Seller
        admin_user = crud.get_user_by_email(db, "admin@oranza.com")
        if not admin_user:
            crud.create_user(db, schemas.UserCreate(
                email="admin@oranza.com",
                password="adminpassword123",
                full_name="System Super Administrator",
                role="admin",
                phone="+919876543210"
            ))
            print("[INFO] Seeded default Admin: admin@oranza.com / adminpassword123")

        seller_user = crud.get_user_by_email(db, "seller@oranza.com")
        if not seller_user:
            crud.create_user(db, schemas.UserCreate(
                email="seller@oranza.com",
                password="sellerpassword123",
                full_name="Vikram Sharma",
                role="seller",
                phone="+919811223344",
                store_name="Apex Handcrafted Woods"
            ))
            print("[INFO] Seeded default Seller: seller@oranza.com / sellerpassword123")

        # 2. Seed Demo Categories
        if db.query(models.Category).count() == 0:
            furniture = models.Category(
                id="furniture",
                name="Furniture & Decor",
                slug="furniture-and-decor",
                description="Luxury handcrafted wooden furniture, executive office desks, ergonomic chairs.",
                icon="Armchair",
                hero_image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
                is_featured=True
            )
            electronics = models.Category(
                id="electronics",
                name="Industrial Electronics",
                slug="industrial-electronics",
                description="Commercial-grade automation sensors, precision measuring equipment.",
                icon="Cpu",
                hero_image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                is_featured=True
            )
            db.add_all([furniture, electronics])
            db.commit()

            # Seed demo product
            p1 = models.Product(
                title="Apex Executive Ergonomic Chair",
                slug="apex-executive-ergonomic-chair",
                sku="APEX-CH-001",
                category_id="furniture",
                price=18500.0,
                price_type="fixed",
                currency="₹",
                short_description="High-back mesh ergonomic office chair with 3D lumbar support.",
                full_description="Designed for 12+ hours continuous usage with breathable Korean mesh.",
                whatsapp_number="+919876543210",
                is_featured=True,
                images=[
                    "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80"
                ],
                specifications=[
                    {"key": "Material", "value": "Reinforced Aluminum & Breathable Mesh"}
                ]
            )
            db.add(p1)
            db.commit()
            print("[INFO] Initial demo catalog data seeded successfully!")
    finally:
        db.close()


# ---------------------------------------------------------------------------
# 5. GENERAL & HEALTH ROUTES
# ---------------------------------------------------------------------------

@app.get("/", tags=["General"])
def read_root():
    return {
        "status": "online",
        "phase": "Phase 3: JWT Authentication & Role Security Active 🔐",
        "docs_url": "/docs",
        "database": "SQLite (catalog.db)",
        "version": "3.0.0"
    }

@app.get("/health", tags=["General"])
def health_check(db: Session = Depends(get_db)):
    return {
        "status": "healthy",
        "database_connected": True,
        "users_count": db.query(models.User).count(),
        "categories_count": db.query(models.Category).count(),
        "products_count": db.query(models.Product).count()
    }


# ---------------------------------------------------------------------------
# 6. AUTHENTICATION API ENDPOINTS (JWT + BCRYPT)
# ---------------------------------------------------------------------------

@app.post("/api/v1/auth/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED, tags=["Authentication"])
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Naya user register karta hai (Password bcrypt hash ho kar save hota hai)
    """
    existing = crud.get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{user.email}' is already registered!"
        )
    return crud.create_user(db, user)

@app.post("/api/v1/auth/login", response_model=schemas.Token, tags=["Authentication"])
def login_for_access_token(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Login endpoint: Email aur Password verify karke JWT Access Token return karta hai
    """
    user = crud.authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Account is deactivated")

    # Generate JWT Token with user details
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role, "user_id": user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/v1/auth/me", response_model=schemas.UserResponse, tags=["Authentication"])
def get_my_profile(current_user: models.User = Depends(auth.get_current_user)):
    """
    Protected Endpoint: Token verify karke current logged-in user ki details deta hai
    """
    return current_user


# ---------------------------------------------------------------------------
# 7. CATEGORIES API ENDPOINTS
# ---------------------------------------------------------------------------

@app.get("/api/v1/categories", response_model=List[schemas.CategoryResponse], tags=["Categories"])
def list_categories(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """Public: Sari categories fetch karta hai"""
    categories = crud.get_categories(db, skip=skip, limit=limit)
    result = []
    for cat in categories:
        count = db.query(models.Product).filter(models.Product.category_id == cat.id).count()
        cat_dict = schemas.CategoryResponse.model_validate(cat)
        cat_dict.product_count = count
        result.append(cat_dict)
    return result

@app.post("/api/v1/categories", response_model=schemas.CategoryResponse, status_code=status.HTTP_201_CREATED, tags=["Categories"])
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_admin = Depends(auth.require_admin)  # 🔒 Protected: Super Admin Only
):
    """Admin Only: Nayi category create karta hai"""
    existing = crud.get_category_by_id(db, category.id)
    if existing:
        raise HTTPException(status_code=400, detail=f"Category '{category.id}' already exists!")
    return crud.create_category(db, category)

@app.delete("/api/v1/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Categories"])
def delete_category(
    category_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(auth.require_admin)  # 🔒 Protected: Super Admin Only
):
    """Admin Only: Category delete karta hai"""
    success = crud.delete_category(db, category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return None


# ---------------------------------------------------------------------------
# 8. PRODUCTS API ENDPOINTS (PUBLIC DISCOVERY + PROTECTED MANAGEMENT)
# ---------------------------------------------------------------------------

@app.get("/api/v1/products", response_model=List[schemas.ProductResponse], tags=["Products"])
def list_products(
    category_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    is_featured: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Public: Products search & list"""
    return crud.get_products(
        db, category_id=category_id, search=search, is_featured=is_featured, skip=skip, limit=limit
    )

@app.get("/api/v1/products/{identifier}", response_model=schemas.ProductResponse, tags=["Products"])
def get_product(identifier: str, db: Session = Depends(get_db)):
    """Public: Single product details (Increments views count)"""
    product = None
    if identifier.isdigit():
        product = crud.get_product_by_id(db, int(identifier))
    if not product:
        product = crud.get_product_by_slug(db, identifier)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{identifier}' not found in catalog!"
        )

    product.views = (product.views or 0) + 1
    db.commit()
    db.refresh(product)
    return product

@app.post("/api/v1/products", response_model=schemas.ProductResponse, status_code=status.HTTP_201_CREATED, tags=["Products"])
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.require_seller_or_admin)  # 🔒 Protected: Seller or Admin Only!
):
    """
    Seller/Admin Only: Naya Product create karta hai
    """
    cat = crud.get_category_by_id(db, product.category_id)
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category '{product.category_id}' does not exist!"
        )

    return crud.create_product(db, product, seller_id=current_user.id)

@app.put("/api/v1/products/{product_id}", response_model=schemas.ProductResponse, tags=["Products"])
def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.require_seller_or_admin)  # 🔒 Protected: Seller or Admin Only!
):
    """
    Seller/Admin Only: Product update karta hai
    """
    updated = crud.update_product(db, product_id, product_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated

@app.delete("/api/v1/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Products"])
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(auth.require_seller_or_admin)  # 🔒 Protected: Seller or Admin Only!
):
    """
    Seller/Admin Only: Product delete karta hai
    """
    success = crud.delete_product(db, product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return None

# ---------------------------------------------------------------------------
# 9. WHATSAPP ENQUIRY TRACKER
# ---------------------------------------------------------------------------
@app.post("/api/v1/enquiries/click", tags=["Enquiries"])
def track_whatsapp_click(product_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Public: WhatsApp click tracking"""
    count = crud.record_enquiry_click(db, product_id)
    return {"message": "WhatsApp enquiry recorded successfully", "current_enquiries": count}
