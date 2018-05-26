import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isValidUser = true;
  errorMessage: string;
  credentials: TokenPayload = {
    username: '',
    password: ''
  };
  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
    this._auth.routeUser();
    this.errorMessage = 'Username / password is invalid!';
  }

  doLogin() {
    this._auth.verifyUser(this.credentials).subscribe((res) => {
      this.isValidUser = true;
      this._auth.routeUser();
    }, err => {
      this.isValidUser = false;
      console.error(err.name);
    });

  }

}
