from fastapi import FastAPI
import databases
from pydantic import BaseModel
from typing import List
import sqlalchemy


# SQLAlchemy specific code, as with any other app
DATABASE_URL = "sqlite:///./.ufo.db"
# DATABASE_URL = "postgresql://user:password@postgresserver/db"

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

ufo_sightings = sqlalchemy.Table(
    "ufo_sightings",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("summary", sqlalchemy.String),
    sqlalchemy.Column("city", sqlalchemy.String),
    sqlalchemy.Column("state", sqlalchemy.String),
    sqlalchemy.Column("date_time", sqlalchemy.String),
    sqlalchemy.Column("shape", sqlalchemy.String),
    sqlalchemy.Column("duration", sqlalchemy.String),
    sqlalchemy.Column("stats", sqlalchemy.String),
    sqlalchemy.Column("report_link", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String),
    sqlalchemy.Column("posted", sqlalchemy.String),
    sqlalchemy.Column("city_latitude", sqlalchemy.String),
    sqlalchemy.Column("city_longitude", sqlalchemy.String)    
)

metadata.create_all(engine)
#  model classes TODO Move out later
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
    

