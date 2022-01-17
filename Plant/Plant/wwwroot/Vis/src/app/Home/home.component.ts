import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'Vis';
  
  constructor(private http:HttpClient){

  }

}