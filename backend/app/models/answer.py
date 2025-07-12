from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
from ..schemas import answer as answer_schema

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    question_id = Column(Integer, ForeignKey("questions.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    is_accepted = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    question = relationship("Question", back_populates="answers")
    author = relationship("User", back_populates="answers")
    votes = relationship("Vote", back_populates="answer", cascade="all, delete-orphan")

def get_answers(db, skip: int = 0, limit: int = 100):
    return db.query(Answer).offset(skip).limit(limit).all()

def get_answer(db, answer_id: int):
    return db.query(Answer).filter(Answer.id == answer_id).first()

def create_answer(db, answer: answer_schema.AnswerCreate):
    db_answer = Answer(
        content=answer.content,
        question_id=answer.question_id,
        author_id=answer.author_id
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

def update_answer(db, answer_id: int, answer: answer_schema.AnswerUpdate):
    db_answer = get_answer(db, answer_id)
    if db_answer:
        update_data = answer.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_answer, field, value)
        
        db.commit()
        db.refresh(db_answer)
    return db_answer

def delete_answer(db, answer_id: int):
    db_answer = get_answer(db, answer_id)
    if db_answer:
        db.delete(db_answer)
        db.commit()
    return db_answer

def get_answers_by_question(db, question_id: int, skip: int = 0, limit: int = 100):
    return db.query(Answer).filter(Answer.question_id == question_id).offset(skip).limit(limit).all()

def get_answers_by_author(db, author_id: int, skip: int = 0, limit: int = 100):
    return db.query(Answer).filter(Answer.author_id == author_id).offset(skip).limit(limit).all()

def accept_answer(db, answer_id: int):
    db_answer = get_answer(db, answer_id)
    if db_answer:
        db_answer.is_accepted = True
        # Mark the question as answered
        db_answer.question.is_answered = True
        db.commit()
        db.refresh(db_answer)
    return db_answer 