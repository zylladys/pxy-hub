import os

import cloudinary.uploader

from app.cloudinary_config import *

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Record

router = APIRouter()

@router.get("/records")
def get_records():

    db: Session = SessionLocal()

    records = db.query(Record).all()

    return [
        {
            "id": r.id,
            "plague": r.plague,
            "difficulty": r.difficulty,
            "score": r.score,
            "screenshot": r.screenshot
        }
        for r in records
    ]

@router.post("/records")
async def add_record(
    plague: str = Form(...),
    difficulty: str = Form(...),
    score: int = Form(...),
    screenshot: UploadFile = File(None)
):

    db: Session = SessionLocal()

    screenshot_path = None

    if screenshot:

        result = cloudinary.uploader.upload(
        screenshot.file,

        folder="pxy-hub/records"
        )

        image_url = result["secure_url"]

        screenshot_path = image_url

    new_record = Record(
        plague=plague,
        difficulty=difficulty,
        score=score,
        screenshot=screenshot_path
    )

    db.add(new_record)
    db.commit()

    return {"status": "saved"}