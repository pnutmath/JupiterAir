import { Component, OnInit } from '@angular/core';
import { Airline } from '../models/Airline';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  airlineList: Airline[] = [];
  constructor(private airlineService: AirlineService) { }

  ngOnInit() {
    this.loadAirlineDetails();
  }
  processAirlineDetails(data: any) {
    this.airlineService.addAirlineDetails(<Airline>data).subscribe(res => {
      console.log(res);
    });
  }
  loadAirlineDetails() {
    console.log('data');
    this.airlineService.getAirlinesDetails().subscribe((data) => {
      console.log(data);
      this.airlineList = <Airline[]>data;
    }, err => { console.error(err); });
  }

}
