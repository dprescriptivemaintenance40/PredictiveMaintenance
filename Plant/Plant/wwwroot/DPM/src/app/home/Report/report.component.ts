import { Component} from '@angular/core';
import { url } from 'inspector';
import { ConfigService } from 'src/app/shared/config.service';
import { ReportTemplateMaster } from 'src/app/shared/Models/ReportTemplate.model';


declare var vis:any;


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
//   styleUrls: ['./about.component.css'],

})

export class ReportComponent{
public reportTemplate :ReportTemplateMaster = new ReportTemplateMaster();
public rprtTemplateList: any;  
constructor(private service:ConfigService){}

ngOnInit(): void{
this.getReportTemplate();
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

getReportTemplate(){
  this.service.getReportTmlpt().subscribe(
    res=>{
      this.rprtTemplateList=res;
      console.log(this.rprtTemplateList);
    },
    error=>
    {
      console.log(error);
    }
  );
}
newTab(url:string){
  window.open(url,"_blank")
}
}