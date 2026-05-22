import os

from sqlalchemy import create_engine

from sqlalchemy.orm import (
    sessionmaker,
    declarative_base
)

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)

if DATABASE_URL:

    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+psycopg2://"
    )

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()