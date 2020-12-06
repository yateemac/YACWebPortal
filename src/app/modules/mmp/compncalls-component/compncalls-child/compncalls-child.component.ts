import { Component, OnInit, Input } from '@angular/core';
import { CallsService } from 'src/app/services/calls/calls.service';
import { isString } from 'util';

@Component({
  selector: 'app-compncalls-child',
  templateUrl: './compncalls-child.component.html',
  styleUrls: ['./compncalls-child.component.scss']
})
export class CompncallsChildComponent implements OnInit {
  @Input() complaint: any; 
  @Input() srno: any;
  details: any[]; 

  isExpanded: boolean = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
  constructor(private service: CallsService) { 
    this.details = [];
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if(this.complaint.CALLER == "") {
      this.complaint.CALLER = 0;
      this.service.getCallerDetails(this.complaint.CALLER).subscribe((response : any) => {
        this.details = response.recordset;
      }, (error : any) => {
        this.details = [{CALLER: "", CONTACT: "", NAME: "NEW CALLER", phone1: ""}];
      });
    }
    else { 
      this.service.getCallerDetails(this.complaint.CALLER).subscribe((response : any) => {
        this.details = response.recordset;
      }, (error : any) => {
        this.details = [{CALLER: "", CONTACT: "", NAME: "NEW CALLER", phone1: ""}];
      });
    }
  }
}
