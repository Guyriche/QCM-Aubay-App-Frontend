import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})
export class QcmService {

  url = Configuration.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addNewQcm(data:any){
    return this.httpClient.post(this.url + 
      "/qcm/add", data, httpOptions);
  }

  addQuestionIntoQcm(qcmId:any, data:any){
    return this.httpClient.post(this.url + 
      "/qcm/question/" + qcmId + "/add", data, httpOptions);
  }

  updateQcm(data:any){
    return this.httpClient.post(this.url + 
      "/qcm/update", data, httpOptions);
  }

  getAllQcm(){
    return this.httpClient.get(this.url+"/qcm/get");
  }

  getQcmById(id:any){
    return this.httpClient.get(this.url+"/qcm/get/"+id);
  }

  deleteQcm(data:any){
    return this.httpClient.post(this.url + 
      "/qcm/delete/"+ data, data,httpOptions);
  }
}
