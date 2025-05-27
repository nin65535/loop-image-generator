import os
import importlib
from fastapi import APIRouter

router = APIRouter()

# 現在のパッケージ名（images）
package = __name__

# カレントディレクトリのファイルをスキャン
for filename in os.listdir(os.path.dirname(__file__)):
    if filename.startswith("_") or not filename.endswith(".py"):
        continue

    modulename = filename[:-3]  # 拡張子 .py を削除

    # モジュールを "images.generate" のようにインポート
    module = importlib.import_module(f".{modulename}", package)

    # router が存在するなら include
    if hasattr(module, "router"):
        router.include_router(module.router)