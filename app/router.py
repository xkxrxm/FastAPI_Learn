from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from .crawl import crawler

from app.database import get_db
from app.schemas import ListItemOut, Info, Url, Type

router = APIRouter()


@router.get("/get_title", response_model=ListItemOut)
async def get_title(
        t: Type,
        page: int,
        db: Session = Depends(get_db)
):
    sql = f"SELECT time,author,title,url FROM bupt_daily_news where type = '{t.value}' ORDER BY time DESC LIMIT 20 offset {20*page}"
    result = db.execute(text(sql))
    data = [{"time": str(row[0]), "author": row[1], "title": row[2], "url": row[3]} for row in result]
    return {"count": len(data), "list": data}


@router.post("/get_info", response_model=Info)
async def get_info(
        url: Url
):
    return crawler.get_detail(url.url)
