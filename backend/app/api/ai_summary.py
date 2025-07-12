from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from transformers import pipeline
from ..database import get_db
from ..models import answer, question

router = APIRouter(prefix="/ai-summary", tags=["AI-summary"])

# Initialize the summarization pipeline
try:
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
except Exception as e:
    print(f"Warning: Could not load BART model: {e}")
    summarizer = None

@router.post("/questions/{question_id}")
def generate_ai_summary(question_id: int, db: Session = Depends(get_db)):
    # Check if model is loaded
    if summarizer is None:
        raise HTTPException(status_code=500, detail="AI model not loaded. Please check the model installation.")
    
    # Fetch question and answers
    db_question = db.query(question.Question).filter(question.Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    answers = db.query(answer.Answer).filter(answer.Answer.question_id == question_id).all()
    if not answers:
        raise HTTPException(status_code=404, detail="No answers found for this question")

    # Prepare text for summarization
    answers_text = " ".join([a.content for a in answers])
    
    # Add question context
    full_text = f"Question: {db_question.title}\n\nAnswers: {answers_text}"
    
    try:
        # Generate summary using BART
        summary_result = summarizer(full_text, max_length=130, min_length=30, do_sample=False)
        summary = summary_result[0]['summary_text']
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")

    return {"summary": summary} 