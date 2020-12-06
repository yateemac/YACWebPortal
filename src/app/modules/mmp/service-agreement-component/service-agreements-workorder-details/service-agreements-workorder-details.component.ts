import { ReportsService } from 'src/app/services/reports/reports.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-agreements-workorder-details',
  templateUrl: './service-agreements-workorder-details.component.html',
  styleUrls: ['./service-agreements-workorder-details.component.scss']
})
export class ServiceAgreementsWorkorderDetailsComponent implements OnInit {
  @Input() jobno: any;

  constructor(private service: ReportsService) { }

  workOrders: any = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    console.log(this.jobno);
    this.service.getAllWorkOrders(this.jobno).subscribe((response : any) => {
      this.workOrders = response.recordset;
      console.log(this.workOrders);
    });
  }

}
