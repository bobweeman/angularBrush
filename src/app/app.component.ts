import { Router } from '@angular/router';
import { LaravelService } from './laravel.service';
import { LoginData } from './login-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  hidden:boolean=false;
  loginForm: any;
  constructor(public fb:FormBuilder, public lara:LaravelService,public storage:LocalStorage,public router:Router) {
    console.log(router.url);
    if(router.url ==='/'){
      hidden:true;
    }else{
      hidden:false;
    }
    this.createForm();

   }

  loginCredentails: LoginData = {
    username: '',
    password: '',
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

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(5), Validators.required]),
    });
  }


  login() {
    this.buildData();
    setTimeout(() => {
      this.lara.login(this.loginCredentails).subscribe((res) => {
        this.storeJwt(res);
        this.hidden=true;
        this.router.navigateByUrl('dashboard');

      }, err => {
        console.log(err);
      })
    }, 800);
  }

  buildData() {
    this.loginCredentails.username = this.loginForm.controls['email'].value;
    this.loginCredentails.password = this.loginForm.controls['password'].value;
  }

  storeJwt(res) {
    this.storage.setItem('credentials', res).subscribe((res) => {
      console.log('Local storage successful');
    }, err => {
      console.log('Failed storing data locally');
    })
  }


}
