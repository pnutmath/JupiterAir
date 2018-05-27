import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { Airline } from '../models/Airline';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  airlineList: Airline[];
  airlineSingle: Airline;
  isWarning = false;
  warningMessage: String;

  constructor(private airlineService: AirlineService, private modalService: NgbModal, private authService: AuthenticationService) { }

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
    this.airlineSingle = new Airline();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getAverageRating(rating: any) {
    if (rating.length === 0) {
      return 'No';
    }
    const avgRate = rating.reduce(function (ele, currentValue) {
      return ele.rate + currentValue.rate;
    });
    return (avgRate.rate || avgRate) / rating.length;
  }
  showWarning(message: String) {
    this.isWarning = true;
    this.warningMessage = message;
  }
  addReview(content, airline: Airline) {
    if (!this.authService.isLoggedIn()) { this.showWarning('You should login first before review'); return; }
    this.airlineSingle = airline;
    this.modalService.open(content).result.then((result) => {
      const reviewData = {
        airline_id: this.airlineSingle._id,
        rating: result.rating.value,
        comment: result.comment.value
      };
      this.airlineService.submitReview(reviewData).subscribe(res => {
        console.log(res);
        this.loadAirlines();
      }, err => {
        // if(err.statusText===" ")
        console.error(err);
      });
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  mouseStarEnter(position: Number) {
    for (let i = 0; i < position; i++) {
      console.log(i);

    }
  }
}
