import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AirlineService } from './services/airline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public auth: AuthenticationService) {

  }
}
