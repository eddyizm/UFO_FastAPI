'''
All the ufo sightings come from here
'''
from fastapi import APIRouter, status
from typing import List, Optional
from schema.DAL import DATABASE_URL, ufo_sightings, database, new_ufos
from schema.models import UFO_Locations, UFO_Reports, UFO_Summary, UFO_Dates, New_UFO
from sqlalchemy import select, func
from datetime import datetime
from time import sleep

router = APIRouter()

# report sighting
@router.post("/sighting/", status_code=status.HTTP_201_CREATED)
async def new_sighting(nUFO: New_UFO):
    ''' report new sighting'''
    print('new request received: ', nUFO)
    sleep(5)
    query = new_ufos.insert().values(city = nUFO.city,
        date = nUFO.date,
        state = nUFO.state,
        zip = nUFO.zip,
        country = nUFO.country,
        report = nUFO.report)
    result = await database.execute(query)
    return f"created new ufo with id {result}"


# TODO add paging style? 
@router.get("/sightings/", response_model=List[UFO_Reports])
async def sightings(state: Optional[str] = None):
    ''' Returns 100 sightings '''
    if state:
        query = ufo_sightings.select().where(ufo_sightings.c.state == state.upper()).limit(100)
        return await database.fetch_all(query)     
    query = ufo_sightings.select().limit(100)
    print(query)
    return await database.fetch_all(query)
     

# TODO make sure case insensitive     
@router.get("/sightings-by-city/{city}", response_model=List[UFO_Reports])
async def sightings_by_city(city: str):
    ''' Returns sightings by city '''
    query = ufo_sightings.select().where(ufo_sightings.c.city == city)
    print(query)
    return await database.fetch_all(query)     


@router.get("/sighting-location/", response_model=List[UFO_Locations])
async def  sighting_localtion(q: Optional[str] = None):
    ''' Returns sightings by location, eg. state or country if foreign. '''
    query = select([ufo_sightings.c.state,  func.count(ufo_sightings.c.id).label('count')]).group_by(ufo_sightings.c.state)
    return await database.fetch_all(query)     


@router.get("/sightings-by-id/{id}", response_model=UFO_Reports)
async def sightings_by_id(id: int):
    ''' Return a specific sighting by id. '''
    query = ufo_sightings.select().where(ufo_sightings.c.id == id)
    print(query)
    return await database.fetch_one(query)     


@router.get("/sighting-random/",  response_model=UFO_Reports)
async def sighting_random():
    ''' Return one random result '''
    query = ufo_sightings.select().order_by(func.random()).limit(1)    
    return await database.fetch_one(query)


@router.get("/sighting-summary/", response_model=List[UFO_Summary])
async def sightings_summary(myear: Optional[str] = None, state: Optional[str] = None):
    ''' Returns sightings summary by monthyear or state.'''
    if myear:
        query = '''
        select id, city, state, summary, date_time            
            from ufo_sightings
            where strftime("%m/%Y", date_time) = :_myear
			ORDER BY strftime("%Y", date_time) DESC
        '''
        return await database.fetch_all(query=query, values={"_myear": myear})     
    if state:
        query = '''
            select id, city, state, summary, date_time            
            from ufo_sightings
            where state = :_state
			ORDER BY strftime("%Y", date_time) DESC
        '''
        # ufo_sightings.select().where(ufo_sightings.c.state == state.upper()).limit(100)
        return await database.fetch_all(query=query, values={"_state": state})     
    

@router.get("/sighting-dates/", response_model=List[UFO_Dates])
async def  sighting_dates(q: Optional[str] = None):
    ''' Returns sightings by month/year. '''
    query = ''' select 
            CASE WHEN date_time = ''
            THEN "UKNOWN" ELSE
            strftime("%m/%Y", date_time) 
            END AS month_year
            , count(id) as count
            from ufo_sightings
            group by strftime("%m/%Y", date_time)
            ORDER BY strftime("%Y", date_time) DESC '''
    return await database.fetch_all(query)     