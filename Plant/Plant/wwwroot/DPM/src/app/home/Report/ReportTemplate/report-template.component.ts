import { Component, OnInit} from '@angular/core';

declare var vis:any;

@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
//   styleUrls: ['./report-template.component.css'],

})

export class ReportTemplateComponent implements OnInit {
   
  ngOnInit() {
    
    } 
constructor(){

}

print(){
  window.print();
}

}