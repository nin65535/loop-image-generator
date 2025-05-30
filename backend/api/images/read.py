import pydash
import httpx
import json
import copy
from fastapi import APIRouter
from pathlib import Path
from config import config
from pydantic import BaseModel
from utils.paths import PROJECT_ROOT

router = APIRouter()

prompt_url = config.get('comfy_url') + '/prompt'
workflow_path = PROJECT_ROOT / config.get("workflow_dir") / 'read.json'

with open(file=workflow_path,encoding='utf-8') as f:
    workflow_template = json.load(f)

class Params(BaseModel):
    image : str

@router.post("/read")
async def read(params:Params):

    workflow = copy.deepcopy(workflow_template)
    image = Path(config.get("image_dir")) / params.image
    pydash.set_(workflow,'1.inputs.image' ,str(image))
    txt = image.with_suffix('.txt')
    pydash.set_(workflow,'3.inputs.file' ,str(txt))

    async with httpx.AsyncClient() as client:

    
        try:
            response = await client.post(prompt_url, json={"prompt": workflow})
            response.raise_for_status()  # HTTPエラーが発生した場合に例外を発生させる
            data = response.json()
            return {
                "success":True,
                "response" : data,
            }

        except httpx.RequestError:
            return {
                "success":False,
            }

