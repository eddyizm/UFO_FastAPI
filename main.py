from fastapi import FastAPI
from typing import List
# import sqlalchemy
from sqlalchemy import select, func
from schema.models import UFO_Locations, UFO_Reports
from schema.DAL import DATABASE_URL, ufo_sightings, database

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}


# database connection events 
@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/sightings/", response_model=List[UFO_Reports])
async def sightings():
    query = ufo_sightings.select().limit(100)
    print(query)
    return await database.fetch_all(query)
     
@app.get("/sightings-by-city/{city}", response_model=List[UFO_Reports])
async def sightings_by_city(city: str):
    query = ufo_sightings.select().where(ufo_sightings.c.city == city)
    print(query)
    return await database.fetch_all(query)     
    
@app.get("/sighting-location/", response_model=List[UFO_Locations])
async def  sighting_localtion():
    query = select([ufo_sightings.c.state,  func.count(ufo_sightings.c.id).label('count')]).group_by(ufo_sightings.c.state)
    return await database.fetch_all(query)     

@app.get("/sightings-by-id/{id}", response_model=UFO_Reports)
async def sightings_by_id(id: int):
    query = ufo_sightings.select().where(ufo_sightings.c.id == id)
    print(query)
    return await database.fetch_one(query)     