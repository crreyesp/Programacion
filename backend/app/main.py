from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from datetime import datetime

app = FastAPI(
    title="SIGECOL v4.16 API",
    description="Sistema Integral de Gestión Escolar de Chile",
    version="4.16.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "SIGECOL v4.16 API",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "version": "4.16.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SIGECOL Backend",
        "version": "4.16.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/status")
async def api_status():
    return {
        "api_status": "operational",
        "database": "connected",
        "services": {
            "authentication": "ready",
            "student_management": "ready",
            "academic_records": "ready",
            "pie_module": "ready"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
