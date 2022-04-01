import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-constraint-validation',
  templateUrl: './constraint-validation.component.html',
  styleUrls: ['./constraint-validation.component.scss']
})
export class ConstraintValidationComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  checkValues(){
    this.route.navigate(['Home/DataExplanation'])
  }
}
