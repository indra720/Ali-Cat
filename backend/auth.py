"""
=============================================================================
AUTHENTICATION & SECURITY HELPERS (auth.py)
=============================================================================
Ye file Password Hashing (bcrypt) aur JWT Tokens (JSON Web Tokens) ko handle karti hai.
"""

import bcrypt
import jwt
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db

# ---------------------------------------------------------------------------
# 1. Security Configuration (Secrets & Algorithm)
# ---------------------------------------------------------------------------
# Production me ye SECRET_KEY .env file se aati hai (kabhi hardcode nahi karte)
SECRET_KEY = "oranza-super-secret-jwt-key-change-in-production-2026"
ALGORITHM = "HS256"                # HMAC-SHA256 signature algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # Token 7 din tak valid rahega

# FastAPI ka standard OAuth2 Bearer scheme
# Jab frontend API call karega, toh header me bhejega: "Authorization: Bearer <token>"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# ---------------------------------------------------------------------------
# 2. Password Hashing with bcrypt
# ---------------------------------------------------------------------------

def hash_password(password: str) -> str:
    """
    Plain password ko secure 1-way bcrypt hash me convert karta hai.
    Example: 'secret123' -> '$2b$12$e8uqkGfH8rNqF5h8fQ...'
    """
    # bcrypt requires bytes, so encode UTF-8
    pwd_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt(rounds=12) # 12 rounds is industry standard
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    User ke dale hue password ko database ke hash ke sath verify karta hai.
    """
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except Exception:
        return False


# ---------------------------------------------------------------------------
# 3. JWT Token Generation & Verification
# ---------------------------------------------------------------------------

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    User details (email, role, id) ko ek encrypted JWT token string me pack karta hai.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> dict:
    """
    JWT token ko decode aur verify karta hai.
    Agar token expire ho gaya ho ya fake ho, toh error throw karega.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired. Please login again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token.",
            headers={"WWW-Authenticate": "Bearer"},
        )


# ---------------------------------------------------------------------------
# 4. FastAPI Route Guards / Dependencies (Authorization)
# ---------------------------------------------------------------------------

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Har protected route par incoming request ke token se current logged-in user nikalta hai.
    """
    import crud
    payload = decode_access_token(token)
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

def require_seller_or_admin(current_user = Depends(get_current_user)):
    """Guard: Only Sellers or Admins can access"""
    if current_user.role not in ["seller", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Requires Seller or Admin privileges"
        )
    return current_user

def require_admin(current_user = Depends(get_current_user)):
    """Guard: Only Super Admins can access"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Requires Super Admin privileges"
        )
    return current_user
