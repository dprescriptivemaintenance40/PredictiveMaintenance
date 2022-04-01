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

  public CloseSideBar(){
    if(this.router.url === "/Home/SIL" ){
     this.menuOpened = false;
    }
  }

  public MenuItems: any[] = [
    {
      label: 'About-Us',
      url: '#/Home/aboutus',
      icon: 'pi pi-home',
    },
    {
      label: 'Dashboard',
      url: '#/Home/LandingPage',
      icon: 'pi pi-home',
    },
    {
      label: 'Predictive Maintenance',
      icon: 'pi pi-home',
      items: [
        {
        label: 'Compressor',
        items: [
          {
            label: 'Constraints and Validations',
            url: '#/Home/ConstraintValidation',
          },
          {
            label: 'Model Pipeline',
            url: '#/Home/ModelPipeline',
          },
          {
            label: 'Data Explanation',
            url: '#/Home/DataExplanation',
          },
          {
            label: 'Predictive Charts',
            url: '#/Home/PredictiveChart',
          },
          {
            label: 'Predictive Reports',
            url: '#/Home/PredictiveReport',
          },
          {
            label: 'Data Insights',
            url: '#/Home/DataInsight',
          },
          {
            label: 'Model Confidence',
            url: '#/Home/ModelConfidence',
          },
        ]
        },
        {
          label: 'Centrifugal Pump',
          items: [
            {
              label: 'Constraints and Validations',
              //url: '#/Home/ConstraintValidation',
            },
            {
              label: 'Model Pipeline',
              //url: '#/Home/ModelPipeline',
            },
            {
              label: 'Predictive Charts',
              //url: '#/Home/PredictiveChart',
            },
            {
              label: 'Predictive Reports',
              //url: '#/Home/PredictiveReport',
            },
            {
              label: 'Data Insights',
              //url: '#/Home/DataInsight',
            }
          ]
        },
        {
          label: 'Valve',
          items: [
            {
              label: 'Constraints and Validations',
              //url: '#/Home/ConstraintValidation',
            },
            {
              label: 'Model Pipeline',
              //url: '#/Home/ModelPipeline',
            },
            {
              label: 'Predictive Charts',
              //url: '#/Home/PredictiveChart',
            },
            {
              label: 'Predictive Reports',
              //url: '#/Home/PredictiveReport',
            },
            {
              label: 'Data Insights',
              //url: '#/Home/DataInsight',
            }
          ]
        },
        {
          label: 'Motors',
          items: [
            {
              label: 'Constraints and Validations',
              //url: '#/Home/ConstraintValidation',
            },
            {
              label: 'Model Pipeline',
             // url: '#/Home/ModelPipeline',
            },
            {
              label: 'Predictive Charts',
              //url: '#/Home/PredictiveChart',
            },
            {
              label: 'Predictive Reports',
              //url: '#/Home/PredictiveReport',
            },
            {
              label: 'Data Insights',
              //url: '#/Home/DataInsight',
            }
          ]
        }
      ]
      
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
      icon: 'pi pi-home',
      items: [
        {
        label: 'SIL Design',
        url: '#/Home/SIL',

        },{
          label: 'SIL Search',
          url: '#/Home/report'
        }

      ]
      
    }
  ];
  constructor(public builder: FormBuilder,
    public http: HttpClient,
    public router: Router,
    public messageService: MessageService,
    public commonLoadingDirective: CommonLoadingDirective,
    private title: Title,) {
    this.title.setTitle('Login | Dynamic Prescriptive Maintenence');
  }


  ngOnInit() {
    this.CloseSideBar();
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