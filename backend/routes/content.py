from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..core import security
from typing import List

router = APIRouter()

# --- Public Content API ---
@router.get("/{page}", response_model=schemas.ContentResponse)
def get_content(page: str, db: Session = Depends(database.get_db)):
    content = db.query(models.SiteContent).filter(models.SiteContent.page == page).first()
    if not content:
        # Return empty or default if not found
        return {"page": page, "content_data": {}}
    return content

# --- Admin Content & Management APIs ---
@router.post("/update", response_model=schemas.ContentResponse)
def update_content(
    content_update: schemas.ContentUpdate, 
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(security.get_current_admin)
):
    db_content = db.query(models.SiteContent).filter(models.SiteContent.page == content_update.page).first()
    if db_content:
        db_content.content_data = content_update.content_data
    else:
        db_content = models.SiteContent(
            page=content_update.page,
            content_data=content_update.content_data
        )
        db.add(db_content)
    
    db.commit()
    db.refresh(db_content)
    return db_content

