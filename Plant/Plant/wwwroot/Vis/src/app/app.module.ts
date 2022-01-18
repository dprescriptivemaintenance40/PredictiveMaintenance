import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { OrganizationChartModule } from 'primeng/organizationchart'
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
// import { SharedModule } from './Shared/shared.module';
import {CardModule} from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
  declarations: [    
    AppComponent,
    LoginRegistrationComponent,
  ],
  imports: [    
    CommonModule,
    FormsModule,    
    PanelMenuModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    TableModule,
    ToastModule,
    ButtonModule,
    CardModule,
    DynamicDialogModule,
    OrganizationChartModule,
    // SharedModule
   
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {
}
