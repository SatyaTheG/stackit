from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnswerBase(BaseModel):
    content: str
    images: Optional[str] = None  # JSON string of image URLs

class AnswerCreate(AnswerBase):
    question_id: int
    author_id: int

class AnswerUpdate(BaseModel):
    content: Optional[str] = None
    images: Optional[str] = None
    is_accepted: Optional[bool] = None

class Answer(AnswerBase):
    id: int
    question_id: int
    author_id: int
    is_accepted: bool
    accepted_at: Optional[datetime]
    accepted_by: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 