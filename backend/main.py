from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .routes import auth, content, contact, admin
import os

# Create Database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Sarvam Digital API", version="1.0.0")

# Setup CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Sarvam Digital API",
        "docs": "/docs",
        "status": "active"
    }

@app.get("/api/health")
def health_check(db: Session = Depends(database.get_db)):
    return {"status": "ok", "db_connected": db is not None}

# Mount Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(content.router, prefix="/api/content", tags=["content"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

# Future route for payments
# app.include_router(payment.router, prefix="/api/payment", tags=["payment"])
