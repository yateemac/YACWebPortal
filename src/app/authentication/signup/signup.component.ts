import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;

  usrPwd: string = "";

  constructor(public router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ]),
      confirmPassword: new FormControl('', [ Validators.required ]),
      firstname: new FormControl('', [ Validators.required ]),
      lastname: new FormControl('', [ Validators.required ]),
      contactno: new FormControl('', [ Validators.required ]),
      terms: new FormControl(false)
    });
  }
  
  onSignup() {
    const data = this.signupForm.value;
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.encrypt(data.password);

    console.log(data);
    console.log(this.usrPwd);

    this.authenticationService.signup(data.firstname, data.lastname, data.username, this.usrPwd, data.contactno);

    this.router.navigate(['authentication/signin']);
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

  get f() { return this.signupForm.controls; }
}
