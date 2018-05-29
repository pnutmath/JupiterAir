import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../models/Airline';
import { AuthenticationService } from './authentication.service';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {

  }
  addAirlineDetails(airline: Airline, selectedFile: File) {
    console.log(airline);
    airline.airlinePic = selectedFile;
    if (airline._id) {
      return this.updateAirlineDetails(airline);
    }
    return this.httpClient.post(`${Config.API_URL}airline`, airline, {
      reportProgress: true,
      observe: 'events',
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
  updateAirlineDetails(airline: Airline) {
    return this.httpClient.put(`${Config.API_URL}airline/${airline._id}`, airline, {
      reportProgress: true,
      observe: 'events',
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
  deleteAirlineDetails(airline: Airline) {
    return this.httpClient.delete(`${Config.API_URL}airline/${airline._id}`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
  getAirlineDetails(airline: Airline) {
    return this.httpClient.get(`${Config.API_URL}airline/${airline._id}`);
  }
  getAirlinesDetails() {
    return this.httpClient.get(`${Config.API_URL}airlines`);
  }
  submitReview(reviewData: any) {
    return this.httpClient.post(`${Config.API_URL}airline/${reviewData.airline_id}/review`, reviewData, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}
