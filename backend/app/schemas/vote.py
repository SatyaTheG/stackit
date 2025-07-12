from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VoteBase(BaseModel):
    user_id: int
    is_upvote: bool
    question_id: Optional[int] = None
    answer_id: Optional[int] = None

class VoteCreate(VoteBase):
    pass

class VoteUpdate(BaseModel):
    is_upvote: Optional[bool] = None

class Vote(VoteBase):
    id: int
    created_at: datetime
    updated_at: datetime  # Added this field to match schema

    class Config:
        from_attributes = True 