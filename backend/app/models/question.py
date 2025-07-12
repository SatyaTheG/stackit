from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
from ..schemas import question as question_schema

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)  # Now supports HTML
    author_id = Column(Integer, ForeignKey("users.id"))
    is_answered = Column(Boolean, default=False)
    images = Column(String, nullable=True)  # JSON array of image URLs
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    author = relationship("User", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")
    votes = relationship("Vote", back_populates="question", cascade="all, delete-orphan")
    question_tags = relationship("QuestionTag", back_populates="question", cascade="all, delete-orphan")

def get_questions(db, skip: int = 0, limit: int = 100):
    return db.query(Question).offset(skip).limit(limit).all()

def get_question(db, question_id: int):
    return db.query(Question).filter(Question.id == question_id).first()

def create_question(db, question: question_schema.QuestionCreate):
    db_question = Question(
        title=question.title,
        content=question.content,
        author_id=question.author_id
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def update_question(db, question_id: int, question: question_schema.QuestionUpdate):
    db_question = get_question(db, question_id)
    if db_question:
        update_data = question.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_question, field, value)
        
        db.commit()
        db.refresh(db_question)
    return db_question

def delete_question(db, question_id: int):
    db_question = get_question(db, question_id)
    if db_question:
        db.delete(db_question)
        db.commit()
    return db_question

def get_questions_by_author(db, author_id: int, skip: int = 0, limit: int = 100):
    return db.query(Question).filter(Question.author_id == author_id).offset(skip).limit(limit).all()

def search_questions(db, search_term: str, skip: int = 0, limit: int = 100):
    return db.query(Question).filter(
        Question.title.contains(search_term) | Question.content.contains(search_term)
    ).offset(skip).limit(limit).all() 