from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
from ..schemas import notification as notification_schema

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String)  # 'answer', 'comment', 'mention', 'vote', 'accept'
    title = Column(String)
    message = Column(Text)
    related_question_id = Column(Integer, ForeignKey("questions.id"), nullable=True)
    related_answer_id = Column(Integer, ForeignKey("answers.id"), nullable=True)
    related_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="notifications")
    related_question = relationship("Question")
    related_answer = relationship("Answer")
    related_user = relationship("User", foreign_keys=[related_user_id])

def get_notifications(db, user_id: int, skip: int = 0, limit: int = 50):
    return db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()

def get_unread_count(db, user_id: int):
    return db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).count()

def create_notification(db, notification: notification_schema.NotificationCreate):
    db_notification = Notification(
        user_id=notification.user_id,
        type=notification.type,
        title=notification.title,
        message=notification.message,
        related_question_id=notification.related_question_id,
        related_answer_id=notification.related_answer_id,
        related_user_id=notification.related_user_id
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def mark_as_read(db, notification_id: int, user_id: int):
    db_notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id
    ).first()
    
    if db_notification:
        db_notification.is_read = True
        db.commit()
        db.refresh(db_notification)
    
    return db_notification

def mark_all_as_read(db, user_id: int):
    db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).update({"is_read": True})
    db.commit()

def delete_notification(db, notification_id: int, user_id: int):
    db_notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id
    ).first()
    
    if db_notification:
        db.delete(db_notification)
        db.commit()
    
    return db_notification
