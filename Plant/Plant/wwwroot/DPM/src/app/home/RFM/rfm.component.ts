import { Component, OnInit } from '@angular/core';
import * as xlsx from "xlsx";
import { RFMObjectModel } from './rfm.model';

@Component({
  selector: 'app-rfm',
  templateUrl: './rfm.component.html',
  styleUrls: ['./rfm.component.scss']
})
export class RFMComponent implements OnInit {

  public RFMObject:Array<RFMObjectModel>=new Array<RFMObjectModel>();
  public file: File
  public filelist: any;
  public arrayBuffer: any;
  public compressorList:any = [];
  count:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  addfile(event) {
      
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

        console.log(this.compressorList)
        var FailureModeList=[];
        var Commissioned_DateList=[];
        var Failure_Reported_DateList=[];
        var DaysList=[];

        //Step 1 :
        this.compressorList.forEach(element => {
          var fml=element.FailureMode;
          FailureModeList.push(fml);
          var cdl=element.Commissioned_Date;
          Commissioned_DateList.push(cdl);
          var frdl=element.Failure_Reported_Date;
          Failure_Reported_DateList.push(frdl);
          var dl=element.Days;
          DaysList.push(dl);
        }); 
      
        DaysList.sort((a, b) => a - b);

        var StepOne=[];
        var iOne=0;
        DaysList.forEach(element => {
          iOne++;
           var objOne={
            Days:element,
            Rank:iOne
           }
           StepOne.push(objOne)
        });
        console.log(StepOne)
        
        //Step 2:
        var StepTwo=[];
        var iTwo=0;
        DaysList.forEach(element => {
          iTwo++;
          var median=(iTwo-0.3)/(19+0.4);
          var log=Math.log(element);
          var cal1=1/(1-median);
          var cal2=Math.log(Math.log(cal1));
          var objTwo={
            MTBFDays:element,
            Rank:iTwo,
            MedianRankPercentage:Number(median.toFixed(2)),
            Log:Number(log.toFixed(2)),
            calculation1:Number(cal1.toFixed(2)),
            calculation2:Number(cal2.toFixed(2))
           }
          StepTwo.push(objTwo)

        });
        console.log(StepTwo)

        //Step 3:
    }
  }
  Upload(){
    alert("Success!!!")
  }
}


