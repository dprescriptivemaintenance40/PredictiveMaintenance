import { Component, ViewChild, ElementRef, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from "@angular/core";
import * as jspreadsheet from "jspreadsheet-ce";
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Calculation, ImpactEvent, InitiatingCause, ProtectionLayer, RiskMatrix, SIFDesign } from 'src/app/shared/Models/Sil_Creation.model';

@Component({
  selector: 'app-sil',
  templateUrl: './Sil_Creation.component.html',
  styleUrls: ['./Sil_Creation.component.scss'],
  providers: [DialogService, MessageService]
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
  public val: any = [];
  public SheetValue: Array<any> = [];
  public cols: Array<any> = [];
  public arr: any = [];
  public RiskMatrix6: boolean = false;
  public RiskMatrix5: boolean = false;
  public risk: string = "";
  public x: number;
  public y: number;
  public cells: string = "";
  public impact: ImpactEvent = new ImpactEvent();
  public initcauses: InitiatingCause = new InitiatingCause();
  public sifDesignObj: SIFDesign = new SIFDesign();
  public cal: Calculation = new Calculation(this.sifDesignObj);

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getMasterData();
    this.val = this.getData.data;

  }

  constructor(private SILClassificationBLService: CommonBLService,
    private primengConfig: PrimeNGConfig) {

  }

  ngAfterViewInit() {
    this.getData = jspreadsheet(this.spreadsheet.nativeElement, {
      data: [[]],
      columns: [
        { type: "text", title: 'Impact Event', width: "100", wordWrap: true, source: this.impact.ImpactEventDesciption },
        { type: 'dropdown', title: 'Category', width: "50", source: this.CategoryNameList },
        { type: 'text', title: 'Severity', width: "50", source: this.cells },
        { type: 'text', title: 'TMEL', width: "60", source: this.risk },
        { type: 'dropdown', title: 'Initiating Causes', wordWrap: true, width: "100", autocomplete: true, source: this.InitiatingCauseValue },
        { type: 'text', title: 'IEF', width: "60" },
        { type: 'text', title: 'IP', width: "40" },
        { type: 'text', title: 'PP', width: "40" },
        { type: 'text', title: 'TR', width: "40" },
        { type: 'text', title: 'Description', width: "90", wordWrap: true },
        { type: 'text', title: 'PFD', width: "55" },
        { type: 'text', title: 'Description', width: "90", wordWrap: true },
        { type: 'text', title: 'PFD', width: "55" },
        { type: 'text', title: 'Description', width: "90", wordWrap: true },
        { type: 'text', title: 'PFD', width: "55" },
        { type: 'text', title: 'Description', width: "90", wordWrap: true },
        { type: 'text', title: 'PFD', width: "55" },
        { type: 'text', title: 'Description', width: "90", wordWrap: true },
        { type: 'text', title: 'PFD', width: "55" },
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
      onchange: this.changed,
      onselection: this.selectionActive,
      // defaultColWidth: 100,
      tableOverflow: true,
      tableWidth: "1350px",
      tableHeight: "600px",
      minDimensions: [19, 20]
    });
  }
  changed = async (instance, cell, x, y, value) => {
    var cellName = jspreadsheet.getColumnNameFromId([x, y]);

    console.log('New change on cell ' + cellName + ' to: ' + value + '');
  }

  selectionActive = async (instance, x1, y1, x2, y2, origin) => {
    var cellName1 = jspreadsheet.getColumnNameFromId([x1, y1]);
    var cellName2 = jspreadsheet.getColumnNameFromId([x2, y2]);
    this.x = x1;
    this.y = y1;
    // var split = this.cellName.split("")[0];
    if ((x1 == 2) && (x2 == 2)) {
      if (this.sifDesignObj.RiskMatrix == "6*6 matrix") {
        this.RiskMatrix6 = true;
      }
      else if (this.sifDesignObj.RiskMatrix == "5*5 matrix") {
        this.RiskMatrix5 = true;
      }
    }
    else { console.log('The selection from ' + cellName1 + ' to ' + cellName2 + ''); }
  }

  getMasterData() {
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
  Save() {
    this.SheetValue = this.getData.getData()
    console.log(this.SheetValue);
    this.arr = this.getData.getHeaders();
    this.cols = this.arr.split(",");
    let sifDesignObj = [];
    let sif = new SIFDesign();
    sif.Id = 1;
    sif.FinalElement = this.sifDesignObj.FinalElement;
    sif.RiskMatrix = this.sifDesignObj.RiskMatrix;
    sif.Sensor = this.sifDesignObj.Sensor;
    sif.SIFDescription = this.sifDesignObj.SIFDescription;

    this.SheetValue.forEach(sheet => {
      if (sheet[0] != "") {
        let impacts = new ImpactEvent();
        impacts.Id = 1;
        impacts.SIFId = sif.Id;
        impacts.ImpactEventDesciption = sheet[0];
        this.SheetValue.forEach(sheet => {
          if (sheet[1] != '' && sheet[2] != "" && sheet[3] != "") {
            let initcause = new InitiatingCause();
            var j = 4;
            var counter = 0;
            initcause.RiskMatrix.RMId = 1;
            initcause.RiskMatrix.IEId = impacts.Id;
            initcause.RiskMatrix.Category = sheet[1];
            initcause.RiskMatrix.Severity = sheet[2];
            initcause.RiskMatrix.TRF = sheet[3];
            if (sheet[j] != "") {
              initcause.Id = counter++;
              initcause.IEId = impacts.Id;
              initcause.RMId = 1;
              initcause.IEF = sheet[j + 1];
              initcause.IP = sheet[j + 2];
              initcause.PP = sheet[j + 3];
              initcause.TR = sheet[j + 4];
              initcause.initiatingCause = sheet[j];

              this.initcauses = initcause;
              impacts.InitiatingCauses.push(initcause);

              let protection = new ProtectionLayer();
              protection.Description = sheet[9]
              protection.PFD = sheet[10]
              initcause.ProtectionLayers.push(protection);

              let protections = new ProtectionLayer();
              protections.Description = sheet[11]
              protections.PFD = sheet[12]
              initcause.ProtectionLayers.push(protections);

              let protectionlayer = new ProtectionLayer();
              protectionlayer.Description = sheet[13]
              protectionlayer.PFD = sheet[14]
              initcause.ProtectionLayers.push(protectionlayer);

              let protectionlayers = new ProtectionLayer();
              protectionlayers.Description = sheet[15]
              protectionlayers.PFD = sheet[16]
              initcause.ProtectionLayers.push(protectionlayers);
            }
          }
        });
        sif.ImpactEvents.push(impacts)
      }
    });
    let calc = new Calculation(sif);
    this.cal = calc;
    sifDesignObj.push(sif);
    console.log(sifDesignObj)
    console.log(calc)

  }
  RiskMatrix(Matrix: any) {
    this.RiskMatrix6 = false;
    this.RiskMatrix5 = false;
    this.cells = '';
    var r = Matrix.innerText;
    this.cells = this.getData.setValueFromCoords([this.x], [this.y], [r], [true]);
    if (r == "1A" || r == "2A" || r == "3A" || r == "4A" || r == "5A" || r == "6A") {
      var rm = 1.00E-01;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1B" || r == "2B" || r == "3B" || r == "4B" || r == "5B" || r == "6B") {
      var rm = 1.00E-02;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1C" || r == "2C" || r == "3C" || r == "4C" || r == "5C" || r == "6C") {
      var rm = 1.00E-03;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1D" || r == "2D" || r == "3D" || r == "4D" || r == "5D" || r == "6D") {
      var rm = 1.00E-04;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1E" || r == "2E" || r == "3E" || r == "4E" || r == "5E" || r == "6E") {
      var rm = 1.00E-05;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else if (r == "1F" || r == "2F" || r == "3F" || r == "4F" || r == "5F" || r == "6F") {
      var rm = 1.00E-06;
      this.risk = this.getData.setValueFromCoords([this.x + 1], [this.y], [rm], [true]);
      rm = 0;
    }
    else {
      alert("Something wrong")
    }
  }
}

