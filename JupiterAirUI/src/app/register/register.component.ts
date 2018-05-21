import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    name: '',
    username: '',
    password: '',
  };
  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
    this._auth.routeUser();
  }

  doRegister() {
    this._auth.registerUser(this.credentials).subscribe((res) => {
      this._auth.routeUser();
    }, err => {
      console.error(err);
    });

  }

}
