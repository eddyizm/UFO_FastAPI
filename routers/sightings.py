'''
All the ufo sightings come from here
'''
from fastapi import APIRouter
from typing import List
from schema.DAL import DATABASE_URL, ufo_sightings, database
from schema.models import UFO_Locations, UFO_Reports
from sqlalchemy import select, func

router = APIRouter()

@router.get("/sightings/", response_model=List[UFO_Reports])
async def sightings():
    query = ufo_sightings.select().limit(100)
    print(query)
    return await database.fetch_all(query)
     
@router.get("/sightings-by-city/{city}", response_model=List[UFO_Reports])
async def sightings_by_city(city: str):
    query = ufo_sightings.select().where(ufo_sightings.c.city == city)
    print(query)
    return await database.fetch_all(query)     
    
@router.get("/sighting-location/", response_model=List[UFO_Locations])
async def  sighting_localtion():
    query = select([ufo_sightings.c.state,  func.count(ufo_sightings.c.id).label('count')]).group_by(ufo_sightings.c.state)
    return await database.fetch_all(query)     

@router.get("/sightings-by-id/{id}", response_model=UFO_Reports)
async def sightings_by_id(id: int):
    query = ufo_sightings.select().where(ufo_sightings.c.id == id)
    print(query)
    return await database.fetch_one(query)     