import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  url = Configuration.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/test/add", data, httpOptions);
  }

  addQcmToTest(testId:any, data:any){
    return this.httpClient.post(this.url + 
      "/test/qcm/" + testId + "/add", data, httpOptions);
  }

  update(data:any){
    return this.httpClient.post(this.url + 
      "/test/update", data, httpOptions);
  }

  getAllTest(){
    return this.httpClient.get(this.url+"/test/get");
  }

  getTestById(id:any){
    return this.httpClient.get(this.url+"/test/get"+id);
  }

  getTestByThemeId(themeId:any){
    return this.httpClient.get(this.url+ "/test/getTestByThemeId/"+themeId);
  }

  getAllTestByPassageId(passageId:any){
    return this.httpClient.get(this.url+"/test/getAllTestByPassageId/"+passageId);
  }

  deleteTest(data:any){
    return this.httpClient.post(this.url + 
      "/test/delete/"+data, data, httpOptions);
  }
}
