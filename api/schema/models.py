'''
Models 
Guess I'm following a django pattern?
'''
from pydantic import BaseModel

class UFO_Locations(BaseModel):
    state: str
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

