"""
=============================================================================
CRUD DATABASE OPERATIONS (crud.py)
=============================================================================
CRUD = Create, Read, Update, Delete
Ye functions database session (db) ka use karke actual SQL queries execute karte hain.
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_
import re
import models
import schemas

def slugify(text: str) -> str:
    """Helper: Text ko URL friendly slug me convert karta hai (e.g. 'Office Chair' -> 'office-chair')"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

# ===========================================================================
# USERS & AUTHENTICATION CRUD
# ===========================================================================

def get_user_by_email(db: Session, email: str):
    """Find user by email: SELECT * FROM users WHERE email = email"""
    return db.query(models.User).filter(models.User.email == email.lower().strip()).first()

def get_user_by_id(db: Session, user_id: int):
    """Find user by ID"""
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    """Naya user register karta hai (Password ko bcrypt hash karke save karta hai)"""
    import auth
    hashed_pwd = auth.hash_password(user.password)
    db_user = models.User(
        email=user.email.lower().strip(),
        hashed_password=hashed_pwd,
        full_name=user.full_name,
        role=user.role,
        phone=user.phone,
        store_name=user.store_name,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    """Email aur Password match verify karta hai"""
    import auth
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not auth.verify_password(password, user.hashed_password):
        return None
    return user


# ===========================================================================
# CATEGORIES CRUD
# ===========================================================================

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    """Sari categories fetch karta hai (SELECT * FROM categories)"""
    return db.query(models.Category).offset(skip).limit(limit).all()

def get_category_by_id(db: Session, category_id: str):
    """Single category fetch karta hai ID se"""
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def create_category(db: Session, category: schemas.CategoryCreate):
    """Nayi category create karta hai (INSERT INTO categories ...)"""
    db_category = models.Category(
        id=category.id.lower().strip(),
        name=category.name,
        slug=slugify(category.name),
        description=category.description,
        icon=category.icon,
        hero_image=category.hero_image,
        is_featured=category.is_featured
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: str):
    """Category delete karta hai (DELETE FROM categories WHERE id = ...)"""
    db_cat = get_category_by_id(db, category_id)
    if db_cat:
        db.delete(db_cat)
        db.commit()
        return True
    return False


# ===========================================================================
# PRODUCTS CRUD
# ===========================================================================

def get_products(
    db: Session,
    category_id: str = None,
    search: str = None,
    is_featured: bool = None,
    skip: int = 0,
    limit: int = 50
):
    """
    Products fetch karta hai with filtering & search.
    """
    query = db.query(models.Product)

    if category_id:
        query = query.filter(models.Product.category_id == category_id)

    if is_featured is not None:
        query = query.filter(models.Product.is_featured == is_featured)

    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                models.Product.title.ilike(search_filter),
                models.Product.short_description.ilike(search_filter),
                models.Product.sku.ilike(search_filter)
            )
        )

    return query.order_by(models.Product.id.desc()).offset(skip).limit(limit).all()

def get_product_by_id(db: Session, product_id: int):
    """Product by ID"""
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_product_by_slug(db: Session, slug: str):
    """Product by Slug"""
    return db.query(models.Product).filter(models.Product.slug == slug).first()

def create_product(db: Session, product: schemas.ProductCreate, seller_id: int = None):
    """Naya product database me save karta hai"""
    base_slug = slugify(product.title)
    slug = base_slug
    counter = 1
    while db.query(models.Product).filter(models.Product.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    specs_data = [s.model_dump() for s in product.specifications]

    db_product = models.Product(
        title=product.title,
        slug=slug,
        sku=product.sku,
        category_id=product.category_id,
        seller_id=seller_id,
        price=product.price,
        price_type=product.price_type,
        currency=product.currency,
        short_description=product.short_description,
        full_description=product.full_description,
        whatsapp_number=product.whatsapp_number,
        video_url=product.video_url,
        video_title=product.video_title,
        is_featured=product.is_featured,
        images=product.images,
        specifications=specs_data
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    """Existing product ko update karta hai"""
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return None

    update_data = product_update.model_dump(exclude_unset=True)

    if "specifications" in update_data and update_data["specifications"] is not None:
        update_data["specifications"] = [
            s if isinstance(s, dict) else s.model_dump() for s in update_data["specifications"]
        ]

    if "title" in update_data and update_data["title"]:
        db_product.slug = slugify(update_data["title"])

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    """Product delete karta hai"""
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return False

    db.delete(db_product)
    db.commit()
    return True

def record_enquiry_click(db: Session, product_id: int = None):
    """WhatsApp button click hone par count +1 karta hai"""
    if product_id:
        db_product = get_product_by_id(db, product_id)
        if db_product:
            db_product.enquiries = (db_product.enquiries or 0) + 1
            db.commit()
            return db_product.enquiries
    return 1
