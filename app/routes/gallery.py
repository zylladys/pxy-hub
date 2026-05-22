from fastapi import Depends
from ..dependencies import get_current_user

import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import (
    CharacterArt
)

router = APIRouter()

UPLOAD_DIR = "uploads/gallery"

@router.get("/gallery/{character_id}")
def get_gallery(character_id: int):

    db: Session = SessionLocal()

    arts = (
        db.query(CharacterArt)
        .filter(
            CharacterArt.character_id == character_id
        )
        .all()
    )

    return [
        {
            "id": art.id,
            "title": art.title,
            "description": art.description,
            "image": art.image
        }
        for art in arts
    ]

@router.post("/gallery")
async def upload_art(
    current_user: str = Depends(
        get_current_user
    ),
    
    character_id: int = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):

    db: Session = SessionLocal()

    file_path = (
        f"{UPLOAD_DIR}/{image.filename}"
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    art = CharacterArt(
        character_id=character_id,
        title=title,
        description=description,
        image=file_path
    )

    db.add(art)
    db.commit()

    return {"status": "uploaded"}