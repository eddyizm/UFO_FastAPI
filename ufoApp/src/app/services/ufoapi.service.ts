import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UFO } from "../models/ufo";
import { Observable } from "rxjs";

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
  
}
