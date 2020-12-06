import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls/calls.service';

@Component({
  selector: 'app-compncalls',
  templateUrl: './compncalls.component.html',
  styleUrls: ['./compncalls.component.scss']
})
export class CompncallsComponent implements OnInit {
  isFetched: boolean;

  utc = new Date();
  dataDate = this.formatDate(this.utc);

  complaints: any[];
 
  constructor(private service: CallsService) { 
    this.complaints = [];
  }
 
  ngOnInit() {
    this.getData(this.dataDate);
  }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  getData(date: string) {
    var i: number;
    this.service.getAllComplaints(date).subscribe((response : any) => {
      this.complaints = response.recordset;
      console.log(this.complaints);
      this.isFetched = !this.isFetched;
    });
  }

  submitDate(date) {
    this.dataDate = this.formatDate(date);
    this.complaints = [];
    this.getData(this.dataDate);
    this.isFetched = !this.isFetched;
    console.log(this.dataDate);
    console.log(date);
  }

}
