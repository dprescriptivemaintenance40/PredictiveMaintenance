import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  menuOpened: boolean = true;
  FormData: FormGroup;

  public user: any = [];

  public MenuItems: any[] = [
    {
      label: 'Dashboard',
      url: '#/Home/LandingPage',
      icon: 'pi pi-home',
    } 
  ]
  constructor(public builder: FormBuilder,
    public http: HttpClient,
    public router: Router,
    public messageService: MessageService,
    private title: Title) {
    this.title.setTitle('Login | Dynamic Prescriptive Maintenence');
  }


  ngOnInit() {
    
  }

  


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
  }


}