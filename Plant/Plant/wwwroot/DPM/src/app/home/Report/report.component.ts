import { Component} from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { ReportTemplateMaster } from 'src/app/shared/Models/ReportTemplate.model';
import { SIFDesign } from 'src/app/home/SIL/Shared/Model/Sil_Creation.model';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var vis:any;


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
//   styleUrls: ['./about.component.css'],

})

export class ReportComponent{
public reportTemplate :ReportTemplateMaster = new ReportTemplateMaster();
public rprtTemplateList: any;  
public sifDesign:SIFDesign[];
public statuses: any[];
public sheetData:any = [];
public SILDeleteId;number = 0;
loading: boolean = true;

activityValues: number[] = [0, 100];
constructor(private service:ConfigService,
  private SILClassificationReportBLService: CommonBLService,
  public messageService: MessageService,){}

ngOnInit(): void{
  // this.viewSILDesign();
  this.getSILClassificationData();
}

addReport(){
  this.service.postReport(this.reportTemplate).subscribe(
    res=>{
      alert("Success");
      console.log(res);
    },
    error=>{
      alert("Fail");
      console.log(error);
    }
    );
}

newTab(url:string){
  window.open(url,"_blank");
}

// viewSILDesign(){
//   this.service.getSilDesign().subscribe(
//     res=>{
//       this.rprtTemplateList=res;
//       console.log(this.rprtTemplateList);
//     },
//     error=>{
//       console.log(error);
//     }
//   );
// }

  public getSILClassificationData(){
    this.SILClassificationReportBLService.getWithoutParameters("/SILClassificationAPI/GetSILClassificationData")
    .subscribe((res:any) => {
      this.sheetData = res;
      console.log(this.sheetData);
    })
  }

  public DeleteSILClassificationRecord(p){
    this.SILDeleteId = p.Id;
  }
  public SoftDeleteSILClassificationRecords(){
    this.SILClassificationReportBLService.DeleteWithID("/SILClassificationAPI",this.SILDeleteId)
    .subscribe((res:any) => {
      this.getSILClassificationData();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
    
    })
  }
}