from sqlalchemy import Column, Integer, String
from .database import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)

    plague = Column(String, index=True)

    difficulty = Column(String)

    score = Column(Integer)

    screenshot = Column(String, nullable=True)


class Character(Base):
    __tablename__ = "characters"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True)

    slug = Column(String, unique=True)

    description = Column(String)

    personality = Column(String)

    universe = Column(String)

    image = Column(String, nullable=True)

from sqlalchemy import ForeignKey

class CharacterArt(Base):
    __tablename__ = "character_arts"

    id = Column(Integer, primary_key=True, index=True)

    character_id = Column(
        Integer,
        ForeignKey("characters.id")
    )

    title = Column(String)

    description = Column(String)

    image = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    username = Column(String, unique=True)

    password = Column(String)

