import { Component } from '@angular/core';
import { ReportMaster } from 'src/app/home/SIL/Shared/Model/ReportTemplate.model';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { MessageService } from 'primeng/api';
import { SILConstantAPI } from '../Shared/Model/SILConstant';


@Component({
  selector: 'app-report',
  templateUrl: './SILreport.component.html',
})

export class SILreportComponent {
  public reportTemplateObj: ReportMaster = new ReportMaster();
  public sheetData: any = [];
  public SILDeleteId: number = 0;
  public displayReportField: boolean = false;
  public reportData: any = [];

  constructor(
    private SILClassificationReportBLService: CommonBLService,
    public messageService: MessageService,
    private ReportConstantAPI: SILConstantAPI) { }

  ngOnInit(): void {
    this.getSILClassificationData();
  }

  public showReport() {
    this.displayReportField = true;
  }

  public SaveReportData() {
    let report = new ReportMaster();
    report.CompanyName = this.reportTemplateObj.CompanyName;
    report.PlantName = this.reportTemplateObj.PlantName;
    report.CompanyBackground = this.reportTemplateObj.CompanyBackground;
    this.SILClassificationReportBLService.postWithoutHeaders(this.ReportConstantAPI.SILReportSave, report)
      .subscribe((res: any) => {
        alert("done");
      })
  }

  newTab(url: string) {
    window.open(url, "_blank");
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