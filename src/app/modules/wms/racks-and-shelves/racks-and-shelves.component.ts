import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';

@Component({
  selector: 'app-racks-and-shelves',
  templateUrl: './racks-and-shelves.component.html',
  styleUrls: ['./racks-and-shelves.component.scss']
})
export class RacksAndShelvesComponent implements OnInit {

  rows: number = 0;
  columns: number = 0;

  array(n: number): any[] {
    return Array(n);
  }

  locs: any[];
  selectedLoc: any;
  selectedLocID: string;
  selectedLocNM: string;
  rackNum: number = 0;

  latitude: number = 0.0;
  longitude: number = 0.0;
  mapType = 'satellite';
  zoom = 20;

  locList: boolean;
  locDetails: boolean;
  rackList: boolean;
  shelfList: boolean;
  rackForm: boolean;
  shelfDetails: boolean;
  addShelfForm: boolean;
  editShelfForm: boolean;

  message: string;

  racks: any[];
  selectedRackID: string;
  selectedRackNM: string;
  gotRacks: boolean;
  noRacks: boolean;
  newRackForm: FormGroup;

  shelves: any[];
  gotShelves: boolean;
  noShelves: boolean;
  newShelfForm: FormGroup;
  newItemForm: FormGroup;
  selectedShelfID: string;

  items: any[];
  itemQty: string;
  itemCode: string;
  itemDesc: string;
  itemCategory: string;
  itemCost: string;
  itemUnitDesc: string;
  itemPurchaseDate: string;
  itemBarcode: string;

  submitted: boolean;

  constructor(private service: WarehouseService) { }
 
  ngOnInit() {
    this.locList = true;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;

    this.newRackForm = new FormGroup({
      rackid: new FormControl('', [ Validators.required ]),
      rackdesc: new FormControl('', [ Validators.required ]),
      rackrows: new FormControl('', [ Validators.required ]),
      rackcolumns: new FormControl('', [ Validators.required ]),
    });

    this.newShelfForm = new FormGroup({
      shelfid: new FormControl('', [ Validators.required ]),
      itemcode: new FormControl('', [ Validators.required ]),
      itemqty: new FormControl('', [ Validators.required ]),
      remarks: new FormControl('', [ Validators.required ])
    });

    this.newItemForm = new FormGroup({
      itemcode: new FormControl('', [ Validators.required ]),
      itemqty: new FormControl('', [ Validators.required ]),
      remarks: new FormControl('', [ Validators.required ])
    });

    this.itemQty = " ";
    this.itemCode = " ";
    this.itemDesc = " ";
    this.itemCategory = " ";
    this.itemCost = " ";
    this.itemUnitDesc = " ";
    this.itemPurchaseDate = " ";
  
    this.service.getAllLocs().subscribe((response : any) => {
      this.locs = response.recordset;
      console.log(this.locs);
    });

    this.message = " ";
  }

  getLocs() {
    this.locList = true;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;
  }

  showLocDetails(loc: any) {
    this.locList = false;
    this.locDetails = true;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;

    console.log(loc);
    this.selectedLoc = loc;

    this.latitude = Number(this.selectedLoc.LATITUDE);
    this.longitude = Number(this.selectedLoc.LONGITUDE);
  }

  getRacks(locid: string, locnm: string) {
    this.selectedLocID = locid;
    this.selectedLocNM = locnm;

    this.locList = false;
    this.locDetails = false;
    this.rackList = true;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;

    this.service.getLocWiseRack(locid).subscribe((response : any) => {
      this.gotRacks = true;
      this.noRacks = false;

      this.racks = response.recordset;
      this.rackNum = response.rowsAffected[0]; 
    }, (error : any) => {
      this.gotRacks = false;
      this.noRacks = true;
      this.rackNum = 0;
    })
  }

  showAddRackForm() {
    this.locList = false;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = true;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;
  }

  onAddingNewRack() {
    const data = this.newRackForm.value;
    this.submitted = true;
    // stop here if form is invalid
    if (this.newRackForm.invalid) {
      return;
    }
    this.service.postNewRack(data.rackid, data.rackdesc, this.selectedLocID, Number(data.rackrows), Number(data.rackcolumns));
    this.getRacks(this.selectedLocID, this.selectedLocNM);
  }

  getShelves(rackid: string, rackdesc: string, rackrows: number, rackcolumns: number) {
    this.locList = false;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = true;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = false;

    this.rows = rackrows;
    this.columns = rackcolumns;
    this.selectedRackID = rackid;
    this.selectedRackNM = rackdesc;
    
    var tempRespArr: any[];
    var tempArr: any[] = [];

    this.service.getLocWiseRackWiseShelf(this.selectedLocID, rackid).subscribe((response : any) => {
      this.gotShelves = true;
      this.noShelves = false;

      this.shelves = [];
      tempRespArr = response.recordset;

      var emptyShelf = {
        SHELFID: "---",
        ITEMCODE: " ", 
        ITEMDESC: " ",
        ITEMQTY: " "
      }

      var i, k: number = 0;
      var cnt: number = this.rows * this.columns;

      for(i = 0; i < cnt; i++) {
        if(k < tempRespArr.length) {
          tempArr.push(tempRespArr[i]);
          k++;
        }
        else {
          tempArr.push(emptyShelf);
        }
      }

      while(tempArr.length) {
        this.shelves.push(tempArr.splice(0,this.rows));
      }

      function transpose(a) {
        return Object.keys(a[0]).map(function(c) {
            return a.map(function(r) { return r[c]; });
        });
      }

      this.shelves = transpose(this.shelves);

    }, (error: any) => {
      this.gotShelves = false;
      this.noShelves = true;
    })
  }

  showAddShelfForm() {
    this.locList = false;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = true;
    this.editShelfForm = false;
  }

  onAddingNewShelf() {
    const data = this.newShelfForm.value;
    var barcode = this.selectedLocID + this.selectedRackID + data.shelfid;
    console.log(barcode);

    this.submitted = true;
    // stop here if form is invalid
    if (this.newShelfForm.invalid) {
      return;
    }
    this.service.checkShelf(this.selectedLocID, this.selectedRackID, data.shelfid).subscribe((response : any) => {
      console.log("Adding duplicate shelf");
      var newShelfId = `${data.shelfid}-${response.rowsAffected[0]}`;
      console.log(newShelfId);
      this.service.postNewShelf(this.selectedLocID, this.selectedRackID, newShelfId, data.itemcode, this.itemDesc, Number(data.itemqty), data.remarks, barcode, this.itemCategory, this.itemUnitDesc, this.itemPurchaseDate, Number(this.itemCost), 'Y')
      this.getShelves(this.selectedRackID, this.selectedRackNM, this.rows, this.columns);
    }, (error: any) => {
      console.log("Adding new shelf");
      this.service.postNewShelf(this.selectedLocID, this.selectedRackID, data.shelfid, data.itemcode, this.itemDesc, Number(data.itemqty), data.remarks, barcode, this.itemCategory, this.itemUnitDesc, this.itemPurchaseDate, Number(this.itemCost), 'N')
      this.getShelves(this.selectedRackID, this.selectedRackNM, this.rows, this.columns);
    })
  }

  checkShelf() {
    const data = this.newShelfForm.value;
    this.service.checkShelf(this.selectedLocID, this.selectedRackID, data.shelfid).subscribe((response : any) => {
      console.log(response.rowsAffected[0]);
      this.message = `${response.rowsAffected[0]} such shelves located in the current rack.`
    }, (error: any) => {
      this.message = `No such shelves located in the current rack.`
    })
  }

  showEditShelfForm(shelf: any) {
    this.itemCode = " ";
    this.itemDesc = " ";
    this.itemCategory = " ";
    this.itemCost = " ";
    this.itemQty = " ";
    this.itemUnitDesc = " ";
    this.itemPurchaseDate = " ";

    this.locList = false;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = false;
    this.addShelfForm = false;
    this.editShelfForm = true;

    this.selectedShelfID = shelf.SHELFID;
    this.itemCode = shelf.ITEMCODE;
    this.itemDesc = shelf.ITEMDESC;
    this.itemQty = shelf.ITEMQTY;
    this.itemCategory = shelf.CATEGORY_NAME;
    this.itemCost = shelf.COSTPRICE;
    this.itemUnitDesc = shelf.BASE_UNIT_DESCRIPTION;
    this.itemPurchaseDate = shelf.LASTPURCHASEDDATE;
    this.itemUnitDesc = shelf.ITEMUNITDESCRIPTION;
  }

  onEditingShelf() {
    const data = this.newItemForm.value;
    var barcode = this.selectedLocID + this.selectedRackID + this.selectedShelfID;

    this.submitted = true;
    // stop here if form is invalid
    if (this.newItemForm.invalid) {
      return;
    }
    this.service.updateShelf(this.selectedLocID, this.selectedRackID, this.selectedShelfID, data.itemcode, this.itemDesc, Number(data.itemqty), data.remarks, barcode, this.itemCategory, this.itemUnitDesc, this.itemPurchaseDate, Number(this.itemCost))
    this.getShelves(this.selectedRackID, this.selectedRackNM, this.rows, this.columns);
  }

  checkProductValidity(formName: FormGroup) {
    const data = formName.value;
    this.service.getProducts(data.itemcode, '2020').subscribe((response : any) => {
      console.log(response);
      this.itemDesc = response.recordset[0].DESCRIPTION;
      this.itemCategory = response.recordset[0].CATEGORY_NAME;
      this.itemCost = response.recordset[0].COSTPRICE;
      this.itemQty = response.recordset[0].ITEMQTY;
      this.itemUnitDesc = response.recordset[0].BASE_UNIT_DESCRIPTION;
      this.itemPurchaseDate = response.recordset[0].LASTPURCHASEDDATE;
    }, (error : any) => {
      this.itemDesc = " ";
      this.itemCategory = " "
      this.itemCost = " ";
      this.itemQty = " ";
      this.itemUnitDesc = " ";
      this.itemPurchaseDate = " ";
    })
  }

  showShelfDetails(shelf: any) {
    this.locList = false;
    this.locDetails = false;
    this.rackList = false;
    this.shelfList = false;
    this.rackForm = false;
    this.shelfDetails = true;
    this.addShelfForm = false;
    this.editShelfForm = false;

    this.selectedShelfID = shelf.SHELFID;

    this.service.getShelfDetails(shelf.BARCODE).subscribe((response : any) => {
      console.log(response);
      this.items = response.recordset;
    }, (error : any) => {
      console.log("No Shelf")
    })
  }

  deleteItem(shelf: any) {
    this.selectedShelfID = shelf.SHELFID;

    this.service.deleteShelf(this.selectedLocID, this.selectedRackID, shelf.SHELFID).subscribe((response : any) => {
      console.log(response);
    }, (error : any) => {
      console.log("Item successfully deleted");
      this.getShelves(this.selectedRackID, this.selectedRackNM, this.rows, this.columns);
    })
  }

  get r() { return this.newRackForm.controls; }
  get s() { return this.newShelfForm.controls; }
}
