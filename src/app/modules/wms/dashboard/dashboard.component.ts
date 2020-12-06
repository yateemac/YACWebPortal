import { ReportsService } from '../../../services/reports/reports.service';
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { SingleDataSet, Color, Label, ThemeService } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  bgColor = ['#0000FF', '#154360', '#17202A', '#21618C', '#2E86C1', '#85C1E9', '#2E86C1', '#34495E', '#21618C', '#154360'];
  
  locLbls: string[] = [];
  locAmtData: number[] = [];

  subCatLbls: string[] = [];
  subCatAmtData: number[] = [];

  hvpLbls: string[] = [];
  hvpAmtData: number[] = [];

  constructor(private service: ReportsService) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    //Location data
    this.service.getAllLocWiseStock().subscribe((response : any) => {
      for (let i = 0; i < response.recordset.length; i++) {
        this.locLbls.push(response.recordset[i].LOCATION_ID);
        this.locAmtData.push(response.recordset[i].AMOUNT);
      }
      this.locWiseStockDNChart(this.locLbls, this.locAmtData);
      this.locWiseStockBarChart(this.locLbls, this.locAmtData);
    });
    //Subcategory data
    this.service.getAllSubCatWiseStock().subscribe((response : any) => {
      for (let i = 0; i < response.recordset.length; i++) {
        this.subCatLbls.push(response.recordset[i].SUBCATEGORY_NAME);
        this.subCatAmtData.push(response.recordset[i].AMOUNT);
      }
      this.subCatWiseStockBarChart(this.subCatLbls, this.subCatAmtData);
    });
    //HVP Data
    this.service.getAllHighValProds().subscribe((response : any) => {
      for (let i = 0; i < response.recordset.length; i++) {
        this.hvpLbls.push(response.recordset[i].SUBCATEGORY_NAME);
        this.hvpAmtData.push(response.recordset[i].amount);
      }
      this.hvpBarChart(this.hvpLbls, this.hvpAmtData);
    });
  }

  locWiseStockDNChart(lbls: string[], amtData: number[]) {
    var ctx = document.getElementById('lWSDNChart') as HTMLCanvasElement;
    var doughNutChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: lbls,
        datasets: [{
          label: '',
          data: amtData,
          backgroundColor: this.bgColor,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  locWiseStockBarChart(lbls: string[], amtData: number[]){
    var ctx = document.getElementById('lWSBChart') as HTMLCanvasElement;
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lbls,
        datasets: [{
          label: '',
          data: amtData,
          backgroundColor: this.bgColor,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  subCatWiseStockBarChart(lbls: string[], amtData: number[]) {

    var ctx = document.getElementById('sCWSBChart') as HTMLCanvasElement;
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lbls,
        datasets: [{
          label: '',
          data: amtData,
          backgroundColor: this.bgColor,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  hvpBarChart(lbls: string[], amtData: number[]) {

    var ctx = document.getElementById('hVPBChart') as HTMLCanvasElement;
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lbls,
        datasets: [{
          label: '',
          data: amtData,
          backgroundColor: this.bgColor,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
