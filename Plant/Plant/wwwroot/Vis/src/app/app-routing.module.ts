import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { AuthGuard } from './Shared/Auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginRegistrationComponent },
  { path: 'Home', loadChildren: () => import('./Home/home.module').then(a => a.HomeModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
