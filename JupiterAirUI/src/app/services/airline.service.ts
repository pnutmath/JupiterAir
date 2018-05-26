import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../models/Airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private httpClient: HttpClient) {

  }
  addAirlineDetails(airline: Airline) {
    console.log(airline);
    return this.httpClient.post('http://localhost:3000/api/airline', airline);
  }
  updateAirlineDetails(airline: Airline) {
    return this.httpClient.put(`http://localhost:3000/api/airline/${airline._id}`, airline);
  }
  deleteAirlineDetails(airline: Airline) {
    return this.httpClient.delete(`http://localhost:3000/api/airline/${airline._id}`);
  }
  getAirlineDetails(airline: Airline) {
    return this.httpClient.get(`http://localhost:3000/api/airline/${airline._id}`);
  }
  getAirlinesDetails() {
    return this.httpClient.get('http://localhost:3000/api/airlines');
  }
}
