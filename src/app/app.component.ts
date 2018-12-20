import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  hidden:boolean=false;
  constructor(public router:Router) {
    console.log(router.url);
    if(router.url ==='/'){
      hidden:true;
    }else{
      hidden:false;
    }
   }

}
