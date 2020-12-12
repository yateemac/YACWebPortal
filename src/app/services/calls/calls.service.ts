import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private cmplntUrl = 'https://api.yateemac.net/api/complaints';

  constructor(private http: HttpClient) { }

  getAllComplaints(date: string) {
    return this.http.get(this.cmplntUrl  + '/' + date)
  }

  getCallerDetails(number: string) {
    return this.http.get(this.cmplntUrl  + '/caller/' + number)
  }
}
