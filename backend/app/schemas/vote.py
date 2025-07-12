from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VoteBase(BaseModel):
    is_upvote: bool

class VoteCreate(VoteBase):
    user_id: int
    question_id: Optional[int] = None
    answer_id: Optional[int] = None

class VoteUpdate(BaseModel):
    is_upvote: Optional[bool] = None

class Vote(VoteBase):
    id: int
    user_id: int
    question_id: Optional[int] = None
    answer_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True 