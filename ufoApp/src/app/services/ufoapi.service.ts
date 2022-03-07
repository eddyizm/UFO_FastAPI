import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UFO } from "../models/ufo";
import { Observable } from "rxjs";
import { ufo_locations } from '../models/locations';
import { UFO_Dates} from '../models/ufo_dates';
import { ufo_summary } from '../models/summary';
import { NewUFO } from '../models/new_ufo';

//const BASE_URL = 'http://localhost:8000/' // DEV
const BASE_URL = 'http://localhost:8000/api/v1/' // DEV
//const BASE_URL = 'https://api.datacureservices.com/' //PROD

@Injectable({
  providedIn: 'root'
})
export class UfoapiService {

  constructor(private http: HttpClient) 
  {}

  reportNewUfo(_ufo: NewUFO): Observable<any>{
    return this.http.post(`${BASE_URL}sighting/`, _ufo, {observe: 'response'});
  }

  getUFODetail(id: string): Observable<UFO> {
    return this.http.get<UFO>(`${BASE_URL}sightings-by-id/${id}`);
  }

  getRandomUFO(): Observable<UFO> {
    return this.http.get<UFO>(`${BASE_URL}sighting-random/`);
  }
  
  getLocations(): Observable<ufo_locations[]>{
    return this.http.get<ufo_locations[]>(`${BASE_URL}sighting-location/`);
  }

  getStateLocationList(st: string): Observable<UFO[]>{
    return this.http.get<UFO[]>(`${BASE_URL}sightings/?state=${st}`);
  }

  getLocateDateList(): Observable<UFO_Dates[]>{
    return this.http.get<UFO_Dates[]>(`${BASE_URL}sighting-dates/`);
  }


  getSummary(_state: string = '', _myear: string = ''): Observable<ufo_summary[]>{
    if (_myear != ''){
      return this.http.get<ufo_summary[]>(`${BASE_URL}sighting-summary/?myear=${_myear}`);  
    }
    if (_state != ''){
      return this.http.get<ufo_summary[]>(`${BASE_URL}sighting-summary/?state=${_state}`);  
    }
  }
}
