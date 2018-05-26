import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../models/Airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private httpClient: HttpClient) {

  }
  addAirlineDetails(airline: Airline, selectedFile: File) {
    console.log(airline);
    airline.airlinePic = selectedFile;
    if (airline._id) {
      return this.updateAirlineDetails(airline);
    }
    return this.httpClient.post('http://localhost:3000/api/airline', airline, {
      reportProgress: true,
      observe: 'events'
    });
  }
  updateAirlineDetails(airline: Airline) {
    return this.httpClient.put(`http://localhost:3000/api/airline/${airline._id}`, airline, {
      reportProgress: true,
      observe: 'events'
    });
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
