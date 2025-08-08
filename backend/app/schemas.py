from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class OrganizationBase(BaseModel):
    name: str
    legal_name: str
    rut: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class SchoolBase(BaseModel):
    name: str
    rbd: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    timezone: str = "America/Santiago"

class SchoolCreate(SchoolBase):
    organization_id: int

class SchoolResponse(SchoolBase):
    id: int
    organization_id: int
    created_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class LicenseBase(BaseModel):
    module_name: str
    is_active: bool = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class LicenseCreate(LicenseBase):
    school_id: int

class LicenseResponse(LicenseBase):
    id: int
    school_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
