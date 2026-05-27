from fastapi import Depends
from ..dependencies import get_current_user
import cloudinary.uploader

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Character
from app.cloudinary_config import *

router = APIRouter()

@router.get("/characters")
def get_characters():

    db: Session = SessionLocal()

    characters = db.query(Character).all()

    return [
        {
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "description": c.description,
            "personality": c.personality,
            "universe": c.universe,
            "image": c.image
        }
        for c in characters
    ]

@router.get("/characters/{slug}")
def get_character(slug: str):

    db: Session = SessionLocal()

    character = (
        db.query(Character)
        .filter(Character.slug == slug)
        .first()
    )

    if not character:
        return {"error": "Not found"}

    return {
        "id": character.id,
        "name": character.name,
        "slug": character.slug,
        "description": character.description,
        "personality": character.personality,
        "universe": character.universe,
        "image": character.image
    }

@router.post("/characters")
async def create_character(
    current_user: str = Depends(
    get_current_user
),

    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(...),
    personality: str = Form(...),
    universe: str = Form(...),
    image: UploadFile = File(None)
):

    db: Session = SessionLocal()

    image_path = None

    if image:

        result = cloudinary.uploader.upload(
            image.file,

            folder="pxy-hub/characters"
    )

    image_url = result["secure_url"]

    image=image_url

    character = Character(
        name=name,
        slug=slug,
        description=description,
        personality=personality,
        universe=universe,
        image=image
    )

    db.add(character)
    db.commit()

    return {"status": "created"}

@router.delete("/characters/{id}")
def delete_character(
    id: int,
    current_user: str = Depends(
        get_current_user
    )
):

    db: Session = SessionLocal()

    character = (
        db.query(Character)
        .filter(Character.id == id)
        .first()
    )

    if not character:
        return {"error": "Not found"}

    db.delete(character)
    db.commit()

    return {"status": "deleted"}


@router.put("/characters/{id}")
async def update_character(
    id: int,

    current_user: str = Depends(
        get_current_user
    ),

    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(...),
    personality: str = Form(...),
    universe: str = Form(...)
):

    db: Session = SessionLocal()

    character = (
        db.query(Character)
        .filter(Character.id == id)
        .first()
    )

    if not character:
        return {"error": "Not found"}

    character.name = name
    character.slug = slug
    character.description = description
    character.personality = personality
    character.universe = universe

    db.commit()

    return {"status": "updated"}