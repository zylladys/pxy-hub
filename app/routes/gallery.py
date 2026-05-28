import cloudinary.uploader
from app.cloudinary_config import *

from fastapi import Depends
from ..dependencies import get_current_user

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from ..dependencies import (
    require_admin
)

from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import (
    CharacterArt
)

router = APIRouter()

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
    current_user = Depends(
        require_admin
    ),

    character_id: int = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):

    db: Session = SessionLocal()

    result = cloudinary.uploader.upload(
    image.file,
    folder="pxy-hub/gallery"
    )

    image_url = result["secure_url"]

    art = CharacterArt(
        character_id=character_id,
        title=title,
        description=description,
        image=image_url
    )

    db.add(art)
    db.commit()

    return {"status": "uploaded"}