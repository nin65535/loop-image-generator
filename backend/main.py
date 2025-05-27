from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from config import config
import os


IMAGE_DIR = config.get("image_dir", "./images")
FRONTEND_DIST = config.get("frontend_dist", "frontend/dist")
INDEX_PATH = os.path.join(FRONTEND_DIST, "index.html")

app = FastAPI()

# CORS (必要に応じて調整)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番では制限推奨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 画像ディレクトリを /images にマウント
app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")


# API マウント
from api import api_router
app.include_router(api_router,prefix='/api')


# React SPA のビルド済みファイル（Vite の dist ディレクトリ）
app.mount("/static", StaticFiles(directory=FRONTEND_DIST), name="static")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # /api や /images に一致しない場合は index.html を返す（SPA）
    if os.path.exists(INDEX_PATH):
        return FileResponse(INDEX_PATH, media_type="text/html")
    return HTMLResponse("<h1>index.html not found</h1>", status_code=404)
