from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# --- Auth Schemas ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    is_active: bool
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    role: Optional[str] = None
    is_active: Optional[bool] = None

class DashboardStats(BaseModel):
    total_users: int
    active_subscriptions: int
    total_revenue: float
    api_calls: int

# --- Content Schemas ---
class ContentUpdate(BaseModel):
    page: str
    content_data: Any

class ContentResponse(BaseModel):
    page: str
    content_data: Any

# --- Contact Schemas ---
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# --- Payment Schemas ---
class PaymentCreateRequest(BaseModel):
    plan_name: str
    amount_in_inr: float

class PaymentVerifyRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    plan_name: str
