import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './shared/config.service';
import { SilReportComponent } from './home/SIL/SilTemplate/SilReport.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    SilReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    
   
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfigModule.init()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
