"""
=============================================================================
DATABASE CONNECTION & SESSION SETUP (database.py)
=============================================================================
Ye file hamare backend ko SQL Database ke sath jodti hai.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# SQLite local database file
SQLALCHEMY_DATABASE_URL = "sqlite:///./catalog.db"

# ---------------------------------------------------------------------------
# Create Database Engine
# ---------------------------------------------------------------------------
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)


# ---------------------------------------------------------------------------
# 3. SessionLocal Factory
# ---------------------------------------------------------------------------
# Database se baat karne ke liye ek "Session" chahiye hota hai.
# Session ka matlab: "Ek darwaza jo database ke liye khulta hai, query run hoti hai,
# aur request khatam hone par band ho jata hai."
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ---------------------------------------------------------------------------
# 4. Declarative Base Class
# ---------------------------------------------------------------------------
# Base ek parent class hai. Hamari jitni bhi tables banengi (products, categories),
# wo sab is Base class ko inherit karengi taaki SQLAlchemy unhe pehchan sake.
Base = declarative_base()

# ---------------------------------------------------------------------------
# 5. Dependency Injection: get_db()
# ---------------------------------------------------------------------------
# FastAPI me har route ke liye ye function ek fresh DB session open karega,
# aur 'finally' block ki wajah se request poori hote hi session ko close kar dega
# (is se memory leaks ya connection lock nahi hota).
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
