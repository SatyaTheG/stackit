from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import questions, answers, users, votes, tags
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StackIt API",
    description="A Stack Overflow-like Q&A platform API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router, prefix="/api/v1")
app.include_router(answers.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(votes.router, prefix="/api/v1")
app.include_router(tags.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to StackIt API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"} 