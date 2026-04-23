from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..core import security
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = security.get_password_hash(user.password)
    # The first user to register becomes admin for convenience in this setup
    is_first_user = db.query(models.User).count() == 0
    role = "admin" if is_first_user else "user"
    
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = security.create_access_token(data={"sub": user.email})
    refresh_token = security.create_refresh_token(data={"sub": user.email})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

class RefreshRequest(schemas.BaseModel):
    refresh_token: str

@router.post("/refresh", response_model=schemas.Token)
def refresh_token(request: RefreshRequest, db: Session = Depends(database.get_db)):
    try:
        payload = security.jwt.decode(request.refresh_token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        is_refresh = payload.get("refresh")
        if email is None or not is_refresh:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except security.jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
        
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    new_access_token = security.create_access_token(data={"sub": user.email})
    new_refresh_token = security.create_refresh_token(data={"sub": user.email})
    return {"access_token": new_access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(security.get_current_user)):
    return current_user
