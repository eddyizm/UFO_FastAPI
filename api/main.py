from fastapi import FastAPI
from schema.DAL import database
from routers import sightings
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
    
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
    "https://ufo.datacureservices.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sightings.router)

def generate_html_response():
    html_content = """
    <html>
        <head>
            
        </head>
        <body>
            
    UFO! UFO!

        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)

# database connection events 
# @app.on_event("startup")
# async def startup():
#     await database.connect()

# @app.on_event("shutdown")
# async def shutdown():
#     await database.disconnect()



@app.get("/")
async def root():
    # return {"message": "Hello World!"}
    return generate_html_response()