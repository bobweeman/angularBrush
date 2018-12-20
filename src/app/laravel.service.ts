import { Credentials } from './credentials';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaravelService {

  endpoint:string = "http://127.0.0.1:8000/api/";
  endpoint2:string = "http://127.0.0.1:8000/oauth/token";
  token:any='';
  constructor(public http:HttpClient,public ls:LocalStorage) {
      this.ls.getItem('credentials').subscribe((res:Credentials)=>{
        this.token =res['access_token'];
      },err=>{
        console.log('Failed fetching credentials in lara-service');
      })
   }


  //  index method
  index(url){
    return this.http.get(this.endpoint + url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    });
  }

  // show method
  show(url,id){
    return this.http.get(this.endpoint + url + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    } );
  }

  // store method
  store(url,payload){
    return this.http.post(this.endpoint + url, payload, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    });
  }

  // update method
  update(url,payload,id){
    return this.http.put(this.endpoint + url + id, payload, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    });
  }

  // delete method
  destroy(url,id){
    return this.http.delete(this.endpoint + url+id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    });
  }

  // login
    login(payload){
      return this.http.post(this.endpoint2, payload, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
  }
}
