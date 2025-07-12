from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .user import User

class AnswerBase(BaseModel):
    content: str

class AnswerCreate(AnswerBase):
    question_id: int
    author_id: int

class AnswerUpdate(BaseModel):
    content: Optional[str] = None

class Answer(AnswerBase):
    id: int
    question_id: int
    author_id: int
    is_accepted: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: Optional[User] = None

    class Config:
        from_attributes = True 