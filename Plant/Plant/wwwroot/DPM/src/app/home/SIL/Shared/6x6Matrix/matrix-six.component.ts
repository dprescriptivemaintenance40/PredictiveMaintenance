import { Component, OnInit, Output,EventEmitter} from '@angular/core';



@Component({
  selector: 'app-Matrix6Component',
  templateUrl: './matrix-six.component.html',
  styleUrls: ['./matrix-six.component.css'],

})

export class Matrix6Component implements OnInit {
   @Output() updateSeverity = new EventEmitter<string>();
   
  ngOnInit() {
    
    } 
constructor(){

}
public hidden = false;
public url = "dist/DPM/assets/img/Matrix.png";

imageSource(){
    this.hidden = !this.hidden;
}
}