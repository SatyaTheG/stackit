from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import tag
from ..schemas import tag as tag_schema
from ..database import get_db

router = APIRouter(prefix="/tags", tags=["tags"])

@router.get("/", response_model=List[tag_schema.Tag])
def get_tags(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all tags with pagination"""
    tags = tag.get_tags(db, skip=skip, limit=limit)
    return tags

@router.post("/", response_model=tag_schema.Tag)
def create_tag(tag_data: tag_schema.TagCreate, db: Session = Depends(get_db)):
    """Create a new tag"""
    return tag.create_tag(db=db, tag=tag_data)

@router.get("/{tag_id}", response_model=tag_schema.Tag)
def get_tag(tag_id: int, db: Session = Depends(get_db)):
    """Get a specific tag by ID"""
    db_tag = tag.get_tag(db, tag_id=tag_id)
    if db_tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    return db_tag

@router.put("/{tag_id}", response_model=tag_schema.Tag)
def update_tag(tag_id: int, tag_data: tag_schema.TagUpdate, db: Session = Depends(get_db)):
    """Update a tag"""
    db_tag = tag.get_tag(db, tag_id=tag_id)
    if db_tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag.update_tag(db=db, tag_id=tag_id, tag=tag_data)

@router.delete("/{tag_id}")
def delete_tag(tag_id: int, db: Session = Depends(get_db)):
    """Delete a tag"""
    db_tag = tag.get_tag(db, tag_id=tag_id)
    if db_tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    tag.delete_tag(db=db, tag_id=tag_id)
    return {"message": "Tag deleted successfully"}

@router.get("/name/{tag_name}", response_model=tag_schema.Tag)
def get_tag_by_name(tag_name: str, db: Session = Depends(get_db)):
    """Get a tag by name"""
    db_tag = tag.get_tag_by_name(db, name=tag_name)
    if db_tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    return db_tag 