import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "sqlite:///./stackit.db"
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS settings
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]
    
    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "StackIt"
    
    class Config:
        env_file = ".env"

settings = Settings() 