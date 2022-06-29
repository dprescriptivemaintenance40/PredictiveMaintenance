import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateKeyPair } from 'crypto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(public http:HttpClient) {}
  getKeyApi():Observable<any>{
   return this.http.get("https://localhost:44365/EmbedInfo/GetKeyInformation?ClientId=6041ad76-35d0-413b-90aa-1527c84d39aa&TenantId=69dfca66-8162-4071-bfcc-ae458f959be0&ClientSecret=4bz8Q~mUBNna9aFdNueN52m4SpHb~X7sE~kr1bcw&WorkspaceId=1d5ebb34-e8a9-4b9c-af74-63d6ab9b90b9&ReportId=d4975408-311b-4526-a62b-2aecfbca3637", {responseType:'json'});
  
  }
}
