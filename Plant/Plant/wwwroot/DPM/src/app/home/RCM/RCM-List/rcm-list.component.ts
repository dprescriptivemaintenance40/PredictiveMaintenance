import { Component, OnInit} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

declare var vis:any;

@Component({
  selector: 'app-rcm-list',
  templateUrl: './rcm-list.component.html',
  styleUrls: ['./rcm-list.component.scss'],

})

export class RCMListComponent implements OnInit {
   
    public rcmRecords:any = [];
  ngOnInit() {
    this.getrcmRecords();
    } 
constructor(private http:HttpClient,
    private rcmListBLService:CommonBLService){

}
public getrcmRecords(){
    this.http.get("/api/RCMAPI/GetRCMRecords")
    .subscribe((res:any) => {
      this.rcmRecords = res;
      console.log(this.rcmRecords)
    }, err => console.log(err.error))
  }
}
