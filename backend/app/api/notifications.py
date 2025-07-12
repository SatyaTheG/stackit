from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import notification
from ..schemas import notification as notification_schema
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/", response_model=List[notification_schema.Notification])
def get_notifications(
    skip: int = 0, 
    limit: int = 50,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's notifications"""
    notifications = notification.get_notifications(
        db, current_user.id, skip=skip, limit=limit
    )
    return notifications

@router.get("/unread-count")
def get_unread_count(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get count of unread notifications"""
    count = notification.get_unread_count(db, current_user.id)
    return {"unread_count": count}

@router.put("/{notification_id}/read")
def mark_notification_read(
    notification_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark a notification as read"""
    db_notification = notification.mark_as_read(db, notification_id, current_user.id)
    if not db_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification marked as read"}

@router.put("/mark-all-read")
def mark_all_notifications_read(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark all notifications as read"""
    notification.mark_all_as_read(db, current_user.id)
    return {"message": "All notifications marked as read"}

@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a notification"""
    db_notification = notification.delete_notification(db, notification_id, current_user.id)
    if not db_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification deleted"}
