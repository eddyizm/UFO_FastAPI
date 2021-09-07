# UFO_FastAPI
Converting a flat file to a database and creating a REST api using FastAPI. Front end to come later...

##  Source File

UFO Sightings csv -> https://www.kaggle.com/rishidamarla/ufo-sightings-approx-100000

Download the csv file and convert to sqlite database. 

Import csv file as table using DB browser -> https://sqlitebrowser.org/

Add new column `id` type `Integer` check box for `pk` (primary key)

## Create repo  

Create new repo and clone it. Or you can clone this project

```
git clone https://github.com/eddyizm/UFO_FastAPI.git

```

## Set up Python Environment

Create a virtual environment for this project where `env` is the name of the new virtual environment aka folder. You can name this anything you want but make it is in your `.gitignore` so you don't check it into source control.

``` 
# change directory into new repo
cd UFO_FastAPI
# create virtual env
python -m venv env 
# install requirements
pip install -r requirements.txt
```

### launch main.py
```
uvicorn main:app --reload
```

# Front end (Angular )

```
 ng new ufoApp --skip-install=true
```
