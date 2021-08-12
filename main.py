from fastapi import FastAPI
from schema.DAL import database
from routers import sightings

app = FastAPI()
app.include_router(sightings.router)

# database connection events 
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Hello World!"}