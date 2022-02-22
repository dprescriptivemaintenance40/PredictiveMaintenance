import { Component} from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { ReportTemplateMaster } from 'src/app/shared/Models/ReportTemplate.model';
import { SIFDesign } from 'src/app/home/SIL/Shared/Model/Sil_Creation.model';


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
statuses: any[];

loading: boolean = true;

activityValues: number[] = [0, 100];
constructor(private service:ConfigService){}

ngOnInit(): void{
  this.viewSILDesign();
  
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

viewSILDesign(){
  this.service.getSilDesign().subscribe(
    res=>{
      this.rprtTemplateList=res;
      console.log(this.rprtTemplateList);
    },
    error=>{
      console.log(error);
    }
  );
}
}