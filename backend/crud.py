"""
=============================================================================
CRUD DATABASE OPERATIONS (crud.py)
=============================================================================
CRUD = Create, Read, Update, Delete
Ye functions database session (db) ka use karke actual SQL queries execute karte hain.
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_, func
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

# ===========================================================================
# DASHBOARD ANALYTICS CRUD
# ===========================================================================

def get_dashboard_analytics(db: Session):
    """
    SQL Aggregation Queries run karke Seller/Admin Dashboard metrics calculate karta hai
    """
    # 1. Total Products
    total_products = db.query(func.count(models.Product.id)).scalar() or 0

    # 2. Total Categories
    total_categories = db.query(func.count(models.Category.id)).scalar() or 0

    # 3. Total Views (SUM of views column across all products)
    total_views = db.query(func.coalesce(func.sum(models.Product.views), 0)).scalar() or 0

    # 4. Total WhatsApp Enquiries (SUM of enquiries column across all products)
    total_enquiries = db.query(func.coalesce(func.sum(models.Product.enquiries), 0)).scalar() or 0

    # 5. Products with HD Video
    products_with_video = db.query(func.count(models.Product.id)).filter(
        models.Product.video_url.isnot(None),
        models.Product.video_url != ""
    ).scalar() or 0

    # 6. Top 5 Most Inquired Products
    top_enquired = db.query(models.Product).order_by(
        models.Product.enquiries.desc(), models.Product.views.desc()
    ).limit(5).all()

    # 7. Top 5 Most Viewed Products
    top_viewed = db.query(models.Product).order_by(
        models.Product.views.desc()
    ).limit(5).all()

    # 8. Category Distribution with product counts
    categories = db.query(models.Category).all()
    category_distribution = []
    for cat in categories:
        count = db.query(func.count(models.Product.id)).filter(models.Product.category_id == cat.id).scalar() or 0
        category_distribution.append({
            "category_id": cat.id,
            "category_name": cat.name,
            "product_count": count
        })

    return {
        "total_products": total_products,
        "total_categories": total_categories,
        "total_views": int(total_views),
        "total_enquiries": int(total_enquiries),
        "products_with_video": products_with_video,
        "top_enquired_products": top_enquired,
        "top_viewed_products": top_viewed,
        "category_distribution": category_distribution
    }

# ===========================================================================
# CONTACT MESSAGES & INQUIRIES CRUD
# ===========================================================================

def create_contact_message(db: Session, msg: schemas.ContactCreate):
    """Customer inquiry form ko database me save karta hai (INSERT INTO contact_messages ...)"""
    db_msg = models.ContactMessage(
        name=msg.name.strip(),
        phone=msg.phone.strip(),
        email=msg.email.strip() if msg.email else None,
        category=msg.category,
        message=msg.message.strip(),
        is_read=False
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

def get_contact_messages(db: Session, skip: int = 0, limit: int = 50):
    """Saare customer inquiries fetch karta hai (Newest first)"""
    return db.query(models.ContactMessage).order_by(models.ContactMessage.id.desc()).offset(skip).limit(limit).all()

def mark_contact_message_read(db: Session, message_id: int):
    """Inquiry ko read/completed mark karta hai"""
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if msg:
        msg.is_read = True
        db.commit()
        db.refresh(msg)
        return msg
    return None

# ===========================================================================
# STORE SETTINGS CRUD
# ===========================================================================

def get_store_settings(db: Session):
    """
    Store settings fetch karta hai. Agar database me row exist nahi karti to
    default row create karke return karta hai (Singleton pattern).
    """
    settings = db.query(models.StoreSettings).filter(models.StoreSettings.id == 1).first()
    if not settings:
        settings = models.StoreSettings(
            id=1,
            name="Oranza Living & Lifestyle",
            tagline="Inspiring Spaces with Curated Design",
            default_whatsapp="919876543210",
            phone_display="+91 98765 43210",
            email="catalog@oranzalifestyle.com",
            address="Plot 42, Design District, Outer Ring Road, Bengaluru, India",
            instagram="https://instagram.com",
            catalog_count_text="500+ Curated Products"
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

def update_store_settings(db: Session, update_data: schemas.SettingsUpdate):
    """
    Store settings update karta hai. Sirf wahi fields update hoti hain jo frontend se provide ki gayi hon.
    """
    settings = get_store_settings(db)
    
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        if value is not None:
            setattr(settings, key, value)
            
    db.commit()
    db.refresh(settings)
    return settings



