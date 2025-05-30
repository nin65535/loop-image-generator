# backend/test/test_generate.py
import pytest

@pytest.mark.asyncio
async def test_generate_image(async_client):
    response = await async_client.post("/api/images/generate", json={
        "prompt": "a cat",
        "width": 1024,
        "height": 1024,
        "count" : 4,
        "style" : 0,
        })
    assert response.status_code == 200
    assert "success" in response.json()  # 本当に返ってくる構造に応じて要調整
