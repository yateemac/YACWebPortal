import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremisesService {
  private url = 'https://api.yateemac.net/api';

  constructor(private http: HttpClient) { }

  getAllPremises() {
    return this.http.get(this.url + "/premises")
  }

  searchPremises(search: string) {
    return this.http.get(this.url + "/search/premises/" + search)
  }

  searchEmployee(search: string) {
    return this.http.get(this.url + "/search/employee/" + search)
  }

  postNewPremises(premisesid: string, premisesname: string, areaname: string, latitude: string, longitude: string, roadnbr: string, blocknbr: string, bldgnbr: string, flatnbr: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newPremises = {
      premisesid: premisesid,
      premisesname: premisesname,
      areaname: areaname,
      latitude: latitude,
      longitude: longitude,
      roadnbr: roadnbr,
      blocknbr: blocknbr,
      bldgnbr: bldgnbr,
      flatnbr: flatnbr
    }

    this.http.post(this.url + '/premises/new', JSON.stringify(newPremises), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }

  editPremises(premisesid: string, premisesname: string, areaname: string, latitude: string, longitude: string, roadnbr: string, blocknbr: string, bldgnbr: string, flatnbr: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newPremises = {
      premisesid: premisesid,
      premisesname: premisesname,
      areaname: areaname,
      latitude: latitude,
      longitude: longitude,
      roadnbr: roadnbr,
      blocknbr: blocknbr,
      bldgnbr: bldgnbr,
      flatnbr: flatnbr
    }

    this.http.post(this.url + '/premises/edit', JSON.stringify(newPremises), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }
  
  assignEmployee(premisesid: string, premisesname: string, empid: string, empname: string, contactnbr: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newEmp = {
      premisesid: premisesid,
      premisesname: premisesname,
      empid: empid,
      empname: empname,
      contactnbr: contactnbr
    }

    this.http.post(this.url + '/assign/premises/employee', JSON.stringify(newEmp), { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }

  unassignEmployee(premisesid: string, empid: string) {
    return this.http.get(this.url + '/unassign/' + premisesid + '/' + empid)
  }

  getPremisesWiseEmployeeList(premisesid: string) {
    return this.http.get(this.url + "/list/employees/" + premisesid)
  }
}
