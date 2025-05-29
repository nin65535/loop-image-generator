from fastapi import APIRouter,UploadFile
from config import config
from pathlib import Path
import shutil

router = APIRouter()

@router.post("/upload")
async def upload(file:UploadFile):
    image_dir = Path(config.get('image_dir'))
    dest = image_dir / file.filename

    try:
        with dest.open("wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
                       
        return {"success": True, "filename": file.filename}
    except Exception as e:
        return {"success": False, "error": str(e)}
    
