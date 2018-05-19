import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
  }

  doRegister(loginform: NgForm): void {
    const user: User = loginform.value;
    this._auth.registerUser(user).subscribe((res) => {
      console.log(res);
      // TODO: let me check what to do
    });

  }

}
