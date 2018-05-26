import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface UserDetails {
  _id: string;
  name: string;
  username: string;
  password: string;
  exp: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  name?: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;

  constructor(private httpClient: HttpClient, private router: Router) { }
  verifyUser(userdata: TokenPayload): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/login', userdata).pipe(map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
    })
    );
  }
  registerUser(userdata: TokenPayload) {
    return this.httpClient.post('http://localhost:3000/api/register', userdata).pipe(map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
    })
    );
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  private saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('user-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('user-token');
    this.router.navigateByUrl('/');
  }

  routeUser() {
    const userDetails = this.getUserDetails();
    if (!userDetails) { return; }
    if (userDetails.username === 'admin') {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
