from sqlalchemy import Column, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
from ..schemas import vote as vote_schema

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=True)
    answer_id = Column(Integer, ForeignKey("answers.id"), nullable=True)
    is_upvote = Column(Boolean)  # True for upvote, False for downvote
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="votes")
    question = relationship("Question", back_populates="votes")
    answer = relationship("Answer", back_populates="votes")

def get_votes(db, skip: int = 0, limit: int = 100):
    return db.query(Vote).offset(skip).limit(limit).all()

def get_vote(db, vote_id: int):
    return db.query(Vote).filter(Vote.id == vote_id).first()

def create_vote(db, vote: vote_schema.VoteCreate):
    db_vote = Vote(
        user_id=vote.user_id,
        question_id=vote.question_id,
        answer_id=vote.answer_id,
        is_upvote=vote.is_upvote
    )
    db.add(db_vote)
    db.commit()
    db.refresh(db_vote)
    return db_vote

def update_vote(db, vote_id: int, vote: vote_schema.VoteUpdate):
    db_vote = get_vote(db, vote_id)
    if db_vote:
        update_data = vote.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_vote, field, value)
        
        db.commit()
        db.refresh(db_vote)
    return db_vote

def delete_vote(db, vote_id: int):
    db_vote = get_vote(db, vote_id)
    if db_vote:
        db.delete(db_vote)
        db.commit()
    return db_vote

def get_votes_by_question(db, question_id: int, skip: int = 0, limit: int = 100):
    return db.query(Vote).filter(Vote.question_id == question_id).offset(skip).limit(limit).all()

def get_votes_by_answer(db, answer_id: int, skip: int = 0, limit: int = 100):
    return db.query(Vote).filter(Vote.answer_id == answer_id).offset(skip).limit(limit).all()

def get_votes_by_user(db, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Vote).filter(Vote.user_id == user_id).offset(skip).limit(limit).all()

def get_vote_by_user_and_question(db, user_id: int, question_id: int):
    return db.query(Vote).filter(
        Vote.user_id == user_id,
        Vote.question_id == question_id
    ).first()

def get_vote_by_user_and_answer(db, user_id: int, answer_id: int):
    return db.query(Vote).filter(
        Vote.user_id == user_id,
        Vote.answer_id == answer_id
    ).first() 