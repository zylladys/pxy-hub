from fastapi import (
    APIRouter,
    HTTPException
)

from passlib.context import CryptContext

from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import User
from ..auth import create_access_token

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

@router.post("/register")
def register(data: dict):

    db: Session = SessionLocal()

    existing = (
        db.query(User)
        .filter(
            User.username == data["username"]
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = pwd_context.hash(
        data["password"]
    )

    user = User(
        username=data["username"],
        password=hashed_password
    )

    db.add(user)
    db.commit()

    return {"status": "created"}

@router.post("/login")
def login(data: dict):

    db: Session = SessionLocal()

    user = (
        db.query(User)
        .filter(
            User.username == data["username"]
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid = pwd_context.verify(
        data["password"],
        user.password
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": user.username}
    )

    return {
        "access_token": token
    }

    from jose import JWTError

def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        if username is None:
            return None

        return username

    except JWTError:
        return None