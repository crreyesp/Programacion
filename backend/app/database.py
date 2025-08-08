from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException
import os
import time
import sys

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    db_password = os.getenv("DB_PASSWORD", "sigecol_secure_2024")
    DATABASE_URL = f"postgresql://sigecol_user:{db_password}@postgres:5432/sigecol"
    print(f"Constructed DATABASE_URL from DB_PASSWORD: {DATABASE_URL}")

print(f"Using DATABASE_URL: {DATABASE_URL}")

def create_engine_with_retry():
    max_retries = 10
    retry_delay = 3
    
    print(f"Starting database connection with {max_retries} retries...")
    
    for attempt in range(max_retries):
        try:
            print(f"Database connection attempt {attempt + 1}/{max_retries}")
            engine = create_engine(DATABASE_URL, echo=True)
            
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1"))
                print(f"Database connection successful on attempt {attempt + 1}")
                return engine
                
        except Exception as e:
            print(f"Database connection attempt {attempt + 1} failed: {e}")
            print(f"Error type: {type(e).__name__}")
            
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("Max retries reached. Database connection failed.")
                print("This will prevent the backend from starting properly.")
                return None

try:
    engine = create_engine_with_retry()
    if engine:
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        print("Database engine created successfully")
    else:
        print("Database engine creation failed - app will start in degraded mode")
        SessionLocal = None
except Exception as e:
    print(f"Critical database setup error: {e}")
    engine = None
    SessionLocal = None

Base = declarative_base()

def get_db():
    if not SessionLocal:
        raise HTTPException(status_code=503, detail="Database not available")
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
