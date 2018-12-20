import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaravelService {

  endpoint:string = "http://127.0.0.1:8000/api";
  endpoint2:string = "http://127.0.0.1:8000/oauth/token";

  constructor(public http:HttpClient) {
   }


  //  index method
  index(url){
    return this.http.get(this.endpoint+url);
  }

  // show method
  show(url,id){
    return this.http.get(this.endpoint +url+id);
  }

  // store method
  store(url,payload){
    return this.http.post(this.endpoint +url,payload);
  }

  // update method
  update(url,payload,id){
    return this.http.put(this.endpoint +url+id,payload);
  }

  // delete method
  destroy(url,id){
    return this.http.delete(this.endpoint +url,id);
  }

  // login
    login(payload){
      return this.http.post(this.endpoint2, payload, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
  }
}
