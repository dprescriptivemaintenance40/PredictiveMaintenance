import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

enum CheckBoxType { Manual, Automated,NONE};
@Component({
  selector: 'app-model-pipeline',
  templateUrl: './model-pipeline.component.html',
  providers: [MessageService],
  styleUrls: ['./model-pipeline.component.scss']
})
export class ModelPipelineComponent implements OnInit {

  check_box_type = CheckBoxType;
  currentlyChecked: boolean;
  Manual:boolean=true;
  Automated:boolean=false;
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
  constructor(private messageService: MessageService) {

  }

  ngOnInit() {

  }
  selectCheckBox() {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if(this.Manual=== true && this.Automated===false) {
      this.Manual=false;
      alert("Scada and Sensor are not configured...")
      this.Automated=true;
    }
    else{
      this.Manual=true;
      this.Automated=false;
    }
  }
  Upload() {
    this.load = true;
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 5;
      this.progress = "Loading the data";
      if (this.value >= 100) {
        this.value = 100;
        this.progress = "Completed loading of data";
        this.Validate();
        clearInterval(interval);
      }
    }, 2000);
  }
  Validate() {
    this.validate = true;
    let interval = setInterval(() => {
      this.value1 = this.value1 + Math.floor(Math.random() * 10) + 5;
      this.progress1 = "Validating the data";
      if (this.value1 >= 100) {
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
      }
    }, 2000);
  }
}