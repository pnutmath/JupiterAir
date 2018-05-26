import { Component, OnInit } from '@angular/core';
import { Airline } from '../models/Airline';
import { AirlineService } from '../services/airline.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedFile: File;
  fileProgress: Number = 0;
  airlineList: Airline[] = [];
  airline: Airline = new Airline();
  constructor(private airlineService: AirlineService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadAirlineDetails();
  }
  processAirlineDetails(data: any) {
    this.airlineService.addAirlineDetails(<Airline>data, this.selectedFile).subscribe(event => {
      // console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.fileProgress = event.loaded / event.total * 100;
        console.log(this.fileProgress);
      } else if (event.type === HttpEventType.Response) {
        this.loadAirlineDetails();
        this.airline = new Airline();
      }

    });
  }

  fillItemForm(airline: Airline) {
    this.airline = airline;
  }

  formReset() {
    this.airline = new Airline();
  }

  loadAirlineDetails() {
    this.airlineService.getAirlinesDetails().subscribe((data) => {
      console.log(data);
      this.airlineList = <Airline[]>data;
    }, err => { console.error(err); });
  }


  removeItem(id) {
    this.airlineService.deleteAirlineDetails(id).subscribe((res) => {
      console.log(res);
      this.loadAirlineDetails();
    });
  }


  deleteConfirmation(content, id) {
    this.modalService.open(content).result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'delete') {
        this.removeItem(id);
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

  selectDPImage(event) {
    this.selectedFile = event.target.files[0];
  }

}
