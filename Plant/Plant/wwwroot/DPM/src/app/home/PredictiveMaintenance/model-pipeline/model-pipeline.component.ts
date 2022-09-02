import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as xlsx from "xlsx";
 import { HttpClient, HttpRequest } from '@angular/common/http';
import { CompressorObjectModel } from './model-pipeline.model';
enum CheckBoxType { Manual, Automated, NONE };
@Component({
  selector: 'app-model-pipeline',
  templateUrl: './model-pipeline.component.html',
  providers: [MessageService],
  styleUrls: ['./model-pipeline.component.scss']
})
export class ModelPipelineComponent implements OnInit {

  BatchId:number;
  Description:string;
  check_box_type = CheckBoxType;
  Manual: boolean = true;
  Automated: boolean = false;
  public uploadSuccess:boolean=false;
  FileUpload:any;
  public Assetlist:any= [];
  selectedAsset = null;
  selectedTagNumber=null;
  constructor(private messageService: MessageService,private http:HttpClient) {
  }

  ngOnInit() {
    this.http.get("api/FileUploadingAPI/GetAsset").subscribe((res:any)=>{
          res.forEach(record =>{
             this.Assetlist.push(record);
          })
    },
    (err)=> {
      console.log(err)
    });
  }

  selectCheckBoxM() {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.Manual === true) {
      this.Manual = false;
    }
    else {
      this.Manual = true;
      this.Automated = false;
    }
  }
  selectCheckBoxA(a) {
    // if(this.Automated=== false) {
    //   this.Automated=false;
    //   this.Manual=true;
    //   alert("Scada and Sensor are not configured...");
    //   this.Automated = false;
    // }
    // else{
    //   this.Automated=false;
    //   this.Manual=true;
    //   alert("Scada and Sensor are not configured...");
    //   this.Automated = false; 
    // }
    if (this.Manual === true) {
      this.Automated = false;
      // this.Manual=true;
      alert("Scada and Sensor are not configured...");

      this.Automated = false;
    }
    // else{
    //   this.Automated=false;
    //   this.Manual=true;
    //   alert("Scada and Sensor are not configured...");
    //   this.Automated = false; 
    // }
  }
  addfile(event){
    this.FileUpload=event?.target?.files[0];
  }
  Upload(){
    if(this.FileUpload.name.split(".").pop() != 'csv' || this.selectedAsset==null || this.selectedTagNumber==null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "File is not in csv format or Fields are empty" })
    }
    else{
      const formData:FormData=new FormData();
      formData.append("File",this.FileUpload);
      formData.append("Asset",this.selectedAsset);
      formData.append("TagNumber",this.selectedTagNumber);
      console.log(formData);
      this.http.post("api/FileUploadingAPI/Upload",formData).subscribe((res:any)=>{
        console.log(res);
        this.BatchId=res.Id;
        this.Description=res.Description;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "File uploaded SuccessFully" })
        this.uploadSuccess=true;
      },
      (err)=> {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error while uploading" })
      })
    }
  }
}