import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { Airline } from '../models/Airline';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  airlineList: Airline[];
  airlineSingle: Airline;
  constructor(private airlineService: AirlineService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadAirlines();
  }

  loadAirlines() {
    this.airlineService.getAirlinesDetails().subscribe(res => {
      this.airlineList = <Airline[]>res;
    });
  }


  viewAirlineDetails(content, airline: Airline) {
    this.airlineSingle = airline;
    this.modalService.open(content).result.then((result) => {
      // console.log(`Closed with: ${result}`);
      if (result === 'delete') {
        console.log('asdf');
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
