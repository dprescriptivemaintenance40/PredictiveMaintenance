import { Component } from '@angular/core';
import { ReportMaster } from 'src/app/home/SIL/Shared/Model/ReportTemplate.model';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { MessageService } from 'primeng/api';
import { SILConstantAPI } from '../Shared/Model/SILConstant';
import { PrimeNGConfig } from 'primeng/api';

declare global {
  interface Window {
    value: any;
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './SILreport.component.html',
  styleUrls: ['./SILreport.component.scss']
})


export class SILreportComponent {
  public reportTemplateObj: ReportMaster = new ReportMaster();
  public sheetData: any = [];
  public SILDeleteId: number = 0;
  public displayReportField: boolean = false;
  public reportData: any = [];
  public SIFId: number = 0;
  public save: boolean = false;
  public value: any;

  constructor(private primengConfig: PrimeNGConfig,
    private SILClassificationReportBLService: CommonBLService,
    public messageService: MessageService,
    private ReportConstantAPI: SILConstantAPI) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getSILClassificationData();
  }

  public showReport(id) {
    this.displayReportField = true;
    this.SIFId = id;
    this.save = true;
  }

  public SaveReportData() {
    let report = new ReportMaster();
    report.SIFId = this.SIFId;
    report.CompanyName = this.reportTemplateObj.CompanyName;
    report.PlantName = this.reportTemplateObj.PlantName;
    report.CompanyBackground = this.reportTemplateObj.CompanyBackground;
    this.SILClassificationReportBLService.postWithoutHeaders(this.ReportConstantAPI.SILReportSave, report)
      .subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Successfully Added' });
        this.displayReportField = false;
      })
  }

  newTab(url: string) {
    var newWindow = window.open(url, "_blank");
    // let value = window.value; // ok now
    newWindow.window.value = this.SIFId;
    this.displayReportField = false;
  }

  public getSILClassificationData() {
    this.SILClassificationReportBLService.getWithoutParameters("/SILClassificationAPI/GetSILClassificationData")
      .subscribe((res: any) => {
        this.sheetData = res;
        console.log(this.sheetData);
      })
  }

  public DeleteSILClassificationRecord(p) {
    this.SILDeleteId = p.Id;
  }

  public SoftDeleteSILClassificationRecords() {
    this.SILClassificationReportBLService.DeleteWithID("/SILClassificationAPI", this.SILDeleteId)
      .subscribe((res: any) => {
        this.getSILClassificationData();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });

      })
  }
}