import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-sales-one-stop-shop',
  templateUrl: './sales-one-stop-shop.component.html',
  styleUrls: ['./sales-one-stop-shop.component.scss']
})
export class SalesOneStopShopComponent implements OnInit {
  bgColor = ['#0000FF', '#154360', '#17202A', '#21618C', '#2E86C1', '#85C1E9', '#2E86C1', '#34495E', '#21618C', '#154360'];
  monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  showISS: boolean;
  showYMSS: boolean;
  showDSS: boolean;

  showYearItemList: boolean;
  gotData: boolean = false;

  gotProducts: boolean = false;
  gotError: boolean = false;

  curYearItemWiseRprt: any[];
  preYearItemWiseRprt: any[];

  curYearRprt: any[];
  preYearRprt: any[];

  curYearMonthRprt: any[];
  preYearMonthRprt: any[];

  dayWiseItemRprt: any[];
  dayWiseTotal = {
    QTY: 0,
    SELLING: 0,
    COST: 0,
    GROSS: 0
  }

  preYearTotal = {
    SELLING: 0,
    COST: 0,
    GROSS: 0
  }

  utc = new Date();
  dataDate = this.formatDate(this.utc);
  dataYear = this.formatYear(this.utc);
  curYear = this.dataYear;
  preYear = this.dataYear-1;

  constructor(private service: ReportsService) {
  }

  ngOnInit() {
    this.showISS = false;
    this.showYMSS = true;
    this.showDSS = false;
    this.getItemWiseData();
    this.getYearWiseData();
    this.getMonthWiseData();
  }

  getItemWiseData(){ 
    this.service.getOneStopShopItemwiseSales(this.curYear.toString()).subscribe((response : any) => {
      this.curYearItemWiseRprt = response.recordset;
    });
    this.service.getOneStopShopItemwiseSales(this.preYear.toString()).subscribe((response : any) => {
      this.preYearItemWiseRprt = response.recordset;
    });
  }

  getYearWiseData(){ 
    //Current year
    this.service.getDeptWiseTotalSalesOneStopShop(this.curYear.toString()).subscribe((response : any) => {
      this.curYearRprt = response.recordset;
    });
    //Previous year
    this.service.getDeptWiseTotalSalesOneStopShop(this.preYear.toString()).subscribe((response : any) => {
      this.preYearRprt = response.recordset;
    });
  }

  getMonthWiseData() {
    var i: number;
    this.service.getMonthwiseOneStopShopSales(this.curYear.toString()).subscribe((response : any) => {
      this.curYearMonthRprt = response.recordset;
    });
    this.service.getMonthwiseOneStopShopSales(this.preYear.toString()).subscribe((response : any) => {
      this.preYearMonthRprt = response.recordset;
      for (i = 0; i < this.curYearMonthRprt.length; i++) {
        this.preYearTotal.COST += this.preYearMonthRprt[i].COST;
        this.preYearTotal.SELLING += this.preYearMonthRprt[i].SELLLING;
        this.preYearTotal.GROSS += this.preYearMonthRprt[i].GROSS;
      }
    });
  }

  submitDate(date: string) {
    this.getDayWiseData(date);
  }

  getDayWiseData(date: string) {
    this.dayWiseItemRprt = [];
    this.dataDate = this.formatDate(date);
    this.gotData = true;
    this.gotProducts = false;
    this.gotError = false;
    this.service.getDaywiseOneStopShopSales(this.dataDate).subscribe((response : any) => {
      this.gotProducts = true;
      this.dayWiseItemRprt = response.recordset;
      var i: number;
      for(i=0; i<this.dayWiseItemRprt.length; i++) {
        this.dayWiseTotal.QTY += this.dayWiseItemRprt[i].QTY;
        this.dayWiseTotal.COST += this.dayWiseItemRprt[i].COST;
        this.dayWiseTotal.SELLING += this.dayWiseItemRprt[i].SELLLING;
        this.dayWiseTotal.GROSS += this.dayWiseItemRprt[i].GROSS;
      }
    }, error => {
      this.gotError = true;
    });
  }

  showISSRprt() {
    this.showISS = true;
    this.showYMSS = false;
    this.showDSS = false;
  }
  showYMSSRprt() {
    this.showISS = false;
    this.showYMSS = true;
    this.showDSS = false;
  }
  showDSSRprt() {
    this.showISS = false;
    this.showYMSS = false;
    this.showDSS = true;
  }

  changeList() {
    this.showYearItemList = !this.showYearItemList;
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

    return [month, day, year].join('-');
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
