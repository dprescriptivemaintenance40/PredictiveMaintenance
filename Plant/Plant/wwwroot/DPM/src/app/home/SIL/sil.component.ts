import { Component, ViewChild, ElementRef,OnInit } from "@angular/core";
import * as jspreadsheet from "jspreadsheet-ce";

@Component({
  selector: 'app-sil',
  templateUrl: './sil.component.html',
  styleUrls: ['./sil.component.scss'],

})

export class SILComponent implements OnInit {
@ViewChild("spreadsheet") spreadsheet: ElementRef;
ngOnInit() {
    
} 
constructor(){

    }
    ngAfterViewInit() {
      jspreadsheet(this.spreadsheet.nativeElement, {
          data: [[]],
          columns: [
            { type: "text",title:'Impact Event', width: "200",source: ["Fire from distilation column rupture"]},
            { type:'dropdown',title:'Category', width:"150",source: ["People","Environment","Assets"]},
            { type:'dropdown',title:'Severity', width:"100",source: ["1","2","3","4","5","6"]},
            { type:'text',title:'TMEL', width:"100"},
            { type:'dropdown',title:'Initiating Cause', width:"200",autocomplete:true,source: ["Loss of Cooling Water","Malfunction Level"]},
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
    } 
}