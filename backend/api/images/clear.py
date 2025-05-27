import requests
from fastapi import APIRouter
from config import config
from pathlib import Path

router = APIRouter()

@router.get("/clear")
async def clear():
    try:
        image_dir = Path(config.get('image_dir'))
        for file in image_dir.iterdir():
            if file.is_file():
                file.unlink()
        return {
            "success":True,
        }

    except requests.exceptions.RequestException as e:
        return {
            "success":False,
        }