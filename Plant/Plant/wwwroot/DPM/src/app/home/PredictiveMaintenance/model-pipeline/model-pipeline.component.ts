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

  public asset:string="";
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
  selectedFMName=null;
  public Error:boolean=false; 
  ErrorMsg=null;

  validating: string = "";
  value: number = 0;
  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;
  count: number = 0;
  progress: string = "";
  progress1: string = "";
  progress2: string = "";
  progress3: string = "";
  progress4: string = "";
  load: boolean = false;
  validate: boolean = false;
  calculate: boolean = false;
  processing: boolean = false;
  predict: boolean = false;

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
  Upload() {
    this.asset = this.selectedAsset;
    this.Error = false;
    this.uploadSuccess = false;
    if (this.FileUpload.name.split(".").pop() != 'csv') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Selected File is not in csv format" })
    }
    else if (this.selectedAsset == null || this.selectedTagNumber == null || this.selectedFMName == null || this.FileUpload == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the fields" })
    }
    else {
      const formData: FormData = new FormData();
      formData.append("File", this.FileUpload);
      formData.append("Asset", this.selectedAsset);
      formData.append("FailureModeName", this.selectedFMName);
      formData.append("TagNumber", this.selectedTagNumber);
      console.log(formData);
      this.load = true;
      
      this.progress = "Loading the data";

      this.http.post(`api/FileUploadingAPI/Upload`, formData)
        .subscribe((res: any) => {
          console.log(res);
          let interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 5;
            if (this.value >= 100) {
              this.value = 100;
              this.progress = "Completed loading of data";
              this.messageService.add({ severity: 'success', summary: 'Success', detail: "File uploaded SuccessFully" })
              this.Validate();
              clearInterval(interval);
            }
          }, 2000);
          this.BatchId = res.Id;
          this.Description = res.Description;
        },
          (err) => {
            this.Error = true;
            this.ErrorMsg = err.error;
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error from server side while uploading" })
          })
    }
  }

  Validate() {
    // this.load=false;
    this.validate = true;
    let interval = setInterval(() => {
      this.value1 = this.value1 + Math.floor(Math.random() * 10) + 5;
      this.progress1 = "Validating the data "
      if (this.value1 >= 10 && this.value1 <= 30) {
        this.validating = "Detecting inaccurate data";
      }
      else if (this.value1 > 30 && this.value1 <= 70) {
        this.validating = "Removing inaccurate data";
      }
      else if (this.value1 > 70 && this.value1 < 100) {
        this.validating = "Moving inaccurate data to error table and correct data to clean table";
      }
      else if (this.value1 >= 100) {
        this.validating = ""
        this.value1 = 100;
        this.progress1 = "Completed Validation of data";
        this.Calculate();
        clearInterval(interval);
      }
    }, 2000);
  }

  Calculate() {
    // this.validate=false;
    this.calculate = true;
    let interval = setInterval(() => {
      this.value2 = this.value2 + Math.floor(Math.random() * 10) + 5;
      this.progress2 = "Calculating incipient Values";
      if (this.value2 >= 100) {
        this.value2 = 100;
        this.progress2 = "Completed incipient calculation";
        this.ProcessMissingVal();
        clearInterval(interval);
      }
    }, 2000);
  }

  ProcessMissingVal() {
    // this.calculate=false;
    this.processing = true;
    let interval = setInterval(() => {
      this.value3 = this.value3 + Math.floor(Math.random() * 10) + 5;
      this.progress3 = "Adding the missing values data";
      if (this.value3 >= 100) {
        this.value3 = 100;
        this.progress3 = "Completed adding missing values";
        this.Predict();
        clearInterval(interval);
      }
    }, 2000);
  }

  Predict() {
    // this.processing=false;
    this.predict = true;
    let interval = setInterval(() => {
      this.value4 = this.value4 + Math.floor(Math.random() * 10) + 5;
      this.progress4 = "Predicting the data";
      if (this.value4 >= 100) {
        this.value4 = 100;
        this.progress4 = "Completed Prediction of data";
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Processing of file is completed!!!" });
        clearInterval(interval);
        this.uploadSuccess = true;
        this.selectedTagNumber = '';
        this.selectedFMName = '';
        this.selectedAsset = '';
        this.FileUpload = null;
      }
    }, 2000);
  }

  // Upload(){
  //   this.asset=this.selectedAsset;
  //   this.Error=false;
  //   this.uploadSuccess=false;
  //   if(this.FileUpload.name.split(".").pop() != 'csv'){
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: "Selected File is not in csv format" })
  //   }
  //   else if(this.selectedAsset==null || this.selectedTagNumber==null || this.selectedFMName==null || this.FileUpload==null){
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the fields" })
  //   }
  //   else{
  //     const formData:FormData=new FormData();
  //     formData.append("File",this.FileUpload);
  //     formData.append("Asset",this.selectedAsset);
  //     formData.append("FailureModeName",this.selectedFMName);
  //     formData.append("TagNumber",this.selectedTagNumber);
  //     console.log(formData);
  //     this.http.post("api/FileUploadingAPI/Upload",formData).subscribe((res:any)=>{
  //       console.log(res);
  //       this.BatchId=res.Id;
  //       this.Description=res.Description;
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: "File uploaded SuccessFully" })
  //       this.uploadSuccess=true;
  //     },
  //     (err)=> {
  //       this.Error=true;
  //       this.ErrorMsg=err.error;
  //       console.log(err)
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error from server side while uploading" })
  //     })
  //   }
  //   this.selectedTagNumber='';
  //   this.selectedFMName='';
  //   this.selectedAsset='';
  //   this.FileUpload=null;
  // }
}