import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})
export class FinancialsComponent implements OnInit {

  showTB: boolean;
  showPL: boolean;
  showIS: boolean;
  showCF: boolean;

  showYearTrialBalance: boolean;

  preYearTBData: any[];
  preYearTotal = {
    DR_OPBAL: 0,
    CR_OPBAL: 0,
    DR_BAL: 0,
    CR_BAL: 0,
    DR_NETBAL: 0,
    CR_NETBAL: 0,
  }
  curYearTBData: any[];
  curYearTotal = {
    DR_OPBAL: 0,
    CR_OPBAL: 0,
    DR_BAL: 0,
    CR_BAL: 0,
    DR_NETBAL: 0,
    CR_NETBAL: 0,
  }

  utc = new Date();
  dataYear = this.formatYear(this.utc);
  curYear = this.dataYear;
  preYear = this.dataYear-1;

  constructor(private service: ReportsService) { }

  ngOnInit() {
    this.showTB = true;
    this.showPL = false;
    this.showIS = false;
    this.showCF = false;
    this.getYearWiseData();
  }

  getYearWiseData(){ 
    var i: number;
    //Current year
    this.service.getTrialBalance(this.curYear.toString()).subscribe((response : any) => {
      this.curYearTBData = response.recordset;
      for(i=0; i < this.curYearTBData.length; i++) {
        this.curYearTotal.DR_OPBAL += this.curYearTBData[i].DR_OPBAL;
        this.curYearTotal.CR_OPBAL += this.curYearTBData[i].CR_OPBAL;
        this.curYearTotal.DR_BAL += this.curYearTBData[i].DR_BAL;
        this.curYearTotal.CR_BAL += this.curYearTBData[i].CR_BAL;
        this.curYearTotal.DR_NETBAL += this.curYearTBData[i].DR_NETBAL;
        this.curYearTotal.CR_NETBAL += this.curYearTBData[i].CR_NETBAL;
      };
    });
    //Previous year
    this.service.getTrialBalance(this.preYear.toString()).subscribe((response : any) => {
      this.preYearTBData = response.recordset;
      for(i=0; i < this.curYearTBData.length; i++) {
        this.preYearTotal.DR_OPBAL += this.preYearTBData[i].DR_OPBAL;
        this.preYearTotal.CR_OPBAL += this.preYearTBData[i].CR_OPBAL;
        this.preYearTotal.DR_BAL += this.preYearTBData[i].DR_BAL;
        this.preYearTotal.CR_BAL += this.preYearTBData[i].CR_BAL;
        this.preYearTotal.DR_NETBAL += this.preYearTBData[i].DR_NETBAL;
        this.preYearTotal.CR_NETBAL += this.preYearTBData[i].CR_NETBAL;
      };
    });
  }

  showTBRprt() {
    this.showTB = true;
    this.showPL = false;
    this.showIS = false;
    this.showCF = false;
  }
  showPLRprt() {
    this.showTB = false;
    this.showPL = true;
    this.showIS = false;
    this.showCF = false;
  }
  showISRprt() {
    this.showTB = false;
    this.showPL = false;
    this.showIS = true;
    this.showCF = false;
  }
  showCFRprt() {
    this.showTB = false;
    this.showPL = false;
    this.showIS = false;
    this.showCF = true;
  }

  changeList() {
    this.showYearTrialBalance = !this.showYearTrialBalance;
  }

  formatYear(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return year;
  }

}
