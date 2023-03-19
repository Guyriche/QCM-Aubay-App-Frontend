import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = Configuration.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/question/add", data, httpOptions)
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/question/update", data, httpOptions)
  }

  delete(data:any){
    return this.httpClient.post(this.url+
      "/question/delete/"+data, data, httpOptions)
  }

  getQuestion(){
    return this.httpClient.get(this.url+"/question/get");
  }

  getQuestionById(id:any){
    return this.httpClient.get(this.url+"/question/get/"+id);
  }

  getQuestionByThemeId(themeId:any){
    return this.httpClient.get(this.url+"/question/getQuestionByThemeId/"+themeId);
  }

  getAllQuestionByQcmId(qcmId:any){
    return this.httpClient.get(this.url+"/question/getQuestionsByQcmId/"+qcmId);
  }
}
