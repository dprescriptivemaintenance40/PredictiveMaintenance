import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonLoadingDirective } from '../shared/Loading/common-loading.directive';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { useAnimation } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})

export class HomeComponent implements OnInit {
  menuOpened: boolean = true;
  FormData: FormGroup;


  public CloseSideBar() {
    if (this.router.url === "/Home/SIL") {
      this.menuOpened = false;
    }
  }

  public MenuClosed() {
    this.menuOpened = false;
  }
  public MenuItems: any[] = [
    {
      label: 'About Us',
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
      // url: '#/Home/ModelPipeline',
      icon: 'pi pi-home',
      items: [
      //       {
      //         label: 'Constraints & Validations',
      //         url: '#/Home/ConstraintValidation',
      //       },
            {
              label: 'Model Pipeline',
              url: '#/Home/ModelPipeline',
            },
            {
              label: 'Status',
              url: '#/Home/CompressorStatus'
            }
      //       {
      //         label: 'Data Explanation',
      //         url: '#/Home/DataExplanation',
      //       },
      //       {
      //         label: 'Model Confidence',
      //         url: '#/Home/ModelConfidence',
      //       },
      //       {
      //         label: 'Predictive Charts',
      //         url: '#/Home/PredictiveChart',
      //       },
      //       {
      //         label: 'Data Insights',
      //         url: '#/Home/DataInsight',
      //       },
      //       {
      //         label: 'Predictive Reports',
      //         url: '#/Home/PredictiveReport',
      //       }
           ]
    },
    {
      label: 'Strategic Analysis',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'Develop maintenance strategy',
          items: [
            {
              label: 'RCM (Relaibility Centered Maintenance)',
              items: [
                {
                  label: 'Configuration',
                  url: '#/Home/Configuration'
                },
                {
                  label: 'FMEA',
                  url: '#/Home/FMEA'
                },
                {
                  label: 'FCA',
                  url: '#/Home/FCA',
                },
                {
                  label: 'MSS',
                  url: '#/Home/MSS',
                },
                {
                  label: 'CBA',
                  url: '#/Home/CBA',
                },
              ]
            },
          ]
        }
      ]
    },
    // {
    //   label: 'FMEA Add',
    //   url: '#/Home/Prescriptive/ADD'
    // },
    // {
    //   label: 'FCA',
    //   url: '#/Home/FCA',
    //   icon: 'pi pi-home',
    // },
    // {
    //   label: 'MSS',
    //   url: '#/Home/MSS',
    //   icon: 'pi pi-home',
    // },
    {
      label: 'RAM',
      icon: 'pi pi-home',
      items: [
        {
          label: 'Network Diagram',
          url: '#/Home/NetworkDiagram',
        },
        {
          label: 'Availability Model List',
          url: '#/Home/AvailabilityList',
        }
      ]
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

        }, {
          label: 'SIL Search',
          url: '#/Home/report'
        }
      ]
    },
    {
      label: '3D Models',
      icon: 'pi pi-home',
      items: [
        {
          label: 'Heat Exchanger',
          url: '#/Home/UnityHXModel'
        },
        // {
        //   label: 'Screw Compressor'
        // }
      ]
    }
  ];
  // public MenuItems: any[] = [
  //   {
  //     label: 'File Upload',
  //     url: '#/Home/ModelPipeline',
  //     icon: 'pi pi-home',
  //   },
  //   {
  //     label: '3D Model',
  //     icon: 'pi pi-home',
  //     url: '#/Home/UnityHXModel'
  //   }
  // ];

  constructor(public builder: FormBuilder,
    public http: HttpClient,
    public router: Router,
    public messageService: MessageService,
    public commonLoadingDirective: CommonLoadingDirective,
    private title: Title,
    private cookies:CookieService) {
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
    this.cookies.delete('access_token');
    this.router.navigateByUrl('/Login');
  }


}