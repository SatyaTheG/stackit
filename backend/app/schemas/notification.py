from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    type: str
    title: str
    message: str

class NotificationCreate(NotificationBase):
    user_id: int
    related_question_id: Optional[int] = None
    related_answer_id: Optional[int] = None
    related_user_id: Optional[int] = None

class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None

class Notification(NotificationBase):
    id: int
    user_id: int
    related_question_id: Optional[int] = None
    related_answer_id: Optional[int] = None
    related_user_id: Optional[int] = None
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
