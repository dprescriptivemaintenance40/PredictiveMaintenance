import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Login } from '../shared/Login/_Login';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CommonBLService } from '../shared/BLDL/common.bl.service';


@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css'],
  providers: [MessageService],
})
export class LoginRegistrationComponent {
  
  loginRequest: Login = new Login();
token:any;
  cookieValue: any;

  constructor(private service:CommonBLService, 
    private cookies:CookieService,
    private route:Router) { }

  ngOnInit() {
   
  }
  onSubmit(){
    this.service.Login(this.loginRequest).subscribe(
      res=>{
        this.cookies.set('access_token',res.token);
        this.route.navigateByUrl('/Home/ModelPipeline')
      },err=>{
        console.log(err);
        alert("Incorrent Credentials")
      }
    );
  }
  
}
