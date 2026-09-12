from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime


class ModuleBase(BaseModel):
    """Base schema for Module"""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    order: int = Field(..., ge=1)
    content: Optional[str] = None
    is_active: bool = True


class ModuleCreate(ModuleBase):
    """Schema for creating a Module"""
    pass


class ModuleUpdate(BaseModel):
    """Schema for updating a Module"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    order: Optional[int] = Field(None, ge=1)
    content: Optional[str] = None
    is_active: Optional[bool] = None


class ModuleResponse(ModuleBase):
    """Schema for Module response"""
    id: int
    course_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    """Base schema for Course"""
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    difficulty_level: str = Field(..., pattern="^(beginner|intermediate|advanced)$")
    duration_hours: int = Field(..., ge=1)
    is_active: bool = True


class CourseCreate(CourseBase):
    """Schema for creating a Course"""
    pass


class CourseUpdate(BaseModel):
    """Schema for updating a Course"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    difficulty_level: Optional[str] = Field(None, pattern="^(beginner|intermediate|advanced)$")
    duration_hours: Optional[int] = Field(None, ge=1)
    is_active: Optional[bool] = None


class CourseResponse(CourseBase):
    """Schema for Course response"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    modules: List[ModuleResponse] = []
    
    class Config:
        from_attributes = True


class UserBase(BaseModel):
    """Base schema for User"""
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=255)
    role: str = Field(default="learner", pattern="^(learner|instructor|admin)$")


class UserCreate(UserBase):
    """Schema for creating a User"""
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    """Schema for User response"""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
