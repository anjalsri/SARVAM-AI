from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database
from ..core import security

router = APIRouter()

# Dependency to ensure only admins can access these routes
def get_admin_user(current_user: models.User = Depends(security.get_current_admin)):
    return current_user

@router.get("/users", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db), admin: models.User = Depends(get_admin_user)):
    return db.query(models.User).all()

@router.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(database.get_db), admin: models.User = Depends(get_admin_user)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.role is not None:
        user.role = user_update.role
    if user_update.is_active is not None:
        user.is_active = user_update.is_active
        
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(database.get_db), admin: models.User = Depends(get_admin_user)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db.delete(user)
    db.commit()
    return None

@router.get("/stats", response_model=schemas.DashboardStats)
def get_stats(db: Session = Depends(database.get_db), admin: models.User = Depends(get_admin_user)):
    total_users = db.query(models.User).count()
    active_subs = db.query(models.Subscription).filter(models.Subscription.status == 'Active').count()
    
    # Calculate mock revenue or real aggregate if payments exist
    payments = db.query(models.Payment).filter(models.Payment.status == 'Paid').all()
    total_revenue = sum(p.amount for p in payments) if payments else 45231.0 # mock fallback
    
    return schemas.DashboardStats(
        total_users=total_users,
        active_subscriptions=active_subs,
        total_revenue=total_revenue,
        api_calls=12234 # Mock metric for now
    )
