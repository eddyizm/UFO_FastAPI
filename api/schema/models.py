'''
Models 
Guess I'm following a django pattern?
'''
from sqlite3 import Date
from typing import Optional
from pydantic import BaseModel

class New_UFO(BaseModel):
    date: str
    city: str
    state: str
    zip: str
    country: str
    report: str


class UFO_Summary(BaseModel):
    id: int
    city: str
    state: str
    summary: str
    date_time: str


class UFO_Locations(BaseModel):
    state: str
    count : int
    fullstate: Optional[str] = ''


class UFO_Dates(BaseModel):
    month_year: str
    count : int


class UFO_Reports(BaseModel):
    id: int
    summary: str
    city: str
    state: str
    date_time: str
    shape: str
    duration: str
    stats: str
    report_link: str
    text: str
    posted: str
    city_latitude: str
    city_longitude: str
    class Config:
        orm_mode = True

