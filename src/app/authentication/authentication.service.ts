import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { LoggedUserModel } from './logged-user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private url = 'http://api.yateemac.net:5000/api/users';

  loggedUserSubject: BehaviorSubject<LoggedUserModel>;
  loggedUser: LoggedUserModel;

  constructor(private http: HttpClient) {
    this.loggedUserSubject = new BehaviorSubject(this.loggedUser);
  }

  isAuthenticated() {
    return this.loggedUserSubject.asObservable();
  }

  setUser(firstname: string, lastname: string, userclass: string) {
    localStorage.setItem('firstname', JSON.stringify(firstname));
    localStorage.setItem('lastname', JSON.stringify(lastname));
    localStorage.setItem('userclass', JSON.stringify(userclass));
  }

  signin(username: string, password: string): Observable<any> {
    // your log in logic should go here
    return this.http.get(this.url + '/' + username);
  }

  getUserRole(userclass: string) {
    return this.http.get(this.url + '/roles/' + userclass);
  }

  logout(): Observable<any> {
    localStorage.setItem('firstname', " ");
    localStorage.setItem('lastname', " ");
    localStorage.setItem('userclass', " ");
    this.loggedUserSubject.next(null);
    return of(true);
  }

  recoverPassword(email: any): Observable<any> {
    // your recover password login should go here
    this.loggedUserSubject.next(this.loggedUser);
    return of(true);
  }

  signup(fName: string, lName: string, usrCode: string, pwd: string, cntctNbr: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newUsr = {
      usercode: usrCode,
      password: pwd,
      firstname: fName,
      lastname: lName,
      contactno: cntctNbr
    }

    this.http.post(this.url + '/new', JSON.stringify(newUsr), { headers: headers }).subscribe(response => {
      console.log(response);
    });

  }

}
