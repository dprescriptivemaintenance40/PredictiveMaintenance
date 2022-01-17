import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { VisComponent } from './Vis/Vis.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Vis',component:VisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
