import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as xlsx from "xlsx";
 import { HttpClient } from '@angular/common/http';
enum CheckBoxType { Manual, Automated, NONE };
@Component({
  selector: 'app-model-pipeline',
  templateUrl: './model-pipeline.component.html',
  providers: [MessageService],
  styleUrls: ['./model-pipeline.component.scss']
})
export class ModelPipelineComponent implements OnInit {

  check_box_type = CheckBoxType;
  currentlyChecked: boolean;
  Manual: boolean = true;
  Automated: boolean = false;
  validating: string = "";
  value: number = 0;
  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;
  value5: number = 0;
  progress: string = "";
  progress1: string = "";
  progress2: string = "";
  progress3: string = "";
  progress4: string = "";
  progress5: string = "";
  load: boolean = false;
  validate: boolean = false;
  calculate: boolean = false;
  aggregate: boolean = false;
  extrapolation: boolean = false;
  predict: boolean = false;
  dataExplanation: boolean = false;
  public file: File
  public filelist: any;
  public arrayBuffer: any;
  public compressorList:any = [];
  
  constructor(private messageService: MessageService, private route: Router
    ,private http:HttpClient) {

  }

  ngOnInit() {

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
  Upload() {
    this.load = true;
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 5;
      this.progress = "Loading the data";
      if (this.value >= 100) {
        this.value = 100;
        this.progress = "Completed loading of data : 1876 rows were added";
        this.Validate();
        clearInterval(interval);
      }
    }, 2000);
  }

  Validate() {
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
        this.validating = "Moving inaccurate data to other file";
      }
      else if (this.value1 >= 100) {
        this.validating = ""
        this.value1 = 100;
        this.progress1 = "Completed Validating of data";
        this.Calculate();
        clearInterval(interval);
      }
    }, 2000);
  }
  
  Calculate() {
    this.calculate = true;
    let interval = setInterval(() => {
      this.value2 = this.value2 + Math.floor(Math.random() * 10) + 5;
      this.progress2 = "Calculating Values";
      if (this.value2 >= 100) {
        this.value2 = 100;
        this.progress2 = "Completed Calculation";
        this.Aggregate();
        clearInterval(interval);
      }
    }, 2000);
  }

  Aggregate() {
    this.aggregate = true;
    let interval = setInterval(() => {
      this.value3 = this.value3 + Math.floor(Math.random() * 10) + 5;
      this.progress3 = "Aggregating Values";
      if (this.value3 >= 100) {
        this.value3 = 100;
        this.progress3 = "Completed Aggregation";
        this.Extrapolate();
        clearInterval(interval);
      }
    }, 2000);
  }

  Extrapolate() {
    this.extrapolation = true;
    let interval = setInterval(() => {
      this.value4 = this.value4 + Math.floor(Math.random() * 10) + 5;
      this.progress4 = "Extrapolation the data";
      if (this.value4 >= 100) {
        this.value4 = 100;
        this.progress4 = "Completed Extrapolation of data";
        this.Predict();
        clearInterval(interval);
      }
    }, 2000);
  }

  Predict() {
    this.predict = true;
    let interval = setInterval(() => {
      this.value5 = this.value5 + Math.floor(Math.random() * 10) + 5;
      this.progress5 = "Predicting the data";
      if (this.value5 >= 100) {
        this.value5 = 100;
        this.progress5 = "Completed Prediction of data";
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'File Uploaded',
        });
        clearInterval(interval);
        this.dataExplanation = true;
      }
    }, 2000);
  }

  addfile(event) {
    this.Upload()    
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = xlsx.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];  
        this.compressorList = xlsx.utils.sheet_to_json(worksheet,{raw:true});
        // console.log(this.store);
        // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = xlsx.utils.sheet_to_json(worksheet,{raw:true});  
        console.log(this.compressorList)
        this.filelist = [];    
        // console.log(this.filelist)  
        var TempcompressorModelObj = [];
        this.compressorList.forEach(element => {
          var obj:any={};
          obj['SrNo'] = JSON.stringify(element.SrNo),
          obj['Datetime'] = JSON.stringify(element.Datetime),
          obj['td1'] = JSON.stringify(element.td1);
          TempcompressorModelObj.push(obj);
         
        }); 
        console.log(TempcompressorModelObj)
       this.http.post("api/PredictiveChartAPI/UploadCSV",TempcompressorModelObj).subscribe (res =>
        alert(res)
        );
      } 
    }
}