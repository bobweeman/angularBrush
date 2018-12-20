import { LaravelService } from './../laravel.service';
import { LoginData } from './../login-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  constructor(public fb:FormBuilder, public lara:LaravelService) {
    this.createForm();
  }

  ngOnInit() {
  }

  loginCredentails:LoginData={
    username:'',
    password:'',
    client_id: 2,
    client_secret: "bqUcfWExirR7bLhZ83D5iZGzMhRY9E1obcm7xm4W",
    scope: '',
    grant_type: "password"
  };
  // login form validations
  validations = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email must be at least 5 characters long.' },
      { type: 'email', message: 'Not a valid email pattern.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],

  }

  createForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(5), Validators.required]),
    });
  }


  login(){
    this.buildData();
    setTimeout(() => {
      this.lara.login(this.loginCredentails).subscribe((res)=>{
        console.log(res);
      },err=>{
        console.log(err);
      })
    }, 800);
  }

  buildData(){
    this.loginCredentails.username = this.loginForm.controls['email'].value;
    this.loginCredentails.password = this.loginForm.controls['password'].value;
  }

  storeJwt(){
    
  }



}
