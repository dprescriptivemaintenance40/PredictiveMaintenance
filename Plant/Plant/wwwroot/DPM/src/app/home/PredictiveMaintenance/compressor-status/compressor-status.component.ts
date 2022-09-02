import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forEach } from 'lodash';

@Component({
  selector: 'app-compressor-status',
  templateUrl: './compressor-status.component.html',
  styleUrls: ['./compressor-status.component.scss']
})
export class CompressorStatusComponent implements OnInit {

  public GetStatus: any = [];
  public batch: any = [];
  public stage: any;
  public clean:any;
  public errors:any;
  public Data:any= [];
  public list:any= [];
  public show:boolean=false;
  public Id:any;
  public noError:boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getStatusData();
  }
   
  getStatusData() {
    this.http.get("api/CompressorProcessAPI/GetBatch").subscribe((res:any)=>{
      console.log(res);
      this.GetStatus=res;
      this.GetStatus.forEach(record =>{
        this.batch.push(record[0]);
        this.stage=record[1];
        this.clean=record[2];
        this.Id=record[0].Id;
        this.errors=record[3];
        this.Data.push(this.Id,this.stage,this.clean,record[3]);
        this.list.push(this.Data);
        this.Data=[];
      })
    },
    (err)=> {console.log(err)
      alert("Error")}
    )  
  }
  Show(id:any){
    for(let x=0; x<this.list.length; x++){
      if(this.list[x][0]===id){
        this.Id=id;
        this.show=true;
        if(this.list[x][3].length === 0){
           this.noError=true;
        }
      }
    }
  }
}
