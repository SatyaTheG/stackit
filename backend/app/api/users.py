from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import user
from ..schemas import user as user_schema
from ..database import get_db

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[user_schema.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all users with pagination"""
    users = user.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/", response_model=user_schema.User)
def create_user(user_data: user_schema.UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    db_user = user.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user.create_user(db=db, user=user_data)

@router.get("/{user_id}", response_model=user_schema.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID"""
    db_user = user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.put("/{user_id}", response_model=user_schema.User)
def update_user(user_id: int, user_data: user_schema.UserUpdate, db: Session = Depends(get_db)):
    """Update a user"""
    db_user = user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.update_user(db=db, user_id=user_id, user=user_data)

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user"""
    db_user = user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.delete_user(db=db, user_id=user_id)
    return {"message": "User deleted successfully"}

@router.post("/login")
def login(user_credentials: user_schema.UserLogin, db: Session = Depends(get_db)):
    """User login"""
    user_obj = user.authenticate_user(db, email=user_credentials.email, password=user_credentials.password)
    if not user_obj:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return {"message": "Login successful", "user_id": user_obj.id} 