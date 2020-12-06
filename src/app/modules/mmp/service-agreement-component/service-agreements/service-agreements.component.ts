import { ReportsService } from 'src/app/services/reports/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-agreements',
  templateUrl: './service-agreements.component.html',
  styleUrls: ['./service-agreements.component.scss']
})
export class ServiceAgreementsComponent implements OnInit {

  isHidden: boolean;
  runningAgreements: any[];
  expiredAgreements: any[];
 
  constructor(private service: ReportsService) { 
    this.runningAgreements = [];
    this.expiredAgreements = [];
  }
 
  ngOnInit() {
    this.getData();
  }

  changeList() {
    this.isHidden = !this.isHidden;
  }

  getData() {
    var i;
    this.service.getAllAgreements().subscribe((response : any) => {
      for(i = 0; i < response.recordset.length; i++) {
        if(response.recordset[i].STATUS === "Running") {
          this.runningAgreements.push(response.recordset[i]);
        }
        else {
          this.expiredAgreements.push(response.recordset[i]);
        }
      }
      console.log(this.expiredAgreements)
      console.log(this.runningAgreements);
    });
  }
}
