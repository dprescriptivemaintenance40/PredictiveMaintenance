import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { SilReportComponent } from './home/SIL/SilTemplate/SilReport.component';
import { DashboardReportComponent } from './home/DashboardReport/dashboardReport.component';
import { AuthGuard } from './Auth.guard';


@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: 'Login', component: LoginRegistrationComponent },
    { path: 'reportTemplate/:id', component: SilReportComponent, canActivate:[AuthGuard]},
    {path: 'dashboardReport', component:DashboardReportComponent},
    { path: 'Home', loadChildren: () => import('./home/home.module').then(a => a.HomeModule), canActivate:[AuthGuard] },
   
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
