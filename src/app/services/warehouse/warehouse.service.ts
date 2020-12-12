import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uptime } from 'process';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private url = 'https://api.yateemac.net/api';

  constructor(private http: HttpClient) { }

  getAllLocs() {
    return this.http.get(this.url + "/locs")
  }

  getLocWiseRack(loc: string) {
    return this.http.get(this.url + "/racks/" + loc)
  }

  getLocWiseRackWiseShelf(loc: string, rack: string) {
    return this.http.get(this.url + "/shelfs/" + loc + '/' + rack)
  }

  postNewRack(rackID: string, rackDesc: string, locID: string, rackRows: number, rackColumns: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newRack = {
      rackId: rackID,
      rackDesc: rackDesc,
      locId: locID,
      rackRows: rackRows,
      rackColumns: rackColumns
    }

    this.http.post(this.url + '/rack/new', JSON.stringify(newRack), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }

  checkShelf(loc: string, rack: string, shelf: string) {
    return this.http.get(this.url + "/shelfs/" + loc + '/' + rack + '/' + shelf)
  }

  getShelfDetails(barcode: string) {
    return this.http.get(this.url + "/shelf/" + barcode)
  }

  postNewShelf(locID: string, rackID: string, shelfID: string, itemCode: string, itemDesc: string, itemQty: number, remarks: string, barcode: string, itemCat: string, itemUnitDesc: string, itemLastPurchaseDate: string, itemCost: number, shelfDuplicate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newShelf = {
      locId: locID,
      rackId: rackID,
      shelfId: shelfID,
      itemCode: itemCode,
      itemDesc: itemDesc,
      itemQty: itemQty,
      remarks: remarks,
      barcode: barcode,
      category: itemCat,
      unitdesc: itemUnitDesc,
      lastpurchasedate: itemLastPurchaseDate,
      cost: itemCost,
      duplicate: shelfDuplicate
    }

    this.http.post(this.url + '/shelf/new', JSON.stringify(newShelf), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }

  updateShelf(locID: string, rackID: string, shelfId: string, itemCode: string, itemDesc: string, itemQty: number, remarks: string, barcode: string, itemCat: string, itemUnitDesc: string, itemLastPurchaseDate: string, itemCost: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const updatedShelf = {
      locId: locID,
      rackId: rackID,
      shelfId: shelfId,
      itemCode: itemCode,
      itemDesc: itemDesc,
      itemQty: itemQty,
      remarks: remarks,
      barcode: barcode,
      category: itemCat,
      unitdesc: itemUnitDesc,
      lastpurchasedate: itemLastPurchaseDate,
      cost: itemCost
    }

    this.http.post(this.url + '/shelf/update', JSON.stringify(updatedShelf), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }

  deleteShelf(locid: string, rackid: string, shelfid: string) {
    return this.http.get(this.url + "/shelf/delete/" + locid + "/" + rackid + "/" + shelfid)
  }

  getProducts(pcode: string, year: string) {
    return this.http.get(this.url + "/product/" + pcode + "/" + year)
  }
}