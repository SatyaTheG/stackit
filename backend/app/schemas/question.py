from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class QuestionBase(BaseModel):
    title: str
    content: str
    images: Optional[str] = None  # JSON string of image URLs

class QuestionCreate(QuestionBase):
    author_id: int

class QuestionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    images: Optional[str] = None
    is_answered: Optional[bool] = None

class Question(QuestionBase):
    id: int
    author_id: int
    is_answered: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True