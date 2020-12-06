import { PremisesService } from 'src/app/services/premises/premises.service';
import { DataSharingService } from './../../../../services/data-sharing/data-sharing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premises-detail',
  templateUrl: './premises-detail.component.html',
  styleUrls: ['./premises-detail.component.scss']
})
export class PremisesDetailComponent implements OnInit {
  data: any;
  employees: any;
  message: string;
  showAssignForm: boolean = false;
  emp: any = {
    empno: "",
    empname: "",
    empdept: "",
    empdesg: "",
    empmnbr: "",
    emptmcd: ""
  }

  constructor(private dataSharing: DataSharingService, private service: PremisesService) { }

  ngOnInit(): void {
    this.data = this.dataSharing.getData();
    this.employees = [];
    this.message = "";

    this.getEmployeeData();
  }

  getEmployeeData() {
    this.employees = [];
    this.service.getPremisesWiseEmployeeList(this.data.PREMISISID).subscribe((response : any) => {
      this.employees = response.recordset;
      this.message = response.rowsAffected;
    }, (error : any) => {
      this.message = "0";
    });
  }

  searchEmp(search: string) {
    this.service.searchEmployee(search).subscribe((response : any) => {
      console.log(response);
      this.emp.empno = response.recordset[0].EMPNO;
      this.emp.empname = response.recordset[0].EMPNAME;
      this.emp.empdept = response.recordset[0].DEPARTMENT_NAME;
      this.emp.empdesg = response.recordset[0].DESIGNATION_NAME;
      this.emp.empmnbr = response.recordset[0].L_MOBILE;
      this.emp.emptmcd = response.recordset[0].ATT_CARD_NO;
      console.log(this.emp);
    }, (error : any) => {
      console.log(error)
    });
  }

  triggerAssignEmpForm() {
    this.showAssignForm = !this.showAssignForm;
    this.emp.empno = "";
    this.emp.empname = "";
    this.emp.empdept = "";
    this.emp.empdesg = "";
    this.emp.empmnbr = "";
    this.emp.emptmcd = "";

    this.getEmployeeData();
  }

  submitEmp() {
    this.service.assignEmployee(this.data.PREMISISID, this.data.PREMISINAME, this.emp.empno, this.emp.empname, this.emp.empmnbr);

    this.triggerAssignEmpForm();

    this.getEmployeeData();
  }

  unassignEmp(empid: any) {
    this.employees = [];
    this.service.unassignEmployee(this.data.PREMISISID, empid).subscribe((response : any) => {
    }, (error : any) => {
      console.log(error)
    });
    this.getEmployeeData();
  }

}
