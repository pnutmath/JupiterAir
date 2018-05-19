import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  verifyUser(userdata: User) {
    return this.httpClient.post('http://localhost:3000/api/login', userdata);
  }
  registerUser(userdata: User) {
    return this.httpClient.post('http://localhost:3000/api/register', userdata);
  }
}
