from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .user import User
from .tag import Tag

class QuestionBase(BaseModel):
    title: str
    content: str

class QuestionCreate(QuestionBase):
    author_id: int

class QuestionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class Question(QuestionBase):
    id: int
    author_id: int
    is_answered: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: Optional[User] = None
    tags: Optional[List[Tag]] = None

    class Config:
        from_attributes = True 