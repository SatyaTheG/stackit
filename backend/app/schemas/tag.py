from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TagBase(BaseModel):
    name: str
    description: Optional[str] = None

class TagCreate(TagBase):
    pass

class TagUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class Tag(TagBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Junction table schema
class QuestionTag(BaseModel):
    id: int
    question_id: int
    tag_id: int

    class Config:
        from_attributes = True 