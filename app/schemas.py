from enum import Enum

from pydantic import BaseModel
from typing import List


class Item(BaseModel):
    time: str
    author: str
    title: str
    url: str


class ListItemOut(BaseModel):
    count: int
    list: List[Item]


class Info(BaseModel):
    title: str
    content: str


class Url(BaseModel):
    url: str


class Type(Enum):
    public = "public"
    notice = "notice"


