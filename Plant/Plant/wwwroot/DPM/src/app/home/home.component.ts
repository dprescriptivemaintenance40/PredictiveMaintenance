import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonLoadingDirective } from '../shared/Loading/common-loading.directive';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  menuOpened: boolean = true;
  FormData: FormGroup;


  public MenuItems: any[] = [
    {
      label: 'About-Us',
      url: '#/Home/aboutus',
      icon: 'pi pi-home',
    },
    {
      label: 'Report',
      url: '#/Home/report',
      icon: 'pi pi-home',
    },
    {
      label: 'Dashboard',
      url: '#/Home/LandingPage',
      icon: 'pi pi-home',
    },
    {
      label: 'FCA',
      url: '#/Home/FCA',
      icon: 'pi pi-home',
    },
    {
      label: 'MSS',
      url: '#/Home/MSS',
      icon: 'pi pi-home',
    },
    {
      label: 'RCM Maintenance',
      url: '#/Home/RCMList',
      icon: 'pi pi-home',
    },
    {
      label: 'SIL',
      url: '#/Home/SIL',
      icon: 'pi pi-home',
    }
  ];
  constructor(public builder: FormBuilder,
    public http: HttpClient,
    public router: Router,
    public messageService: MessageService,
    public commonLoadingDirective: CommonLoadingDirective,
    private title: Title) {
    this.title.setTitle('Login | Dynamic Prescriptive Maintenence');
  }


  ngOnInit() {
    this.FormData = this.builder.group({
      Subject: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required]),
    });
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
  }


}