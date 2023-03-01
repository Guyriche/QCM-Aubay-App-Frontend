import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json' )
};

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  url = Configuration.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  add(id:any, data:any){
    return this.httpClient.post(this.url +
      "/proposition/question/"+id+"/add", data, httpOptions)
  }

  update(data:any){
    return this.httpClient.post(this.url + 
      "/proposition/update", data, httpOptions)
  }

  delete(data:any){
    return this.httpClient.post(this.url + 
      "/proposition/delete/"+data, httpOptions)
  }

  deletePropositionFromQuestion(questionId:any, propositionId:any){
    return this.httpClient.post(this.url + 
      "/proposition/question/"+questionId+"/delete/"+propositionId, httpOptions) 
  }

  getAllPropositionByQuestionsId(data:any){
    return this.httpClient.get(this.url+"/proposition/question/"
    +data+"/get")
  }

  getProposition(){
    return this.httpClient.get(this.url+"/proposition/get")
  }
}
