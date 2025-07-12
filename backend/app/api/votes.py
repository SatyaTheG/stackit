from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import vote
from ..schemas import vote as vote_schema
from ..database import get_db

router = APIRouter(prefix="/votes", tags=["votes"])

@router.get("/", response_model=List[vote_schema.Vote])
def get_votes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all votes with pagination"""
    votes = vote.get_votes(db, skip=skip, limit=limit)
    return votes

@router.post("/", response_model=vote_schema.Vote)
def create_vote(vote_data: vote_schema.VoteCreate, db: Session = Depends(get_db)):
    """Create a new vote"""
    return vote.create_vote(db=db, vote=vote_data)

@router.get("/{vote_id}", response_model=vote_schema.Vote)
def get_vote(vote_id: int, db: Session = Depends(get_db)):
    """Get a specific vote by ID"""
    db_vote = vote.get_vote(db, vote_id=vote_id)
    if db_vote is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    return db_vote

@router.put("/{vote_id}", response_model=vote_schema.Vote)
def update_vote(vote_id: int, vote_data: vote_schema.VoteUpdate, db: Session = Depends(get_db)):
    """Update a vote"""
    db_vote = vote.get_vote(db, vote_id=vote_id)
    if db_vote is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    return vote.update_vote(db=db, vote_id=vote_id, vote=vote_data)

@router.delete("/{vote_id}")
def delete_vote(vote_id: int, db: Session = Depends(get_db)):
    """Delete a vote"""
    db_vote = vote.get_vote(db, vote_id=vote_id)
    if db_vote is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    vote.delete_vote(db=db, vote_id=vote_id)
    return {"message": "Vote deleted successfully"}

@router.get("/question/{question_id}", response_model=List[vote_schema.Vote])
def get_votes_by_question(question_id: int, db: Session = Depends(get_db)):
    """Get all votes for a specific question"""
    votes = vote.get_votes_by_question(db, question_id=question_id)
    return votes

@router.get("/answer/{answer_id}", response_model=List[vote_schema.Vote])
def get_votes_by_answer(answer_id: int, db: Session = Depends(get_db)):
    """Get all votes for a specific answer"""
    votes = vote.get_votes_by_answer(db, answer_id=answer_id)
    return votes 