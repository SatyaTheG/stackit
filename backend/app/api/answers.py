from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import answer, question
from ..schemas import answer as answer_schema
from ..database import get_db

router = APIRouter(prefix="/answers", tags=["answers"])

@router.get("/", response_model=List[answer_schema.Answer])
def get_answers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all answers with pagination"""
    answers = answer.get_answers(db, skip=skip, limit=limit)
    return answers

@router.post("/", response_model=answer_schema.Answer)
def create_answer(answer_data: answer_schema.AnswerCreate, db: Session = Depends(get_db)):
    """Create a new answer"""
    return answer.create_answer(db=db, answer=answer_data)

@router.get("/{answer_id}", response_model=answer_schema.Answer)
def get_answer(answer_id: int, db: Session = Depends(get_db)):
    """Get a specific answer by ID"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    return db_answer

@router.put("/{answer_id}", response_model=answer_schema.Answer)
def update_answer(answer_id: int, answer_data: answer_schema.AnswerUpdate, db: Session = Depends(get_db)):
    """Update an answer"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    return answer.update_answer(db=db, answer_id=answer_id, answer=answer_data)

@router.delete("/{answer_id}")
def delete_answer(answer_id: int, db: Session = Depends(get_db)):
    """Delete an answer"""
    db_answer = answer.get_answer(db, answer_id=answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    answer.delete_answer(db=db, answer_id=answer_id)
    return {"message": "Answer deleted successfully"}

@router.get("/question/{question_id}", response_model=List[answer_schema.Answer])
def get_answers_by_question(question_id: int, db: Session = Depends(get_db)):
    """Get all answers for a specific question"""
    answers = answer.get_answers_by_question(db, question_id=question_id)
    return answers 