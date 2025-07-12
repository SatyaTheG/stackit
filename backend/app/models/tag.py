from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
from ..schemas import tag as tag_schema

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    question_tags = relationship("QuestionTag", back_populates="tag")

class QuestionTag(Base):
    __tablename__ = "question_tags"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    tag_id = Column(Integer, ForeignKey("tags.id"))

    # Relationships
    question = relationship("Question", back_populates="question_tags")
    tag = relationship("Tag", back_populates="question_tags")

def get_tags(db, skip: int = 0, limit: int = 100):
    return db.query(Tag).offset(skip).limit(limit).all()

def get_tag(db, tag_id: int):
    return db.query(Tag).filter(Tag.id == tag_id).first()

def get_tag_by_name(db, name: str):
    return db.query(Tag).filter(Tag.name == name).first()

def create_tag(db, tag: tag_schema.TagCreate):
    db_tag = Tag(
        name=tag.name,
        description=tag.description
    )
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def update_tag(db, tag_id: int, tag: tag_schema.TagUpdate):
    db_tag = get_tag(db, tag_id)
    if db_tag:
        update_data = tag.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_tag, field, value)
        
        db.commit()
        db.refresh(db_tag)
    return db_tag

def delete_tag(db, tag_id: int):
    db_tag = get_tag(db, tag_id)
    if db_tag:
        db.delete(db_tag)
        db.commit()
    return db_tag

def add_tag_to_question(db, question_id: int, tag_id: int):
    question_tag = QuestionTag(
        question_id=question_id,
        tag_id=tag_id
    )
    db.add(question_tag)
    db.commit()
    db.refresh(question_tag)
    return question_tag

def remove_tag_from_question(db, question_id: int, tag_id: int):
    question_tag = db.query(QuestionTag).filter(
        QuestionTag.question_id == question_id,
        QuestionTag.tag_id == tag_id
    ).first()
    if question_tag:
        db.delete(question_tag)
        db.commit()
    return question_tag

def get_tags_by_question(db, question_id: int):
    return db.query(Tag).join(QuestionTag).filter(QuestionTag.question_id == question_id).all()

def get_questions_by_tag(db, tag_id: int, skip: int = 0, limit: int = 100):
    from .question import Question
    return db.query(Question).join(QuestionTag).filter(QuestionTag.tag_id == tag_id).offset(skip).limit(limit).all() 