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
import { CompressorStatusComponent } from './home/PredictiveMaintenance/compressor-status/compressor-status.component';
import { authInterceptorProviders } from './Token.Interceptor';
import { AuthGuard } from './auth.guard';
import { CookieService } from 'ngx-cookie-service';
// import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    SilReportComponent,
    CompressorStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    // AuthGuard
   
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    authInterceptorProviders,
    AuthGuard,
    CookieService,
    ConfigModule.init()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
