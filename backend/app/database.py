from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

def create_engine_with_retry():
    max_retries = 5
    retry_delay = 2
    
    for attempt in range(max_retries):
        try:
            engine = create_engine(DATABASE_URL)
            engine.connect()
            print(f"Database connection successful on attempt {attempt + 1}")
            return engine
        except Exception as e:
            print(f"Database connection attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("Max retries reached. Database connection failed.")
                raise

engine = create_engine_with_retry()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
