from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import question, user
from ..schemas import question as question_schema
from ..database import get_db

router = APIRouter(prefix="/questions", tags=["questions"])

@router.get("/", response_model=List[question_schema.Question])
def get_questions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all questions with pagination"""
    questions = question.get_questions(db, skip=skip, limit=limit)
    return questions

@router.post("/", response_model=question_schema.Question)
def create_question(question_data: question_schema.QuestionCreate, db: Session = Depends(get_db)):
    """Create a new question"""
    return question.create_question(db=db, question=question_data)

@router.get("/{question_id}", response_model=question_schema.Question)
def get_question(question_id: int, db: Session = Depends(get_db)):
    """Get a specific question by ID"""
    db_question = question.get_question(db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question

@router.put("/{question_id}", response_model=question_schema.Question)
def update_question(question_id: int, question_data: question_schema.QuestionUpdate, db: Session = Depends(get_db)):
    """Update a question"""
    db_question = question.get_question(db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return question.update_question(db=db, question_id=question_id, question=question_data)

@router.delete("/{question_id}")
def delete_question(question_id: int, db: Session = Depends(get_db)):
    """Delete a question"""
    db_question = question.get_question(db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    question.delete_question(db=db, question_id=question_id)
    return {"message": "Question deleted successfully"} 