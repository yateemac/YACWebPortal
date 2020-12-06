import { ReportsService } from 'src/app/services/reports/reports.service';
import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-service-agreements-customer-wise-ageing',
  templateUrl: './service-agreements-customer-wise-ageing.component.html',
  styleUrls: ['./service-agreements-customer-wise-ageing.component.scss']
})
export class ServiceAgreementsCustomerWiseAgeingComponent implements OnInit {
  @Input() custCode: any;

  bgColor = ['#0000FF', '#154360', '#17202A', '#21618C', '#2E86C1', '#85C1E9', '#2E86C1', '#34495E', '#21618C', '#154360'];

  ageingRprt: any[];

  thirtyDays: number;
  sixtyDays: number;
  ninetyDays: number;
  hundredTwentyDays: number;
  hundredEightyDays: number;
  threeSixtyFiveDays: number;
  aboveThreeSixtyFiveDays: number;
  unallocatedBalance: number;

  utc = new Date();
  dataDate = this.formatDate(this.utc);

  constructor(private service: ReportsService) {
  }

  ngOnInit() {
    this.getAgeingData(this.custCode, this.dataDate);
  }

  getAgeingData(cstCode: string, date: string) {
    this.service.getCustWiseAgeing(cstCode, date).subscribe((response : any) => {
      this.ageingRprt = response.recordset;
      console.log(this.ageingRprt);
      this.thirtyDays = this.ageingRprt[0].M_30_DAYS;
      this.sixtyDays = this.ageingRprt[0].M_60_DAYS;
      this.ninetyDays = this.ageingRprt[0].M_90_DAYS;
      this.hundredTwentyDays = this.ageingRprt[0].M_120_DAYS;
      this.hundredEightyDays = this.ageingRprt[0].M_180_DAYS;
      this.threeSixtyFiveDays = this.ageingRprt[0].M_365_DAYS;
      this.aboveThreeSixtyFiveDays = this.ageingRprt[0].ABOVE_365_DAYS;
    this.unallocatedBalance = this.ageingRprt[0].UNALLOC_BALANCE;
      this.totalAgeingChart()
    });
  }

  totalAgeingChart() {
    var lbls: string[] = ["30 Days", "60 Days", "90 Days", "120 Days", "180 Days", "365 Days", "Above 365 Days", "Unallocated Balance"];
    var amtData: number[] = [this.thirtyDays, this.sixtyDays, this.ninetyDays, this.hundredTwentyDays, this.hundredEightyDays, this.threeSixtyFiveDays, this.aboveThreeSixtyFiveDays, this.unallocatedBalance];
    console.log(lbls);
    console.log(amtData);

    var ctx = document.getElementById('totalAgeingChart') as HTMLCanvasElement;
    var doughNutChart = new Chart(ctx, {
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

}
