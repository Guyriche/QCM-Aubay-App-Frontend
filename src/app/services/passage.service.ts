import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})

export class PassageService {

  url = Configuration.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/passage/add", data, httpOptions);
  }

  addTestToPassage(passageId:any, data:any){
    return this.httpClient.post(this.url + 
      "/passage/test/" + passageId + "/add", data, httpOptions);
  }

  update(data:any){
    return this.httpClient.post(this.url + 
      "/passage/update", data, httpOptions);
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url + 
      "/passage/updateStatus", data, httpOptions);
  }

  getAllPassage(){
    return this.httpClient.get(this.url+"/passage/get");
  }

  getPassageById(id:any){
    return this.httpClient.get(this.url+"/passage/get"+id);
  }

  deletePassage(data:any){
    return this.httpClient.post(this.url + 
      "/passage/delete/"+data, data, httpOptions);
  }

  sendPassage(data:any){
    return this.httpClient.post(this.url + 
      "/passage/sendPassage", data, httpOptions);
  }
}
