import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as jspreadsheet from "jspreadsheet-ce";
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Calculation, ImpactEvent, InitiatingCause, ProtectionLayer, DynamicGroupName, RiskMatrix, SIFDesign } from 'src/app/home/SIL/Shared/Model/Sil_Creation.model';
import { SILConstantAPI } from '../Shared/Model/SILConstant';
import { HomeComponent } from "../../home.component";
import { DynamicTitle } from "../Shared/Model/Sil_dynamic.model";
import { FormBuilder, Validators, } from "@angular/forms";

@Component({
  selector: 'app-sil',
  templateUrl: './Sil_Creation.component.html',
  styleUrls: ['./Sil_Creation.component.scss'],
  providers: [DialogService, MessageService],
})

export class SILComponent implements OnInit {
  @ViewChild("spreadsheet") spreadsheetDiv: ElementRef;

  public data: any = [];
  public columns: any = [];
  public nestedHeaders: any = [];
  public jspreadsheet: any = [];
  public MasterData: any = [];
  public initiatingCausesMasterList: any = [];
  public SeverityList: any = [];
  public SeverityValueList: any = [];
  public CategoryList: any = [];
  public CategoryNameList: any = [];
  public InitiatingCauseValue: any = [];
  public val: any = [];
  public SheetValue: Array<any> = [];
  public cols: Array<any> = [];
  public arr: any = [];
  public RiskMatrix6: boolean = false;
  public RiskMatrix5: boolean = false;
  public display: boolean = false;
  public visibleSidebar5: boolean = false;
  public risk: string = "";
  public x: number;
  public y: number;
  public cells: string = "";
  public impact: ImpactEvent = new ImpactEvent();
  public RiskMatrixVal: RiskMatrix = new RiskMatrix();
  public initcauses: InitiatingCause = new InitiatingCause();
  public sifDesignObj: SIFDesign = new SIFDesign();
  public dynamicColumn: Array<DynamicGroupName> = new Array<DynamicGroupName>();
  public TargetSil: number = 0;
  public cal: Calculation = new Calculation(this.sifDesignObj);
  public company: string = "";
  public facility: string = "";
  public session: string = "";
  public sifid: number = 0;
  public node: number = 0;
  public description: string = "";
  public parameter: string = "";
  public iel: number = 0;
  public hidden: boolean = false;
  public editTitle: boolean = false;
  public removeTitle: boolean = false;
  public IPLTitle: string = "";
  public dynamicIPLObj: DynamicTitle = new DynamicTitle();
  public counter = 0;
  public sheet = 0;
  public IEL: number = 0;
  public IELValues: number = 1;
  public dynamicPFD: number = 19;
  public IELPosition: number = 0;
  public OIEL: number = 0;
  public OIELPValue: number = 0;
  public OIELEValue: number = 0;
  public OIELAValue: number = 0;
  public dynamicOIELPValue: number = 0;
  public dynamicOIELEValue: number = 0;
  public dynamicOIELAValue: number = 0;
  public PFDAVG: number = 0;
  public RRF: number = 0;
  public SIL: number = 0;
  public sheetIndex: number = 0;
  public dynamicsheetIndex: number = 0;
  public cat: string = "";
  public categoryIndex: number;
  public dynamiccategoryIndex: number;
  public categoryRow: number;
  public dynamiccategoryRow: number;
  public changedValue: number = 0;
  public dynamicIndex: number = 18;
  public dynamic: number = 0;
  public dynamicList: any = [];
  public dynamicPFDPosition: number = 18;
  public dynamicColumnPfd: number = 0;
  public getdynamicPFDValue: number;
  public OverallIELPosition: number = 0;
  public PFDAVGPosition: number = 0;
  public RRFPosition: number = 0;
  public TargetSILPosition: number = 0;
  public OIELValues: number = 0;
  public AddedIEL = 0;
  public condition: number = 0;

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getMasterData();
    this.val = this.jspreadsheet.data;
    this.home.CloseSideBar();
  }

  constructor(private SILClassificationBLService: CommonBLService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private SILConstantAPI: SILConstantAPI,
    private home: HomeComponent,
    private formBuilder: FormBuilder) {
  }

  silClassification = this.formBuilder.group({
    'node': [''],
    'sidId': ['', Validators.required],
    'interLockTag': ['', Validators.required],
    'matrix': ['', Validators.required],
    'sensor': ['', Validators.required],
    'finalElement': ['', Validators.required],
    'description': ['']
  })

  CreateColumns() {
    this.columns.push({ type: "text", title: 'Impact Event', width: "100", wordWrap: true, source: this.impact.ImpactEventDesciption }),
      this.columns.push({ type: 'dropdown', title: 'Category', width: "50", wordWrap: true, source: this.CategoryNameList }),
      this.columns.push({ type: 'text', title: 'Severity', width: "50", wordWrap: true, source: this.cells }),
      this.columns.push({ type: 'text', title: 'TMEL', tooltip: 'Column is readonly', wordWrap: true, width: "60", source: this.risk }),
      this.columns.push({ type: 'dropdown', title: 'Initiating Causes', wordWrap: true, width: "100", autocomplete: true, source: this.InitiatingCauseValue }),
      this.columns.push({ type: 'text', title: 'IEF', width: "60" }),
      this.columns.push({ type: 'text', title: 'IP', width: "40" }),
      this.columns.push({ type: 'text', title: 'PP', width: "40" }),
      this.columns.push({ type: 'text', title: 'TR', width: "40" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'number', title: 'IEL', width: "55", source: this.IEL }),
      this.columns.push({ type: 'number', title: 'Overall IEL', width: "55", source: this.OIEL }),
      this.columns.push({ type: 'number', title: 'PFDavg', width: "55", source: this.PFDAVG }),
      this.columns.push({ type: 'number', title: 'RRF', width: "55", source: this.RRF }),
      this.columns.push({ type: 'number', title: 'SIL', width: "55", source: this.SIL })
  }

  CreateHeaders() {
    this.nestedHeaders = [];
    this.nestedHeaders.push({ title: 'Consequence Screening', colspan: '4' }),
      this.nestedHeaders.push({ title: 'Initiating Event', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Conditional Modifiers', colspan: '3' }),
      this.nestedHeaders.push({ title: 'General Process Design', colspan: '2' }),
      this.nestedHeaders.push({ title: 'BPCS', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Alarm', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Restricted Access', colspan: '2' }),
      this.nestedHeaders.push({ title: 'IPL Dyke, PRV', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Calculations', colspan: '5' })
  }

  ngAfterViewInit() {
    this.CreateColumns();
    this.CreateHeaders();
    this.jspreadsheet = jspreadsheet(this.spreadsheetDiv.nativeElement, {
      data: this.data,
      columns: this.columns,
      nestedHeaders: this.nestedHeaders,
      onchange: this.changed,
      onselection: this.selectionActive,
      tableOverflow: true,
      tableWidth: "1350px",
      tableHeight: "600px",
      minDimensions: [24, 20]
    });
    // this.getData.hideColumn(19);
    // this.getData.hideColumn(20);
    // this.getData.hideColumn(21);
    // this.getData.hideColumn(22);
  }

  changed = async (instance, cell, x, y, value) => {
    // var cellName = jspreadsheet.getColumnNameFromId([x, y]);
    this.SheetValue = this.jspreadsheet.getData();

    if (this.dynamicColumn.length == 0) {
      if (x == 5) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = 1;
          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
          }
          this.IEL = this.jspreadsheet.setValueFromCoords(19, y, value.toPrecision(3), true);
          this.SetStaticCalculations(value, y, x);
        }
        else {
          if (this.condition == y) {
            if (this.IELValues == 0) {
              this.IELValues = 1;
              this.IELValues *= Number(value);
              this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues, true);
              this.SetStaticCalculations(value, y, x);
              this.condition = y;
            } else {
              this.IELValues *= value;
              this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues, true);
              this.SetStaticCalculations(value, y, x);
              this.condition = y;
            }
          }
          else {
            this.IELValues = 1;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues, true);
            this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
        }
      }
      else if (x == 6 || x == 7 || x == 8 || x == 10 || x == 12 || x == 14 || x == 16) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
          }
        }
        else {
          if (this.condition == y) {
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
          else {
            this.IELValues = 1;
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
        }
      }
      else if (x == 18) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
          }
        }
        else {
          if (this.condition == y) {
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
          else {
            this.IELValues = 1;
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues.toPrecision(3), true);
            this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
        }
      }
    }

    else if (this.dynamicColumn.length != 0) {
      var dynamicPFDPositionId = 0;
      var i = 0;
      this.dynamicList = [];
      this.dynamicColumnPfd = 0;
      this.dynamicPFDPosition = 18;
      this.dynamicColumn.forEach(dynamichseet => {
        let dynamicPosition = {}
        dynamicPosition['Id'] = dynamicPFDPositionId++;
        this.dynamicColumnPfd = this.dynamicPFDPosition += 2;
        dynamicPosition['dynamicPFDValue'] = this.dynamicColumnPfd;
        this.dynamicList.push(dynamicPosition);
        if (this.dynamicList[i].dynamicPFDValue == x) {
          this.getdynamicPFDValue = this.dynamicList[i].dynamicPFDValue;
        }
        i++;
      });
      var dynamicLength = this.dynamicColumn.length * 2;
      this.IELPosition = this.dynamicPFD + dynamicLength;
      this.OverallIELPosition = this.IELPosition + 1;
      this.PFDAVGPosition = this.OverallIELPosition + 1;
      this.RRFPosition = this.PFDAVGPosition + 1;
      this.TargetSILPosition = this.RRFPosition + 1;
      if (x == 5) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = 1;
          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
          }
          this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, value.toPrecision(3), true);
          this.SetDynamicCalculations(value, y, x);
        }
        else {
          if (this.condition == y) {
            if (this.IELValues == 0) {
              this.IELValues = 1;
              this.IELValues *= Number(value);
              this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
              this.SetDynamicCalculations(value, y, x);
              this.condition = y;
            } else {
              this.IELValues *= value;
              this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
              this.SetDynamicCalculations(value, y, x);
              this.condition = y;
            }

          }
          else {
            this.IELValues = 1;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
            this.SetDynamicCalculations(value, y, x);
            this.condition = y;
          }
        }
        // this.IELValues = value;
        // this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
      }
      else if (x == 6 || x == 7 || x == 8 || x == 10 || x == 12 || x == 14 || x == 16 || x == 18) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = 1;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, value.toPrecision(3), true);
            this.SetDynamicCalculations(value, y, x);
          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);
            this.SetDynamicCalculations(value, y, x);
          }

        }
        else {
          if (this.condition == y) {
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);
            // this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
          else {
            this.IELValues = 1;
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);

            this.condition = y;
          }
          this.SetDynamicCalculations(value, y, x);
        }
        // this.IELValues *= value;
        // this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
      }
      // else if (x == 18) {
      //   for (let dynamicSheet = this.dynamic; dynamicSheet < this.dynamicColumn.length; dynamicSheet++) {
      //     this.dynamicIndex += 2;
      //     this.dynamic++;
      //     break;
      //   }
      //   this.IELValues *= value;
      //   this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
      // }
      else if (x == this.getdynamicPFDValue) {
        if (value == 0) {
          if (this.IELValues == this.changedValue) {
            value = this.IELValues % this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);

          } else {
            value = this.IELValues / this.changedValue;
            this.IELValues = value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);
            // this.SetStaticCalculations(value, y, x);
          }
          this.SetDynamicCalculations(value, y, x);
        }
        else {
          if (this.condition == y) {
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);

            this.condition = y;
          }
          else {
            this.IELValues = 1;
            this.IELValues *= value;
            this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues.toPrecision(3), true);
            // this.SetStaticCalculations(value, y, x);
            this.condition = y;
          }
          this.SetDynamicCalculations(value, y, x);
        }
        // this.dynamicIndex += 2;
        // this.IELValues *= value;
        // this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
        // this.SetDynamicCalculations(x, y, value);
        // for (let category = this.dynamicsheetIndex; category < this.SheetValue.length; category++) {
        //   if (this.SheetValue[category][1] != "") {
        //     this.cat = this.SheetValue[category][1];
        //     this.dynamicsheetIndex = category;
        //     this.dynamicsheetIndex++;
        //     this.dynamiccategoryRow = category;
        //     this.dynamiccategoryIndex = category;
        //     break;
        //   }
        // }

        // if (this.cat == "P") {
        //   for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        //     if (this.SheetValue[sheet][1] == 'P' || this.SheetValue[sheet][1] == "") {
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "P" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x != this.IELPosition) {
        //             this.IELValues *= value;
        //             this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
        //           }
        //         }

        //         else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'A') {
        //           break;
        //         }
        //       }
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "P" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x == this.IELPosition - 1) {
        //             this.dynamicOIELPValue += this.IELValues;
        //             this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELPValue, true);
        //             var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELPValue;
        //             pfd.toPrecision(3);
        //             this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
        //             var rrf = 1 / pfd;
        //             rrf.toPrecision(3);
        //             this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
        //             if (rrf < 10) { var sil = 0; }
        //             else if (rrf > 10 || rrf < 100) { var sil = 1; }
        //             else if (rrf > 100 || rrf < 1000) { var sil = 2; }
        //             else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
        //             else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
        //             else { alert("Need another sif") }
        //             this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
        //             this.dynamiccategoryIndex++;
        //             break;
        //           }
        //           else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'A') {
        //             break;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // if (this.cat == "E") {
        //   for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        //     if (this.SheetValue[sheet][1] == 'E' || this.SheetValue[sheet][1] == "") {
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "E" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x != this.IELPosition) {
        //             this.IELValues *= value;
        //             this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
        //           }
        //         }

        //         else if (this.SheetValue[initcause][1] == 'P' || this.SheetValue[initcause][1] == 'A') {
        //           break;
        //         }
        //       }
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "E" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x == this.IELPosition - 1) {
        //             this.dynamicOIELEValue += this.IELValues;
        //             this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELEValue, true);
        //             var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELEValue;
        //             pfd.toPrecision(3);
        //             this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
        //             var rrf = 1 / pfd;
        //             rrf.toPrecision(3);
        //             this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
        //             if (rrf < 10) { var sil = 0; }
        //             else if (rrf > 10 || rrf < 100) { var sil = 1; }
        //             else if (rrf > 100 || rrf < 1000) { var sil = 2; }
        //             else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
        //             else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
        //             else { alert("Need another sif") }
        //             this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
        //             this.dynamiccategoryIndex++;
        //             break;
        //           }
        //           else if (this.SheetValue[initcause][1] == 'P' || this.SheetValue[initcause][1] == 'A') {
        //             break;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // if (this.cat == "A") {
        //   for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        //     if (this.SheetValue[sheet][1] == 'A' || this.SheetValue[sheet][1] == "") {
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "A" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x != this.IELPosition) {
        //             this.IELValues *= value;
        //             this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
        //           }
        //         }

        //         else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'P') {
        //           break;
        //         }
        //       }
        //       for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
        //         if ((this.SheetValue[initcause][1] == "A" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
        //           if (x == this.IELPosition - 1) {
        //             this.dynamicOIELAValue += this.IELValues;
        //             this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELAValue, true);
        //             var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELAValue;
        //             pfd.toPrecision(3);
        //             this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
        //             var rrf = 1 / pfd;
        //             rrf.toPrecision(3);
        //             this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
        //             if (rrf < 10) { var sil = 0; }
        //             else if (rrf > 10 || rrf < 100) { var sil = 1; }
        //             else if (rrf > 100 || rrf < 1000) { var sil = 2; }
        //             else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
        //             else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
        //             else { alert("Need another sif") }
        //             this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
        //             this.dynamiccategoryIndex++;
        //             break;
        //           }
        //           else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'P') {
        //             break;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }
  }
  SetStaticCalculations(value, y, x) {

    this.sheetIndex = y;
    this.categoryIndex = y;

    for (let category = this.sheetIndex; category < this.SheetValue.length; category++) {
      if (this.SheetValue[category][1] != "") {
        this.cat = this.SheetValue[category][1];
        this.sheetIndex = category;
        this.sheetIndex++;
        this.categoryRow = category;
        this.categoryIndex = category;
        break;
      }
    }

    if (this.cat == "P") {
      for (let sheet = this.categoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'P' || this.SheetValue[sheet][1] == "") {
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "P" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "" && x != 20) {
              if (this.SheetValue[initcause][1] == "") {
                let tempOIELPVAlue = this.OIELPValue;
                let storeOIELPVAlue = tempOIELPVAlue + Number(this.IELValues);
                tempOIELPVAlue += storeOIELPVAlue
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, storeOIELPVAlue, true);
                // this.OIELPValue += Number(this.IELValues);
              } else if (this.SheetValue[initcause][1] != "") {
                this.OIELPValue = Number(this.IELValues);
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, this.OIELPValue, true);
              }
              var pfd = this.SheetValue[this.categoryRow][3] / this.OIELPValue;
              this.PFDAVG = this.jspreadsheet.setValueFromCoords(21, this.categoryRow, pfd.toPrecision(3), true);
              var rrf = 1 / pfd;
              this.RRF = this.jspreadsheet.setValueFromCoords(22, this.categoryRow, rrf.toPrecision(3), true);
              if (rrf < 10) { var sil = 0; }
              else if (rrf > 10 || rrf < 100) { var sil = 1; }
              else if (rrf > 100 || rrf < 1000) { var sil = 2; }
              else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
              else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
              else { alert("Need another sif") }
              this.SIL = this.jspreadsheet.setValueFromCoords(23, this.categoryRow, sil, true);
              this.categoryIndex++;
              break;
            }
            else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'A') {
              break;
            }
          }
        }
      }
    }

    else if (this.cat == "E") {
      for (let sheet = this.categoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'E' || this.SheetValue[sheet][1] == "") {
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "E" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "" && x != 20) {
              // if (x == 18) {
              //   this.IELValues *= Number(value);
              //   this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues, true);
              // }
              if (this.SheetValue[initcause][1] == "") {
                let tempOIELEVAlue = this.OIELEValue;
                let storeOIELEVAlue = tempOIELEVAlue + Number(this.IELValues);
                tempOIELEVAlue += storeOIELEVAlue
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, storeOIELEVAlue, true);
                // this.OIELPValue += Number(this.IELValues);
              } else if (this.SheetValue[initcause][1] != "") {
                this.OIELEValue = Number(this.IELValues);
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, this.OIELEValue, true);
              }
              if (this.condition != y) {

              }
              var pfd = this.SheetValue[this.categoryRow][3] / this.OIELEValue;
              this.PFDAVG = this.jspreadsheet.setValueFromCoords(21, this.categoryRow, pfd.toPrecision(3), true);
              var rrf = 1 / pfd;
              this.RRF = this.jspreadsheet.setValueFromCoords(22, this.categoryRow, rrf.toPrecision(3), true);
              if (rrf < 10) { var sil = 0; }
              else if (rrf > 10 || rrf < 100) { var sil = 1; }
              else if (rrf > 100 || rrf < 1000) { var sil = 2; }
              else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
              else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
              else { alert("Need another sif") }
              this.SIL = this.jspreadsheet.setValueFromCoords(23, this.categoryRow, sil, true);
              this.categoryIndex++;
              break;
            }
            else if (this.SheetValue[initcause][1] == 'P' || this.SheetValue[initcause][1] == 'A') {
              break;
            }

          }
        }

      }
    }

    else if (this.cat == "A") {
      for (let sheet = this.categoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'A' || this.SheetValue[sheet][1] == "") {
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "A" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "" && x != 20) {
              // if (x == 18) {
              //   this.IELValues *= Number(value);
              //   this.IEL = this.jspreadsheet.setValueFromCoords(19, y, this.IELValues, true);
              // }
              if (this.SheetValue[initcause][1] == "") {
                let tempOIELAVAlue = this.OIELAValue;
                let storeOIELAVAlue = tempOIELAVAlue + Number(this.IELValues);
                tempOIELAVAlue += storeOIELAVAlue
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, storeOIELAVAlue, true);
                // this.OIELPValue += Number(this.IELValues);
              } else if (this.SheetValue[initcause][1] != "") {
                this.OIELAValue = Number(this.IELValues);
                this.OIEL = this.jspreadsheet.setValueFromCoords(20, this.categoryRow, this.OIELAValue, true);
              }
              if (this.condition != y) {

              }
              var pfd = this.SheetValue[this.categoryRow][3] / this.OIELAValue;
              this.PFDAVG = this.jspreadsheet.setValueFromCoords(21, this.categoryRow, pfd.toPrecision(3), true);
              var rrf = 1 / pfd;
              this.RRF = this.jspreadsheet.setValueFromCoords(22, this.categoryRow, rrf.toPrecision(3), true);
              if (rrf < 10) { var sil = 0; }
              else if (rrf > 10 || rrf < 100) { var sil = 1; }
              else if (rrf > 100 || rrf < 1000) { var sil = 2; }
              else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
              else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
              else { alert("Need another sif") }
              this.SIL = this.jspreadsheet.setValueFromCoords(23, this.categoryRow, sil, true);
              this.categoryIndex++;
              break;
            }
            else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'P') {
              break;
            }
          }
        }
      }
    }
  }

  SetDynamicCalculations(value, y, x) {
    this.dynamicsheetIndex = y;
    this.dynamiccategoryIndex = y;
    for (let category = this.dynamicsheetIndex; category < this.SheetValue.length; category++) {
      if (this.SheetValue[category][1] != "") {
        this.cat = this.SheetValue[category][1];
        this.dynamicsheetIndex = category;
        // this.dynamicsheetIndex++;
        this.dynamiccategoryRow = category;
        // this.dynamiccategoryIndex = category;
        break;
      }
    }

    if (this.cat == "P") {
      for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'P' || this.SheetValue[sheet][1] == "") {
          // for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
          //   if ((this.SheetValue[initcause][1] == "P" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
          //     if (x != this.IELPosition) {
          //       this.IELValues *= value;
          //       this.IEL = this.jspreadsheet.setValueFromCoords(this.IELPosition, y, this.IELValues, true);
          //     }
          //   }

          //   else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'A') {
          //     break;
          //   }
          // }
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "P" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
              if (this.dynamicColumn.length > 0) {
                if (this.SheetValue[initcause][1] == "") {
                  let tempDyanmicOIELPVAlue = this.dynamicOIELPValue;
                  let storeOIELPVAlue = tempDyanmicOIELPVAlue + Number(this.IELValues);
                  tempDyanmicOIELPVAlue += storeOIELPVAlue
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, storeOIELPVAlue, true);
                  // this.OIELPValue += Number(this.IELValues);
                } else if (this.SheetValue[initcause][1] != "") {
                  this.dynamicOIELPValue = Number(this.IELValues);
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELPValue, true);
                }
                // this.dynamicOIELPValue = this.IELValues;
                // this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELPValue, true);
                var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELPValue;
                pfd.toPrecision(3);
                this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
                var rrf = 1 / pfd;
                rrf.toPrecision(3);
                this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
                if (rrf < 10) { var sil = 0; }
                else if (rrf > 10 || rrf < 100) { var sil = 1; }
                else if (rrf > 100 || rrf < 1000) { var sil = 2; }
                else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
                else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
                else { alert("Need another sif") }
                this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
                // this.dynamiccategoryIndex++;
                break;
              }
              else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'A') {
                break;
              }
            }

          }
        }
      }
    }
    if (this.cat == "E") {
      for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'E' || this.SheetValue[sheet][1] == "") {
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "E" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
              if (this.dynamicColumn.length > 0) {
                if (this.SheetValue[initcause][1] == "") {
                  let tempDyanmicOIELEVAlue = this.dynamicOIELEValue;
                  let storeOIELEVAlue = tempDyanmicOIELEVAlue + Number(this.IELValues);
                  tempDyanmicOIELEVAlue += storeOIELEVAlue
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, storeOIELEVAlue, true);
                  // this.OIELPValue += Number(this.IELValues);
                } else if (this.SheetValue[initcause][1] != "") {
                  this.dynamicOIELEValue = Number(this.IELValues);
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELEValue, true);
                }
                // this.dynamicOIELPValue = this.IELValues;
                // this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELPValue, true);
                var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELEValue;
                pfd.toPrecision(3);
                this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
                var rrf = 1 / pfd;
                rrf.toPrecision(3);
                this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
                if (rrf < 10) { var sil = 0; }
                else if (rrf > 10 || rrf < 100) { var sil = 1; }
                else if (rrf > 100 || rrf < 1000) { var sil = 2; }
                else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
                else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
                else { alert("Need another sif") }
                this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
                // this.dynamiccategoryIndex++;
                break;
              }
              else if (this.SheetValue[initcause][1] == 'P' || this.SheetValue[initcause][1] == 'A') {
                break;
              }
            }

          }
        }
      }
    }
    if (this.cat == "A") {
      for (let sheet = this.dynamiccategoryIndex; sheet < this.SheetValue.length; sheet++) {
        if (this.SheetValue[sheet][1] == 'A' || this.SheetValue[sheet][1] == "") {
          for (let initcause = sheet; initcause < this.SheetValue.length; initcause++) {
            if ((this.SheetValue[initcause][1] == "A" || this.SheetValue[initcause][1] == "") && this.SheetValue[initcause][4] != "") {
              if (this.dynamicColumn.length > 0) {
                if (this.SheetValue[initcause][1] == "") {
                  let tempDyanmicOIELAVAlue = this.dynamicOIELAValue;
                  let storeOIELAVAlue = tempDyanmicOIELAVAlue + Number(this.IELValues);
                  tempDyanmicOIELAVAlue += storeOIELAVAlue
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, storeOIELAVAlue, true);
                  // this.OIELPValue += Number(this.IELValues);
                } else if (this.SheetValue[initcause][1] != "") {
                  this.dynamicOIELAValue = Number(this.IELValues);
                  this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELAValue, true);
                }
                // this.dynamicOIELPValue = this.IELValues;
                // this.OIEL = this.jspreadsheet.setValueFromCoords(this.OverallIELPosition, this.dynamiccategoryRow, this.dynamicOIELPValue, true);
                var pfd = this.SheetValue[this.dynamiccategoryRow][3][0] / this.dynamicOIELAValue;
                pfd.toPrecision(3);
                this.PFDAVG = this.jspreadsheet.setValueFromCoords(this.PFDAVGPosition, this.dynamiccategoryRow, pfd, true);
                var rrf = 1 / pfd;
                rrf.toPrecision(3);
                this.RRF = this.jspreadsheet.setValueFromCoords(this.RRFPosition, this.dynamiccategoryRow, rrf, true);
                if (rrf < 10) { var sil = 0; }
                else if (rrf > 10 || rrf < 100) { var sil = 1; }
                else if (rrf > 100 || rrf < 1000) { var sil = 2; }
                else if (rrf > 1000 || rrf < 10000) { var sil = 3; }
                else if (rrf > 10000 || rrf < 100000) { var sil = 4; }
                else { alert("Need another sif") }
                this.SIL = this.jspreadsheet.setValueFromCoords(this.TargetSILPosition, this.dynamiccategoryRow, sil, true);
                // this.dynamiccategoryIndex++;
                break;
              }
              else if (this.SheetValue[initcause][1] == 'E' || this.SheetValue[initcause][1] == 'P') {
                break;
              }
            }

          }
        }
      }
    }
  }
  selectionActive = async (instance, x1, y1, x2, y2, origin) => {
    var cellName1 = jspreadsheet.getColumnNameFromId([x1, y1]);
    var cellName2 = jspreadsheet.getColumnNameFromId([x2, y2]);
    this.x = x1;
    this.y = y1;
    if ((x1 == 2) && (x2 == 2)) {
      if (this.sifDesignObj.RiskMatrix == "6*6 matrix") {
        this.RiskMatrix6 = true;
      }
      else if (this.sifDesignObj.RiskMatrix == "5*5 matrix") {
        this.RiskMatrix5 = true;
      }
    }
    if (x1 == 5 || x1 == 6 || x1 == 7 || x1 == 8 || x1 == 10 || x1 == 12 || x1 == 14 || x1 == 16 || x1 == 18 || x1 == this.getdynamicPFDValue) {
      this.SheetValue = this.jspreadsheet.getData();
      var val = this.SheetValue[y1][x1]
      if (val != "") {
        this.changedValue = val;
      }
    }
  }

  public getMasterData() {
    this.SILClassificationBLService.getWithoutParameters("/SILClassificationAPI/GetMasterData")
      .subscribe((res: any) => {
        this.MasterData = res;
        // console.log(this.MasterData)
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

  public Save() {
    this.SheetValue = this.jspreadsheet.getData();
    this.arr = this.jspreadsheet.getHeaders();
    this.cols = this.arr.split(",");
    let sifDesignObj = [];
    let sif = new SIFDesign();
    sif.Id = this.sifid;
    sif.HazopNodeId = this.node;
    sif.FinalElement = this.sifDesignObj.FinalElement;
    sif.RiskMatrix = this.sifDesignObj.RiskMatrix;
    sif.Sensor = this.sifDesignObj.Sensor;
    sif.SIFDescription = this.description;
    sif.InterLockTag = this.sifDesignObj.InterLockTag;
    sif.TargetSIL = this.sifDesignObj.TargetSIL;
    var impactId = 0;
    for (let n = 0; n < this.SheetValue.length; n++) {
      if (this.SheetValue[n][0] != "") {
        let impacts = new ImpactEvent();
        impactId++;
        impacts.Id = impactId;
        impacts.SIFId = sif.Id;
        impacts.ImpactEventDesciption = this.SheetValue[n][0];
        var riskMatrixId = 0;
        for (let i = n; i < this.SheetValue[i].length; i++) {
          if ((this.SheetValue[i][0] == "" || this.SheetValue[i][0] == impacts.ImpactEventDesciption) && this.SheetValue[i][1] == "P" && this.SheetValue[i][2] != "" && this.SheetValue[i][3] != "") {
            let riskMatrix = new RiskMatrix();
            riskMatrixId++
            riskMatrix.RMId = riskMatrixId;
            riskMatrix.IEId = impacts.Id;
            riskMatrix.Category = this.SheetValue[i][1];
            riskMatrix.Severity = this.SheetValue[i][2][0];
            riskMatrix.TRF = this.SheetValue[i][3][0];
            impacts.RiskMatrix.push(riskMatrix);
            this.RiskMatrixVal = riskMatrix;
            var initcauseId = 0;
            for (let l = i; l < this.SheetValue[i].length; l++) {
              if (this.SheetValue[l][0] != "" && this.SheetValue[l][1] == "P" && this.SheetValue[l][2] != "" && this.SheetValue[l][3] != "" && this.SheetValue[l][4] != "" ||
                this.SheetValue[l][0] == "" && this.SheetValue[l][1] == "" && this.SheetValue[l][2] == "" && this.SheetValue[l][3] == "" && this.SheetValue[l][4] != "" ||
                this.SheetValue[l][0] == "" && this.SheetValue[l][1] == "P" && this.SheetValue[l][2] != "" && this.SheetValue[l][3] != "" && this.SheetValue[l][4] != "") {

                let initcause = new InitiatingCause();
                initcauseId++
                var j = 4;
                var counter = 0;
                initcause.Id = initcauseId;
                initcause.RMId = riskMatrix.RMId;
                initcause.IEF = this.SheetValue[l][j + 1];
                initcause.IP = this.SheetValue[l][j + 2];
                initcause.PP = this.SheetValue[l][j + 3];
                initcause.TR = this.SheetValue[l][j + 4];
                initcause.initiatingCause = this.SheetValue[l][j];
                this.initcauses = initcause;
                riskMatrix.InitiatingCauses.push(initcause);

                let protection = new ProtectionLayer();
                protection.Id = 1;
                protection.ICId = initcause.Id;
                protection.NameOfIPL = "General Process Design";
                protection.Description = this.SheetValue[l][9]
                protection.PFD = this.SheetValue[l][10]
                initcause.ProtectionLayers.push(protection);

                let protections = new ProtectionLayer();
                protections.Id = 2;
                protections.ICId = initcause.Id;
                protections.NameOfIPL = "BPCS";
                protections.Description = this.SheetValue[l][11]
                protections.PFD = this.SheetValue[l][12]
                initcause.ProtectionLayers.push(protections);

                let protectionlayer = new ProtectionLayer();
                protectionlayer.Id = 3;
                protectionlayer.ICId = initcause.Id;
                protectionlayer.NameOfIPL = "Alarm";
                protectionlayer.Description = this.SheetValue[l][13]
                protectionlayer.PFD = this.SheetValue[l][14]
                initcause.ProtectionLayers.push(protectionlayer);

                let protectionlayers = new ProtectionLayer();
                protectionlayers.Id = 4;
                protectionlayers.ICId = initcause.Id;
                protectionlayers.NameOfIPL = "Restricted Acess";
                protectionlayers.Description = this.SheetValue[l][15]
                protectionlayers.PFD = this.SheetValue[l][16]
                initcause.ProtectionLayers.push(protectionlayers);

                let iplDyke = new ProtectionLayer();
                iplDyke.Id = 5;
                iplDyke.ICId = initcause.Id;
                iplDyke.NameOfIPL = "IPL Dyke,PRV";
                iplDyke.Description = this.SheetValue[l][17]
                iplDyke.PFD = this.SheetValue[l][18]
                initcause.ProtectionLayers.push(iplDyke);

                let pfdDescIndex = 19;
                let pfdValueIndex = 20;
                this.dynamicColumn.forEach(dynamicolumns => {
                  let dynamic = new DynamicGroupName();
                  dynamic.DynamicId = 1;
                  dynamic.ICId = initcause.Id;
                  dynamic.GroupName = dynamicolumns.GroupName;
                  dynamic.pfdDescription = this.SheetValue[l][pfdDescIndex];
                  dynamic.pfdValue = Number(this.SheetValue[l][pfdValueIndex]);
                  initcause.DynamicGroupNames.push(dynamic);
                  pfdDescIndex += 2;
                  pfdValueIndex += 2;
                });
              }
              else if ((this.SheetValue[l][1] == "E" || this.SheetValue[l][1] == "A") || (this.SheetValue[l][0] == "" && this.SheetValue[l][1] == "" && this.SheetValue[l][2] == "" && this.SheetValue[l][3] == ""
                && this.SheetValue[l][4] == "" && this.SheetValue[l][5] == "" && this.SheetValue[l][6] == "" && this.SheetValue[l][7] == "")) {
                break;
              }
            }
          }
          else if ((this.SheetValue[i][0] == "" || this.SheetValue[i][0] == impacts.ImpactEventDesciption) && this.SheetValue[i][1] == "E" && this.SheetValue[i][2] != "" && this.SheetValue[i][3] != "") {
            let riskMatrix = new RiskMatrix();
            riskMatrixId++
            riskMatrix.RMId = riskMatrixId;
            riskMatrix.IEId = impacts.Id;
            riskMatrix.Category = this.SheetValue[i][1];
            riskMatrix.Severity = this.SheetValue[i][2][0];
            riskMatrix.TRF = this.SheetValue[i][3][0];
            // var trfe= riskMatrix.TRFE;
            impacts.RiskMatrix.push(riskMatrix);
            this.RiskMatrixVal = riskMatrix;
            var initcauseId = 0;
            for (let j = i; j < this.SheetValue[i].length; j++) {
              if ((this.SheetValue[j][0] == "" && this.SheetValue[j][1] == "E" && this.SheetValue[j][2] != "" && this.SheetValue[j][3] != "" && this.SheetValue[j][4] != "") ||
                (this.SheetValue[j][0] == "" && this.SheetValue[j][1] == "" && this.SheetValue[j][2] == "" && this.SheetValue[j][3] == "" && this.SheetValue[j][4] != "") ||
                (this.SheetValue[j][0] != "" && this.SheetValue[j][1] == "E" && this.SheetValue[j][2] != "" && this.SheetValue[j][3] != "" && this.SheetValue[j][4] != "")) {
                let initcause = new InitiatingCause();
                var k = 4;
                initcauseId++;
                initcause.Id = initcauseId;
                initcause.RMId = riskMatrix.RMId;
                initcause.IEF = this.SheetValue[j][k + 1];
                initcause.IP = this.SheetValue[j][k + 2];
                initcause.PP = this.SheetValue[j][k + 3];
                initcause.TR = this.SheetValue[j][k + 4];
                initcause.initiatingCause = this.SheetValue[j][k];
                this.initcauses = initcause;
                riskMatrix.InitiatingCauses.push(initcause);

                let protection = new ProtectionLayer();
                protection.Id = 1;
                protection.ICId = initcause.Id;
                protection.NameOfIPL = "General Process Design";
                protection.Description = this.SheetValue[j][9]
                protection.PFD = this.SheetValue[j][10]
                initcause.ProtectionLayers.push(protection);

                let protections = new ProtectionLayer();
                protections.Id = 2;
                protections.ICId = initcause.Id;
                protections.NameOfIPL = "BPCS";
                protections.Description = this.SheetValue[j][11]
                protections.PFD = this.SheetValue[j][12]
                initcause.ProtectionLayers.push(protections);

                let protectionlayer = new ProtectionLayer();
                protectionlayer.Id = 3;
                protectionlayer.ICId = initcause.Id;
                protectionlayer.NameOfIPL = "Alarm";
                protectionlayer.Description = this.SheetValue[j][13]
                protectionlayer.PFD = this.SheetValue[j][14]
                initcause.ProtectionLayers.push(protectionlayer);

                let protectionlayers = new ProtectionLayer();
                protectionlayers.Id = 4;
                protectionlayers.ICId = initcause.Id;
                protectionlayers.NameOfIPL = "Restricted Acess";
                protectionlayers.Description = this.SheetValue[j][15]
                protectionlayers.PFD = this.SheetValue[j][16]
                initcause.ProtectionLayers.push(protectionlayers);

                let pfdDescIndex = 19;
                let pfdValueIndex = 20;
                this.dynamicColumn.forEach(dynamicolumns => {
                  let dynamic = new DynamicGroupName();
                  dynamic.DynamicId = 1;
                  dynamic.ICId = initcause.Id;
                  dynamic.GroupName = dynamicolumns.GroupName;
                  dynamic.pfdDescription = this.SheetValue[j][pfdDescIndex];
                  dynamic.pfdValue = Number(this.SheetValue[j][pfdValueIndex]);
                  initcause.DynamicGroupNames.push(dynamic);
                  pfdDescIndex += 2;
                  pfdValueIndex += 2;
                });
              }
              else if ((this.SheetValue[j][1] == "P" || this.SheetValue[j][1] == "A") || (this.SheetValue[j][0] == "" && this.SheetValue[j][1] == "" && this.SheetValue[j][2] == "" && this.SheetValue[j][3] == ""
                && this.SheetValue[j][4] == "" && this.SheetValue[j][5] == "" && this.SheetValue[j][6] == "" && this.SheetValue[j][7] == "")) {
                break;
              }

            }
          }
          else if ((this.SheetValue[i][0] == "" || this.SheetValue[i][0] == impacts.ImpactEventDesciption) && this.SheetValue[i][1] == "A" && this.SheetValue[i][2] != "" && this.SheetValue[i][3] != "") {
            let riskMatrix = new RiskMatrix();
            riskMatrixId++;
            riskMatrix.RMId = riskMatrixId;
            riskMatrix.IEId = impacts.Id;
            riskMatrix.Category = this.SheetValue[i][1];
            riskMatrix.Severity = this.SheetValue[i][2][0];
            riskMatrix.TRF = this.SheetValue[i][3][0];
            // var trfa= riskMatrix.TRFA;
            impacts.RiskMatrix.push(riskMatrix);
            this.RiskMatrixVal = riskMatrix;
            var initcauseId = 0;
            for (let m = i; m < this.SheetValue[i].length; m++) {
              if ((this.SheetValue[m][0] == "" && this.SheetValue[m][1] == "A" && this.SheetValue[m][2] != "" && this.SheetValue[m][3] != "" && this.SheetValue[m][4] != "") ||
                (this.SheetValue[m][0] == "" && this.SheetValue[m][1] == "" && this.SheetValue[m][2] == "" && this.SheetValue[m][3] == "" && this.SheetValue[m][4] != "") ||
                (this.SheetValue[m][0] != "" && this.SheetValue[m][1] == "A" && this.SheetValue[m][2] != "" && this.SheetValue[m][3] != "" && this.SheetValue[m][4] != "")) {

                let initcause = new InitiatingCause();
                var k = 4;
                initcauseId++;
                initcause.Id = initcauseId;
                initcause.RMId = riskMatrix.RMId;
                initcause.IEF = this.SheetValue[m][k + 1];
                initcause.IP = this.SheetValue[m][k + 2];
                initcause.PP = this.SheetValue[m][k + 3];
                initcause.TR = this.SheetValue[m][k + 4];
                initcause.initiatingCause = this.SheetValue[m][k];
                this.initcauses = initcause;
                riskMatrix.InitiatingCauses.push(initcause);

                let protection = new ProtectionLayer();
                protection.Id = 1;
                protection.ICId = initcause.Id;
                protection.NameOfIPL = "General Process Design";
                protection.Description = this.SheetValue[m][9]
                protection.PFD = this.SheetValue[m][10]
                initcause.ProtectionLayers.push(protection);

                let protections = new ProtectionLayer();
                protections.Id = 2;
                protections.ICId = initcause.Id;
                protections.NameOfIPL = "BPCS";
                protections.Description = this.SheetValue[m][11]
                protections.PFD = this.SheetValue[m][12]
                initcause.ProtectionLayers.push(protections);

                let protectionlayer = new ProtectionLayer();
                protectionlayer.Id = 3;
                protectionlayer.ICId = initcause.Id;
                protectionlayer.NameOfIPL = "Alarm";
                protectionlayer.Description = this.SheetValue[m][13]
                protectionlayer.PFD = this.SheetValue[m][14]
                initcause.ProtectionLayers.push(protectionlayer);

                let protectionlayers = new ProtectionLayer();
                protectionlayers.Id = 4;
                protectionlayers.ICId = initcause.Id;
                protectionlayers.NameOfIPL = "Restricted Acess";
                protectionlayers.Description = this.SheetValue[m][15]
                protectionlayers.PFD = this.SheetValue[m][16]
                initcause.ProtectionLayers.push(protectionlayers);

                let iplDyke = new ProtectionLayer();
                iplDyke.Id = 5;
                iplDyke.ICId = initcause.Id;
                iplDyke.NameOfIPL = "IPL Dyke,PRV";
                iplDyke.Description = this.SheetValue[m][17]
                iplDyke.PFD = this.SheetValue[m][18]
                initcause.ProtectionLayers.push(iplDyke);

                let pfdDescIndex = 19;
                let pfdValueIndex = 20;
                this.dynamicColumn.forEach(dynamicolumns => {
                  let dynamic = new DynamicGroupName();
                  dynamic.DynamicId = 1;
                  dynamic.ICId = initcause.Id;
                  dynamic.GroupName = dynamicolumns.GroupName;
                  dynamic.pfdDescription = this.SheetValue[m][pfdDescIndex];
                  dynamic.pfdValue = Number(this.SheetValue[m][pfdValueIndex]);
                  initcause.DynamicGroupNames.push(dynamic);
                  pfdDescIndex += 2;
                  pfdValueIndex += 2;
                });

              }
              else if ((this.SheetValue[m][1] == "P" || this.SheetValue[m][1] == "E") || (this.SheetValue[m][0] == "" && this.SheetValue[m][1] == "" && this.SheetValue[m][2] == "" && this.SheetValue[m][3] == ""
                && this.SheetValue[m][4] == "" && this.SheetValue[m][5] == "" && this.SheetValue[m][6] == "" && this.SheetValue[m][7] == "")) {
                break;
              }
            }
          }
          else if ((this.SheetValue[i][0] != "") || (this.SheetValue[i][0] == "" && this.SheetValue[i][1] == "" && this.SheetValue[i][2] == "" && this.SheetValue[i][3] == ""
            && this.SheetValue[i][4] == "" && this.SheetValue[i][5] == "" && this.SheetValue[i][6] == "" && this.SheetValue[i][7] == "")) {
            break;
          }
        }
        sif.ImpactEvents.push(impacts)

      }
    }
    let calc = new Calculation(sif);
    this.cal = calc;
    console.log(this.cal);
    // var OverallIELP = this.cal.OverallIELP;
    // this.iel = this.getData.setRowData([20], [OverallIELP]);
    sifDesignObj.push(sif);
    this.TargetSil = sif.TargetSIL;
    console.log(sifDesignObj);
    this.SaveSheetData(sifDesignObj, this.cal);
    console.log(this.cal)

  }

  public SaveSheetData(sifDesignObj: any, calculate: any) {
    this.SILClassificationBLService.postWithoutHeaders(this.SILConstantAPI.SIFSave, sifDesignObj).subscribe((res: any) => {
      this.SILClassificationBLService.postWithoutHeaders(this.SILConstantAPI.CalculationSave, calculate).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "SILClassification Added SuccessFully" })
      }, (err) => {
        this.jspreadsheet.setData([[]]);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error" })
      });
    },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error" })
      });
  }

  public RiskMatrix(Matrix: any) {
    this.RiskMatrix6 = false;
    this.RiskMatrix5 = false;
    this.cells = '';
    var r = Matrix.innerText;
    this.cells = this.jspreadsheet.setValueFromCoords([this.x], [this.y], [r], [true]);
    if (r == "1A" || r == "1B" || r == "1C" || r == "1D" || r == "2A" || r == "2B" || r == "3A") {
      var rm = 1.00E-01;
      this.risk = this.jspreadsheet.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1E" || r == "1F" || r == "2C" || r == "2D" || r == "2E" || r == "3B" || r == "3C" || r == "4A" || r == "4B" || r == "5A") {
      var rm = 1.00E-02;
      this.risk = this.jspreadsheet.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "2F" || r == "3D" || r == "3E" || r == "4C" || r == "5B" || r == "6A") {
      var rm = 1.00E-03;
      this.risk = this.jspreadsheet.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "3F" || r == "4D" || r == "4E" || r == "4F" || r == "5C" || r == "5D" || r == "5E" || r == "5F"
      || r == "6B" || r == "6C" || r == "6D" || r == "6E" || r == "6F") {
      var rm = 1.00E-04;
      this.risk = this.jspreadsheet.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else {
      alert("Something wrong")
    }
  }

  Node() {
    this.display = true;
    this.company = "Any town gas producers";
    this.facility = "Amine absorber section";
    // this.sifid=1;
    this.session = "1  25-07-96";
    this.node = 1;
    this.description = "Pump trips reverse flow back flow of 20 bar gas to amine tank";
    this.parameter = "Flow";
  }

  Add() {
    this.jspreadsheet.setData([[]]);
    this.sifDesignObj = new SIFDesign();
    this.node = 0;
    this.sifid = 0;
    this.description = "";
    this.cal.TRFP = 0;
    this.cal.TRFE = 0;
    this.cal.TRFA = 0;
    this.cal.OverallIELA = 0;
    this.cal.OverallIELE = 0;
    this.cal.OverallIELP = 0;
    this.cal.PFDP = 0;
    this.cal.PFDA = 0;
    this.cal.PFDE = 0;
    this.cal.RRFA = 0;
    this.cal.RRFP = 0;
    this.cal.RRFE = 0;
    this.cal.SILP = 0;
    this.cal.SILA = 0;
    this.cal.SILE = 0;
    this.sifid = 0;
    this.node = 0;
    this.description = "";
  }

  AddNewCol() {
    this.AddColumn();
    this.AddHeaders();
    this.SheetValue = this.jspreadsheet.getData();
    this.jspreadsheet.destroy();
    this.jspreadsheet = jspreadsheet(this.spreadsheetDiv.nativeElement, {
      data: this.SheetValue,
      columns: this.columns,
      nestedHeaders: this.nestedHeaders,
      // mergeCells: {
      //   A1: [, 9],
      //   B1: [, 3], B4: [, 3], B7: [, 3],
      //   C1: [, 3], C4: [, 3], C7: [, 3],
      //   D1: [, 3], D4: [, 3], D7: [, 3],
      // },
      onchange: this.changed,
      onselection: this.selectionActive,
      tableOverflow: true,
      tableWidth: "1350px",
      tableHeight: "600px",
      minDimensions: [24, 20]
    });
  }

  AddDynamicTitle() {
    this.editTitle = true;
  }

  SaveDynamicTitle() {
    this.IPLTitle = this.dynamicIPLObj.title;
    let obj = new DynamicGroupName();
    obj.DynamicId += this.counter;
    obj.GroupName = this.IPLTitle;
    obj.pfdDescription = "";
    obj.pfdValue = 0;
    this.dynamicColumn.push(obj)
    this.editTitle = false;
    this.AddNewCol();
    this.counter++;
    this.dynamicIPLObj.title = "";
  }

  AddColumn() {
    this.columns = [];
    this.columns.push({ type: "text", title: 'Impact Event', width: "100", wordWrap: true, source: this.impact.ImpactEventDesciption }),
      this.columns.push({ type: 'dropdown', title: 'Category', width: "50", wordWrap: true, source: this.CategoryNameList }),
      this.columns.push({ type: 'text', title: 'Severity', width: "50", wordWrap: true, source: this.cells }),
      this.columns.push({ type: 'text', title: 'TMEL', tooltip: 'Column is readonly', wordWrap: true, width: "60", source: this.risk }),
      this.columns.push({ type: 'dropdown', title: 'Initiating Causes', wordWrap: true, width: "100", autocomplete: true, source: this.InitiatingCauseValue }),
      this.columns.push({ type: 'text', title: 'IEF', width: "60" }),
      this.columns.push({ type: 'text', title: 'IP', width: "40" }),
      this.columns.push({ type: 'text', title: 'PP', width: "40" }),
      this.columns.push({ type: 'text', title: 'TR', width: "40" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
      this.columns.push({ type: 'text', title: 'PFD', width: "55" }),
      this.dynamicColumn.forEach(element => {
        this.columns.push({ type: 'text', title: 'Description', width: "90", wordWrap: true }),
          this.columns.push({ type: 'text', title: 'PFD', width: "55" })
      });
    this.columns.push({ type: 'number', title: 'IEL', width: "55", source: this.IEL }),
      this.columns.push({ type: 'number', title: 'Overall IEL', width: "55" }),
      this.columns.push({ type: 'number', title: 'PFDavg', width: "55" }),
      this.columns.push({ type: 'number', title: 'RRF', width: "55" }),
      this.columns.push({ type: 'number', title: 'SIL', width: "55" })
  }

  AddHeaders() {
    this.nestedHeaders = [];
    var dynamicCol;
    this.nestedHeaders.push({ title: 'Consequence Screening', colspan: '4' }),
      this.nestedHeaders.push({ title: 'Initiating Event', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Conditional Modifiers', colspan: '3' }),
      this.nestedHeaders.push({ title: 'General Process Design', colspan: '2' }),
      this.nestedHeaders.push({ title: 'BPCS', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Alarm', colspan: '2' }),
      this.nestedHeaders.push({ title: 'Restricted Access', colspan: '2' }),
      this.nestedHeaders.push({ title: 'IPL Dyke, PRV', colspan: '2' }),
      this.dynamicColumn.forEach(element => {
        this.nestedHeaders.push({ title: element.GroupName, colspan: '2' })
      });
    this.nestedHeaders.push({ title: 'Calculations', colspan: '5' })
  }

  RemoveCol() {
    this.removeTitle = true;
  }

  DeleteCol(title) {
    if (this.dynamicColumn.find(i => i.GroupName == title)) {
      this.dynamicColumn.splice(title, 1);
      this.AddNewCol();
    }
    this.dynamicIPLObj.title = "";
    this.removeTitle = false;
  }
}


