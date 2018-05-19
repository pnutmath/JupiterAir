import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
  }

  doLogin(loginform: NgForm): void {
    const user: User = loginform.value;
    this._auth.verifyUser(user).subscribe((res) => {
      console.log(res);
      // TODO: let me check what to do
    });

  }

}
