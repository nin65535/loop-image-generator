from fastapi import APIRouter
from config import config
from pathlib import Path

router = APIRouter()

@router.get("/index")
async def generate():
    image_dir = Path(config.get('image_dir'))
    files = [ p.name for p in list( image_dir.glob("*.png"))]
    files = sorted(files,reverse=True)

    return {
        "files":files,
        }