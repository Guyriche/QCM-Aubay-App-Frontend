import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = Configuration.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getDetails():any{
    return this.httpClient.get(this.url+"/dashboard/details");
  }
}
