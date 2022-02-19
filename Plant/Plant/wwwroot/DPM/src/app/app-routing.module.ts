import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/Auth.guard'; 
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { SilReportComponent } from './home/SilReport/SilReport.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: 'Login', component: LoginRegistrationComponent },
    { path: 'reportTemplate', component: SilReportComponent},
    { path: 'Home', loadChildren: () => import('./home/home.module').then(a => a.HomeModule) },
   
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
