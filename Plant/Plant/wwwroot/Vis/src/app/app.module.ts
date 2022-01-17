
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VisComponent } from './Vis/Vis.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HomeComponent } from './Home/home.component';


@NgModule({
  declarations: [    
    AppComponent,
    VisComponent,
    HomeComponent
  ],
  imports: [    
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    TableModule,
    MatDividerModule,
    ToastModule,
    ButtonModule,
    DynamicDialogModule,
   
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/' } ]
})
export class AppModule {
}
