'''
DATA ACCESS LAYER 
Sql Alchemy connection and metadata
'''
import sqlalchemy
import databases
DATABASE_URL = "sqlite:///./ufo.db"
# DATABASE_URL = "postgresql://user:password@postgresserver/db"

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(
    DATABASE_URL, echo = True, connect_args={"check_same_thread": False}
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