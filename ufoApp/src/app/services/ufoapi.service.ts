import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UFO } from "../models/ufo";
import { Observable } from "rxjs";
import { ufo_locations } from '../models/locations';

const BASE_URL = 'http://127.0.0.1:8000/'

@Injectable({
  providedIn: 'root'
})
export class UfoapiService {

  constructor(private http: HttpClient) 
  {}

  getRandomUFO(): Observable<UFO> {
    return this.http.get<UFO>(BASE_URL + "sighting-random/");
  }
  
  getLocations(): Observable<ufo_locations[]>{
    return this.http.get<ufo_locations[]>(BASE_URL + "sighting-location/");
  }

  getStateLocationList(st: string): Observable<UFO[]>{
    return this.http.get<UFO[]>(`${BASE_URL}sightings/?state=${st}`);
  }

  
}
