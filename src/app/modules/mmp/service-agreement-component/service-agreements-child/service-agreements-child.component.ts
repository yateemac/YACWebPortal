import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-agreements-child',
  templateUrl: './service-agreements-child.component.html',
  styleUrls: ['./service-agreements-child.component.scss']
})
export class ServiceAgreementsChildComponent implements OnInit {
  @Input() agreement: any; 
  @Input() srno: any;

  isHidden: boolean = true;

  message: string;
  
  isExpanded: boolean = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor() {
    this.message = "View Customer-wise ageing";
  }

  ngOnInit() {
  }

  changeDetail() {
    this.isHidden = !this.isHidden;
    if(this.isHidden === true) {
      this.message = "View Customer-wise ageing";
    }
    else {
      this.message = "View Customer associated work orders";
    }
  }
}
