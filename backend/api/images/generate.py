import pydash
import httpx
import json
import copy
import random
from fastapi import APIRouter
from pathlib import Path
from config import config
from pydantic import BaseModel

router = APIRouter()

prompt_url = config.get('comfy_url') + '/prompt'
workflow_templates = []

for i in range(1, 4):
    workflow_path = Path(config.get("workflow_dir")).joinpath(f'generate{i:02}.json')
    with open(workflow_path, encoding='utf-8') as f:
        workflow_templates.append(json.load(f))


class Params(BaseModel):
    prompt : str
    width: int
    height: int
    count: int
    style: int

@router.post("/generate")
async def generate(params:Params):

    workflow = copy.deepcopy(workflow_templates[params.style])

    pydash.set_(workflow,'6.inputs.text' , params.prompt + ',' + pydash.get(workflow,'6.inputs.text'))
    pydash.set_(workflow,'3.inputs.seed' , random.randrange(0,0x10000000))
    pydash.set_(workflow,'5.inputs.width', params.width)
    pydash.set_(workflow,'5.inputs.height', params.height)
    pydash.set_(workflow,'5.inputs.batch_size', params.count)

    async with httpx.AsyncClient() as client:  # 非同期クライアントを使用

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

