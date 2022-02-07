import { Component, ViewChild, ElementRef,OnInit } from "@angular/core";
import * as jspreadsheet from "jspreadsheet-ce";
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

@Component({
  selector: 'app-sil',
  templateUrl: './sil.component.html',
  styleUrls: ['./sil.component.scss'],

})

export class SILComponent implements OnInit {
@ViewChild("spreadsheet") spreadsheet: ElementRef;
public getData:any = [];
public MasterData:any = [];
public initiatingCausesMasterList:any = [];
public SeverityList:any = [];
public SeverityValueList:any = [];
public CategoryList:any = [];
public CategoryNameList:any = [];
public InitiatingCauseValue:any = [];

ngOnInit() {
  this.getMasterData();
} 
constructor(private SILClassificationBLService: CommonBLService,){

    }
    ngAfterViewInit() {
      this.getData=jspreadsheet(this.spreadsheet.nativeElement, {
          data: [[]],
          columns: [
            { type: "text",title:'Impact Event', width: "200",source: ["Fire from distilation column rupture"]},
            { type:'dropdown',title:'Category', width:"150",source: this.CategoryNameList},
            { type:'dropdown',title:'Severity', width:"100",source: this.SeverityValueList},
            { type:'text',title:'TMEL', width:"100"},
            { type:'dropdown',title:'Initiating Cause', width:"200",autocomplete:true,source: this.InitiatingCauseValue},
            { type:'text',title:'Frequency of IC', width:"200"},
            { type:'text',title:'IC Tag Number', width:"100"},
            { type:'dropdown',title:'IPLs', width:"200",source: ["General Process Design","BPCS","Alarm","Restricted Access","IPL-Dyke,PRV"],multiple:'true'},
            { type:'text',title:'Calculate Intermediate Event Likelihood ', width:"100"},
            { type:'text',title:'IP', width:"100"},
            { type:'text',title:'People Present', width:"100"},
            { type:'text',title:'Time at Risk', width:"100"},
          ],
          mergeCells:{
            A1:[,3]
        },
        defaultColWidth: 100,
        tableOverflow: true,
        tableWidth: "1200px",
        minDimensions: [10, 3]
      });
      console.log(this.getData);
    } 

    getMasterData(){
      this.SILClassificationBLService.getWithoutParameters("/SILClassificationAPI/GetMasterData")
      .subscribe((res:any) =>{
        this.MasterData = res;
        this.MasterData[0].initiatingCausesMaster.forEach(element => {
          this.initiatingCausesMasterList = element.InitiatingCause
          this.InitiatingCauseValue.push(this.initiatingCausesMasterList);
        });
        this.MasterData[0].riskMatrixMaster[0].Severity.forEach(element => {
          this.SeverityList = element.SeverityValue
          this.SeverityValueList.push(this.SeverityList);
        });
        this.MasterData[0].riskMatrixMaster[0].Category.forEach(element => {
          this.CategoryList = element.CategoryName
          this.CategoryNameList.push(this.CategoryList);
        });
      },err => console.log(err.error))
    }
}