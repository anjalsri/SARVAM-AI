from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user") # user, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    subscriptions = relationship("Subscription", back_populates="user")
    payments = relationship("Payment", back_populates="user")

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String) # Basic, Pro, Business
    status = Column(String) # Active, Canceled, Expired
    valid_until = Column(DateTime)
    
    user = relationship("User", back_populates="subscriptions")

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    razorpay_order_id = Column(String, index=True)
    razorpay_payment_id = Column(String, nullable=True)
    amount = Column(Float)
    currency = Column(String, default="INR")
    status = Column(String) # Created, Paid, Failed
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="payments")

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class SiteContent(Base):
    __tablename__ = "site_content"
    id = Column(Integer, primary_key=True, index=True)
    page = Column(String, unique=True, index=True) # "home", "about", "services", "pricing"
    content_data = Column(JSON) # The dynamic JSON structure
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    short_desc = Column(String)
    content = Column(Text)
    image = Column(String)
    category = Column(String)
    author = Column(String, default="Admin")
    published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
