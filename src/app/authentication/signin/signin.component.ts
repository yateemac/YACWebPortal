import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  usrPwd: string = "";

  constructor(public router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
  }

  onSignin() {
    const data = this.signinForm.value;
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }
    this.loading = true;
    this.encrypt(data.password);
    
    this.authenticationService.signin(data.username, data.password).subscribe (res => {
        console.log(res.recordset[0].PASSWORD);
        if(this.usrPwd === res.recordset[0].PASSWORD) {
          this.error = "";
          // if signin success then:
          this.authenticationService.setUser(res.recordset[0].FIRSTNAME, res.recordset[0].LASTNAME, res.recordset[0].USERCLASS)
          this.router.navigate(['home/dashboard']);
        }
        else {
          this.error = "Password is incorrect!";
        }
      },
      err => {
        this.error = "Username or Password is incorrect!";
      }
    );
  }

  encrypt(pwd: string) {
    this.usrPwd = "";
    var i: number;
    var ascii: number;
    for(i = 0; i < pwd.length; i++) {
      ascii = pwd[i].charCodeAt(0)+10;
      this.usrPwd += String.fromCharCode(ascii);
    }
  }

  get f() { return this.signinForm.controls; }
}
