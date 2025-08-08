from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime

from .database import engine, get_db
from .models import Base, Organization, School, License, Contract
from .schemas import OrganizationCreate, OrganizationResponse, SchoolCreate, SchoolResponse, LicenseCreate, LicenseResponse

database_available = False

try:
    if engine:
        Base.metadata.create_all(bind=engine)
        database_available = True
        print("✅ Database tables created successfully")
    else:
        print("⚠️ Database engine not available - tables not created")
except Exception as e:
    print(f"⚠️ Warning: Could not create database tables: {e}")
    print("Database tables will be created when database connection is available")

app = FastAPI(
    title="SIGECOL v4.16 API",
    description="Sistema Integral de Gestión Escolar de Chile - Multi-tenant",
    version="4.16.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://37.27.198.175:3000", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "SIGECOL v4.16 API - Multi-tenant",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "version": "4.16.0"
    }

@app.get("/health")
async def health_check():
    global database_available
    
    db_status = "disconnected"
    try:
        if engine:
            with engine.connect() as conn:
                conn.execute("SELECT 1")
                db_status = "connected"
                database_available = True
    except Exception as e:
        print(f"Health check database test failed: {e}")
        database_available = False
    
    status = "healthy" if database_available else "degraded"
    
    return {
        "status": status,
        "service": "SIGECOL Backend",
        "version": "4.16.0",
        "database": db_status,
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
            "pie_module": "ready",
            "multi_tenant": "ready"
        }
    }

@app.post("/admin/organizations", response_model=OrganizationResponse)
async def create_organization(org: OrganizationCreate, db: Session = Depends(get_db)):
    db_org = Organization(**org.dict())
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    return db_org

@app.get("/admin/organizations", response_model=List[OrganizationResponse])
async def list_organizations(db: Session = Depends(get_db)):
    return db.query(Organization).filter(Organization.is_active == True).all()

@app.get("/admin/organizations/{org_id}", response_model=OrganizationResponse)
async def get_organization(org_id: int, db: Session = Depends(get_db)):
    org = db.query(Organization).filter(Organization.id == org_id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@app.post("/admin/schools", response_model=SchoolResponse)
async def create_school(school: SchoolCreate, db: Session = Depends(get_db)):
    org = db.query(Organization).filter(Organization.id == school.organization_id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    db_school = School(**school.dict())
    db.add(db_school)
    db.commit()
    db.refresh(db_school)
    return db_school

@app.get("/admin/schools", response_model=List[SchoolResponse])
async def list_schools(organization_id: int = None, db: Session = Depends(get_db)):
    query = db.query(School).filter(School.is_active == True)
    if organization_id:
        query = query.filter(School.organization_id == organization_id)
    return query.all()

@app.get("/admin/schools/{school_id}", response_model=SchoolResponse)
async def get_school(school_id: int, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    return school

@app.post("/admin/licenses", response_model=LicenseResponse)
async def create_license(license: LicenseCreate, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.id == license.school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    
    db_license = License(**license.dict())
    db.add(db_license)
    db.commit()
    db.refresh(db_license)
    return db_license

@app.get("/admin/licenses", response_model=List[LicenseResponse])
async def list_licenses(school_id: int = None, db: Session = Depends(get_db)):
    query = db.query(License)
    if school_id:
        query = query.filter(License.school_id == school_id)
    return query.all()

@app.get("/admin/dashboard")
async def admin_dashboard(db: Session = Depends(get_db)):
    total_orgs = db.query(Organization).filter(Organization.is_active == True).count()
    total_schools = db.query(School).filter(School.is_active == True).count()
    total_licenses = db.query(License).filter(License.is_active == True).count()
    
    return {
        "total_organizations": total_orgs,
        "total_schools": total_schools,
        "total_licenses": total_licenses,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
