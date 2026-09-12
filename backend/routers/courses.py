from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging

from backend.database import get_db
from backend.models import Course, Module
from backend.schemas import (
    CourseCreate,
    CourseUpdate,
    CourseResponse,
    ModuleCreate,
    ModuleResponse
)

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """Create a new course"""
    try:
        db_course = Course(**course.model_dump())
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        logger.info(f"Created course: {db_course.id}")
        return db_course
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating course: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create course"
        )


@router.get("/", response_model=List[CourseResponse])
def get_courses(
    skip: int = 0,
    limit: int = 100,
    is_active: bool = None,
    db: Session = Depends(get_db)
):
    """Get all courses with optional filtering"""
    try:
        query = db.query(Course)
        if is_active is not None:
            query = query.filter(Course.is_active == is_active)
        courses = query.offset(skip).limit(limit).all()
        return courses
    except Exception as e:
        logger.error(f"Error fetching courses: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch courses"
        )


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    """Get a specific course by ID"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found"
        )
    return course


@router.put("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    course_update: CourseUpdate,
    db: Session = Depends(get_db)
):
    """Update a course"""
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found"
        )
    
    try:
        update_data = course_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_course, field, value)
        
        db.commit()
        db.refresh(db_course)
        logger.info(f"Updated course: {course_id}")
        return db_course
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating course: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update course"
        )


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    """Delete a course"""
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found"
        )
    
    try:
        db.delete(db_course)
        db.commit()
        logger.info(f"Deleted course: {course_id}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting course: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete course"
        )


@router.post("/{course_id}/modules", response_model=ModuleResponse, status_code=status.HTTP_201_CREATED)
def create_module(
    course_id: int,
    module: ModuleCreate,
    db: Session = Depends(get_db)
):
    """Create a new module for a course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found"
        )
    
    try:
        db_module = Module(**module.model_dump(), course_id=course_id)
        db.add(db_module)
        db.commit()
        db.refresh(db_module)
        logger.info(f"Created module: {db_module.id} for course: {course_id}")
        return db_module
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating module: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create module"
        )


@router.get("/{course_id}/modules", response_model=List[ModuleResponse])
def get_course_modules(course_id: int, db: Session = Depends(get_db)):
    """Get all modules for a specific course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found"
        )
    
    modules = db.query(Module).filter(Module.course_id == course_id).order_by(Module.order).all()
    return modules
