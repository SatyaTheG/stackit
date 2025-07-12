from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from typing import List
from ..models import answer, question, user
from ..schemas import answer as answer_schema
from ..database import get_db
from ..auth import get_current_user
from ..services.notification_service import NotificationService
import re

router = APIRouter(prefix="/answers", tags=["answers"])

@router.get("/", response_model=List[answer_schema.Answer])
def get_answers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all answers with pagination"""
    answers = answer.get_answers(db, skip=skip, limit=limit)
    return answers

@router.post("/", response_model=answer_schema.Answer)
async def create_answer(
    content: str = Form(...),
    question_id: int = Form(...),
    current_user: user.User = Depends(get_current_user),  # Require authentication
    db: Session = Depends(get_db)
):
    """Create a new answer (requires authentication)"""
    
    # Verify question exists
    db_question = question.get_question(db, question_id=question_id)
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Create answer data
    answer_data = answer_schema.AnswerCreate(
        content=content,
        question_id=question_id,
        author_id=current_user.id  # Use authenticated user's ID
    )
    
    # Create the answer
    db_answer = answer.create_answer(db=db, answer=answer_data)
    
    # Create notifications
    NotificationService.create_answer_notification(
        db, question_id, db_answer.id, current_user.id
    )
    NotificationService.create_mention_notifications(
        db, content, current_user.id, question_id=question_id, answer_id=db_answer.id
    )
    
    return db_answer

@router.get("/{answer_id}", response_model=answer_schema.Answer)
def get_answer(answer_id: int, db: Session = Depends(get_db)):
    """Get a specific answer by ID"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    return db_answer

@router.put("/{answer_id}", response_model=answer_schema.Answer)
def update_answer(
    answer_id: int, 
    answer_data: answer_schema.AnswerUpdate, 
    current_user: user.User = Depends(get_current_user),  # Require authentication
    db: Session = Depends(get_db)
):
    """Update an answer (requires authentication and ownership)"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    # Check if user owns the answer
    if db_answer.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this answer")
    
    return answer.update_answer(db=db, answer_id=answer_id, answer=answer_data)

@router.delete("/{answer_id}")
def delete_answer(
    answer_id: int, 
    current_user: user.User = Depends(get_current_user),  # Require authentication
    db: Session = Depends(get_db)
):
    """Delete an answer (requires authentication and ownership)"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    # Check if user owns the answer
    if db_answer.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this answer")
    
    answer.delete_answer(db=db, answer_id=answer_id)
    return {"message": "Answer deleted successfully"}

@router.get("/question/{question_id}", response_model=List[answer_schema.Answer])
def get_answers_by_question(question_id: int, db: Session = Depends(get_db)):
    """Get all answers for a specific question"""
    answers = answer.get_answers_by_question(db, question_id=question_id)
    return answers 

@router.post("/{answer_id}/accept")
def accept_answer(
    answer_id: int,
    current_user: user.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Accept an answer (only question owner can do this)"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    # Get the question to check ownership
    db_question = question.get_question(db, db_answer.question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Check if current user is the question owner
    if db_question.author_id != current_user.id:
        raise HTTPException(
            status_code=403, 
            detail="Only the question owner can accept answers"
        )
    
    # Accept the answer
    accepted_answer = answer.accept_answer(db, answer_id=answer_id)
    
    return {"message": "Answer accepted successfully", "answer": accepted_answer}

@router.post("/{answer_id}/unaccept")
def unaccept_answer(
    answer_id: int,
    current_user: user.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Unaccept an answer (only question owner can do this)"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    # Get the question to check ownership
    db_question = question.get_question(db, db_answer.question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Check if current user is the question owner
    if db_question.author_id != current_user.id:
        raise HTTPException(
            status_code=403, 
            detail="Only the question owner can unaccept answers"
        )
    
    # Unaccept the answer
    db_answer.is_accepted = False
    db_question.is_answered = False
    db.commit()
    db.refresh(db_answer)
    
    return {"message": "Answer unaccepted successfully", "answer": db_answer} 