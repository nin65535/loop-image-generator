import json
from utils.paths import PROJECT_ROOT
# 設定読み込み

config_path = PROJECT_ROOT / "config.json"
with open(file=config_path,encoding="utf-8") as f:
    config = json.load(f)