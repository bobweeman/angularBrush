import { LaravelService } from './../laravel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public lara:LaravelService) {
    this.getUserDetails();
   }

  ngOnInit() {
  }

  getUserDetails(){
    this.lara.index('user').subscribe((res)=>{
      console.log(res);
    },err=>{
      console.log(err)
    })
  }

}
