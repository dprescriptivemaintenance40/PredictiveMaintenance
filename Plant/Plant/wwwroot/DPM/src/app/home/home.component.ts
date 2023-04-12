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
      label: 'File Upload',
      url: '#/Home/ModelPipeline',
      icon: 'pi pi-home',
    },
    {
      label: '3D Model',
      icon: 'pi pi-home',
      url: '#/Home/UnityHXModel'
    }
  ];

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