import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  url = Configuration.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/theme/add", data, httpOptions)
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/theme/update", data, httpOptions)
  }

  delete(data:any){
    return this.httpClient.post(this.url+
      "/theme/delete/"+data, data, httpOptions)
  }

  getThemes(){
    return this.httpClient.get(this.url+"/theme/get");
  }

  getThemeById(value:any){
    return this.httpClient.get(this.url+"/theme/get/"+value);
  }
}
