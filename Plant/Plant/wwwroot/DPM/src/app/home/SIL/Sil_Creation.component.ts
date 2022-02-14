import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as jspreadsheet from "jspreadsheet-ce";
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import * as $ from 'jquery';

@Component({
  selector: 'app-sil',
  templateUrl: './Sil_Creation.component.html',
  styleUrls: ['./Sil_Creation.component.scss'],
  providers:[DialogService,MessageService]
})

export class SILComponent implements OnInit {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  public getData: any = [];
  public MasterData: any = [];
  public initiatingCausesMasterList: any = [];
  public SeverityList: any = [];
  public SeverityValueList: any = [];
  public CategoryList: any = [];
  public CategoryNameList: any = [];
  public InitiatingCauseValue: any = [];
  // public SheetValue:any = [];
  public val: any = [];
  public SheetValue: Array<any>=[];
  public cols:Array<any>=[];
  public arr:any=[];
  public ForecastData:boolean=false;
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getMasterData();
    this.val = this.getData.data;

  }
  ngAfterViewChecked() {
    // this.SheetValue = this.getData.content.innerText;
    // console.log(JSON.stringify(this.SheetValue));
  }
  constructor(private SILClassificationBLService: CommonBLService, private primengConfig: PrimeNGConfig) { }

  ngAfterViewInit() {
    this.getData = jspreadsheet(this.spreadsheet.nativeElement, {
      data: [[]],
      columns: [
        { type: "text", title: 'Impact Event', width: "200", source: ["Fire from distilation column rupture"] },
        { type: 'dropdown', title: 'Category', width: "150", source: this.CategoryNameList },
        { type: 'dropdown', title: 'Severity', width: "100",  },
        { type: 'text', title: 'TMEL', width: "100" },
        { type: 'dropdown', title: 'Initiating Causes', width: "200", autocomplete: true, source: this.InitiatingCauseValue },
        { type: 'text', title: 'IEF', width: "150" },
        { type: 'text', title: 'IP', width: "100" },
        { type: 'text', title: 'People Present', width: "100" },
        { type: 'text', title: 'Time at Risk', width: "100" },
        { type: 'text', title: 'Description', width: "200" },
        { type: 'text', title: 'PFD', width: "100" },
        { type: 'text', title: 'Description', width: "200" },
        { type: 'text', title: 'PFD', width: "100" },
        { type: 'text', title: 'Description', width: "200" },
        { type: 'text', title: 'PFD', width: "100" },
        { type: 'text', title: 'Description', width: "200" },
        { type: 'text', title: 'PFD', width: "100" },
        { type: 'text', title: 'Description', width: "200" },
        { type: 'text', title: 'PFD', width: "100" },
        //{ type: 'dropdown', title: 'IPLs', width: "200", source: ["General Process Design", "BPCS", "Alarm", "Restricted Access", "IPL-Dyke,PRV"], multiple: 'true' },
        // { type:'text',title:'Calculate Intermediate Event Likelihood ', width:"100"},
        // { type:'text',title:'IC Tag Number', width:"100"},
      ],
      nestedHeaders: [
        [
          {
            title: 'Consequence Screening',
            colspan: '4',
          },
          {
            title: 'Initiating Event',
            colspan: '2',
          },
          {
            title: 'Conditional Modifiers',
            colspan: '3'
          },
          {
            title: 'General Process Design',
            colspan: '2'
          },
          {
            title: 'BPCS',
            colspan: '2'
          },
          {
            title: 'Alarm',
            colspan: '2'
          },
          {
            title: 'Restricted Access',
            colspan: '2'
          },
          {
            title: 'IPL Dyke, PRV',
            colspan: '2'
          }
        ],
      ],
      mergeCells: {
        // A1:[,3]
      },
      onselection: this.selectionActive,
      defaultColWidth: 100,
      tableOverflow: true,
      tableWidth: "1350px",
      tableHeight: "600px",
      minDimensions: [19, 50]
    });
  }
 selectionActive =async(instance, x1, y1, x2, y2, origin)  =>{
    var cellName1 = jspreadsheet.getColumnNameFromId([x1, y1]);
    var cellName2 = jspreadsheet.getColumnNameFromId([x2, y2]);
    if((x1==2) && (x2==2)){
      this.ForecastData=true;
      alert("Success")
    }
    else{   console.log('The selection from ' + cellName1 + ' to ' + cellName2 + '');}
  
  }
  getMasterData() {
    this.SILClassificationBLService.getWithoutParameters("/SILClassificationAPI/GetMasterData")
      .subscribe((res: any) => {
        this.MasterData = res;
        console.log(this.MasterData)
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
      }, err => console.log(err.error))
  }
  Save() {
   // this.SheetValue = this.getData.content.textContent;
   this.SheetValue= this.getData.getData()
  this.arr=this.getData.getHeaders();
  this.cols = this.arr.split(",");
   console.log( this.cols );
    console.log(JSON.stringify(this.SheetValue));
   // console.log(this.cols);
  }

}

