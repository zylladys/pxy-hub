from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import engine
from .models import Base
from .routes.records import router as records_router
from .routes.characters import router as characters_router
from .routes.gallery import router as gallery_router
from .routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(records_router)
app.include_router(characters_router)
app.include_router(gallery_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Sistema online"}