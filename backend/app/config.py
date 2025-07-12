import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "sqlite:///./stackit.db"
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS settings - parse comma-separated string into list
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    
    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "StackIt"
    
    @property
    def ALLOWED_ORIGINS_LIST(self) -> List[str]:
        """Convert comma-separated string to list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"

settings = Settings() 