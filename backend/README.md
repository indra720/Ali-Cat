# 🚀 Ali-Eco Catalog System — FastAPI + SQL Backend

Production-ready RESTful backend API built with **Python 3.13**, **FastAPI**, **SQLAlchemy 2.0 ORM**, and **SQLite / PostgreSQL**.

---

## 🌟 Key Features
- ⚡ **High Performance:** Built on Starlette and Uvicorn (`async/await`).
- 🗄️ **Relational Database:** SQLAlchemy ORM with SQLite (`catalog.db`) and PostgreSQL compatibility.
- 🔐 **Authentication & Security:** bcrypt password hashing with OAuth2 and JSON Web Tokens (JWT).
- 🛡️ **Role-Based Access Control:** Separate permissions for `admin`, `seller`, and `customer`.
- 📑 **Interactive API Docs:** Automatic Swagger UI at `/docs` and ReDoc at `/redoc`.
- 🌐 **CORS Enabled:** Ready to communicate with React and Next.js frontends.

---

## 🛠️ Quick Start

### 1. Setup Virtual Environment
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux / Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Development Server
```bash
uvicorn main:app --reload --port 8000
```

### 4. Interactive Documentation
Open your browser at:
- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc
- **Health Check:** http://127.0.0.1:8000/health

---

## 🔑 Pre-Seeded Demo Accounts
- **Super Admin:** `admin@oranza.com` / `adminpassword123` (Role: `admin`)
- **Seller:** `seller@oranza.com` / `sellerpassword123` (Role: `seller`)
