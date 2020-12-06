import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [
    './styles/main-menu.component.scss'
  ]
})
export class MainMenuComponent implements OnInit {
  uC = JSON.parse(localStorage.getItem('userclass'));

  showMod: boolean = false;

  showCRM: boolean = false;
  showSC: boolean = false;
  showMMP: boolean = false;
  showMIS: boolean = false;
  showPMP: boolean = false;
  showHRMS: boolean = false;
  showWMS: boolean = false;
  showECom: boolean = false;
  showAT: boolean = false;

  constructor(private service: AuthenticationService) {
  }

  ngOnInit() {
    //this.getData();
    var i: number;
    this.service.getUserRole(this.uC).subscribe((response : any) => {
      console.log(response.recordset);
      for(i = 0; i < response.recordset.length; i++) {
        switch(response.recordset[i].MOD_CODE) {
          case "1": this.showCRM = true; break;
          case "2": this.showSC = true; break;
          case "3": this.showMMP = true; break;
          case "4": this.showMIS = true; break;
          case "5": this.showPMP = true; break;
          case "7": this.showHRMS = true; break;
          case "8": this.showWMS = true; break;
          case "9": this.showECom = true; break;
          case "10": this.showAT = true; break;
        }
      }
    });
  }

  /*getData() {
    var i: number;
    this.service.getUserRole(this.uC).subscribe((response : any) => {
      console.log(response.recordset);
      for(i = 0; i < response.recordset.length; i++) {
        switch(response.recordset[i].ROLE_ID) {
          case "1": this.showCRM = true; break;
          case "2": this.showSC = true; break;
          case "3": this.showMMP = true; break;
          case "4": this.showMIS = true; break;
          case "5": this.showPMP = true; break;
          case "7": this.showHRMS = true; break;
          case "8": this.showWMS = true; break;
          case "9": this.showECom = true; break;
          case "10": this.showAT = true; break;
        }
      }
    });
  }*/

}
