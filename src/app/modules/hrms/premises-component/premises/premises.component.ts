import { DataSharingService } from './../../../../services/data-sharing/data-sharing.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PremisesService } from 'src/app/services/premises/premises.service';

@Component({
  selector: 'app-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss']
})
export class PremisesComponent implements OnInit {

  showAddPremisesForm: boolean = false;
  showEditPremisesForm: boolean = false;
  showPremisesList: boolean = true;

  premises: any[];
  selectedPremisis: any;

  newPremisisForm: FormGroup;
  editPremisisForm: FormGroup;

  constructor(private service: PremisesService, private dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.premises = [];

    this.newPremisisForm = new FormGroup({
      premisesid: new FormControl(''),
      premisesname: new FormControl(''),
      areaname: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      roadnbr: new FormControl(''),
      blocknbr: new FormControl(''),
      bldgnbr: new FormControl(''),
      flatnbr: new FormControl('')
    });

    this.editPremisisForm = new FormGroup({
      premisesid: new FormControl(''),
      premisesname: new FormControl(''),
      areaname: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      roadnbr: new FormControl(''),
      blocknbr: new FormControl(''),
      bldgnbr: new FormControl(''),
      flatnbr: new FormControl('')
    });

    this.getPremisesData();
  }

  reloadData() {
    this.getPremisesData();
  }

  getPremisesData() {
    this.premises = [];
    this.service.getAllPremises().subscribe((response : any) => {
      console.log(response);
      this.premises = response.recordset;
    }, (error : any) => {
      console.log(error)
    });
  }

  searchPremisesData(search: string) {
    this.premises = [];
    console.log(search);
    this.service.searchPremises(search).subscribe((response : any) => {
      console.log(response);
      this.premises = response.recordset;
    }, (error : any) => {
      console.log(error)
    });
  }

  triggerAddPremisesForm() {
    this.showAddPremisesForm = true;
    this.showEditPremisesForm = false;
    this.showPremisesList = false;
  }

  triggerEditPremisesForm(prm: any) {
    console.log(prm);
    this.showAddPremisesForm = false;
    this.showEditPremisesForm = true;
    this.showPremisesList = false;

    this.selectedPremisis = prm;
  }

  cancelFormAction() {
    this.showAddPremisesForm = false;
    this.showEditPremisesForm = false;
    this.showPremisesList = true;
  }

  postNewPremises() {
    const data = this.newPremisisForm.value;

    this.service.postNewPremises(data.premisesid, data.premisesname, data.areaname, data.latitude, data.longitude, data.roadnbr, data.blocknbr, data.bldgnbr, data.flatnbr);

    this.cancelFormAction();
  }

  editPremises() {

    console.log(this.selectedPremisis);

    this.service.editPremises(this.selectedPremisis.PREMISISID, this.selectedPremisis.PREMISINAME, this.selectedPremisis.AREA, this.selectedPremisis.LATITUDE, this.selectedPremisis.LONGITUDE, this.selectedPremisis.ROAD_NBR, this.selectedPremisis.BLOCK_NBR, this.selectedPremisis.BLDG_NBR, this.selectedPremisis.FLAT_NBR);

    this.cancelFormAction();
  }

  showPremisesDetails(selectedPremisis: any) {
    this.dataSharing.setData(selectedPremisis);
  }

}
