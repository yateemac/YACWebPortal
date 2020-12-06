import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  bgColor = ['#0000FF', '#154360', '#17202A', '#21618C', '#2E86C1', '#85C1E9', '#2E86C1', '#34495E', '#21618C', '#154360'];
  monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  showISS: boolean;
  showMSS: boolean;
  showYSS: boolean;

  curYearRprt: any[];
  preYearRprt: any[];

  preYearTotal = {
    SELLING: 0,
    COST: 0,
    GROSS: 0
  };

  curYearShowroomRprt: any[];
  curYearOneStopShopRprt: any[];
  curYearServiceDeptRprt: any[];
  curYearContractsRprt: any[];

  preYearShowroomRprt: any[];
  preYearOneStopShopRprt: any[];
  preYearServiceDeptRprt: any[];
  preYearContractsRprt: any[];

  utc = new Date();
  dataYear = this.formatYear(this.utc);
  curYear = this.dataYear;
  preYear = this.dataYear-1;

  constructor(private service: ReportsService) {
  }

  ngOnInit() {
    this.showISS = false;
    this.showYSS = true;
    this.showMSS = false;
    this.getYearWiseData();
    this.service.refreshData();
  }

  getYearWiseData(){ 
    //Current year
    this.service.getDeptWiseTotalSalesShowroom(this.curYear.toString()).subscribe((response : any) => {
      this.curYearShowroomRprt = response.recordset;
    });
    this.service.getDeptWiseTotalSalesOneStopShop(this.curYear.toString()).subscribe((response : any) => {
      this.curYearOneStopShopRprt = response.recordset;
    });
    /*this.service.getDeptWiseTotalSalesContracts(this.curYear.toString()).subscribe((response : any) => {
      this.curYearContractsRprt = response.recordset;
    });*/
    this.service.getDeptWiseTotalSalesServiceDept(this.curYear.toString()).subscribe((response : any) => {
      this.curYearServiceDeptRprt = response.recordset;
    });
    //Previous year
    this.service.getDeptWiseTotalSalesShowroom(this.preYear.toString()).subscribe((response : any) => {
      this.preYearShowroomRprt = response.recordset;
    });
    this.service.getDeptWiseTotalSalesOneStopShop(this.preYear.toString()).subscribe((response : any) => {
      this.preYearOneStopShopRprt = response.recordset;
    });
    /* this.service.getDeptWiseTotalSalesContracts(this.preYear.toString()).subscribe((response : any) => {
      this.preYearContractsRprt = response.recordset;
    }); */
    this.service.getDeptWiseTotalSalesServiceDept(this.preYear.toString()).subscribe((response : any) => {
      this.preYearServiceDeptRprt = response.recordset;
    });
  }

  showISSRprt() {
    this.showISS = true;
    this.showYSS = false;
    this.showMSS = false;
  }
  showYSSRprt() {
    this.showISS = false;
    this.showYSS = true;
    this.showMSS = false;
  }
  showMSSRprt() {
    this.showISS = false;
    this.showYSS = false;
    this.showMSS = true;
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
