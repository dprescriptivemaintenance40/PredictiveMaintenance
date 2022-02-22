import { Component, OnInit, Output,EventEmitter} from '@angular/core';



@Component({
  selector: 'app-Matrix5Component',
  templateUrl: './matrix-five.component.html',
  styleUrls: ['./matrix-five.component.css'],

})

export class Matrix5Component implements OnInit {
   @Output() updateSeverity = new EventEmitter<string>();
   
  ngOnInit() {
    
    } 
constructor(){

}

}