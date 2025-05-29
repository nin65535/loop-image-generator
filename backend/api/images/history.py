import requests
from fastapi import APIRouter
from config import config

router = APIRouter()
history_url = config.get('comfy_url') + '/history'

@router.get("/history/{prompt_id}")
async def history(prompt_id:str):
    try:
        response = requests.get(f"{history_url}/{prompt_id}")
        response.raise_for_status()  # HTTPエラーが発生した場合に例外を発生させる
        data = response.json()
        return {
            "success":True,
            "response" : data,
        }

    except requests.exceptions.RequestException:
        return {
            "success":False,
        }