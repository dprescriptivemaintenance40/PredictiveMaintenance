import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { FCAComponent } from "./RCM/FMEA/FCA/fca.component";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { VisComponent } from "./Vis/Vis.component";
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'LandingPage', pathMatch: 'full' },
                { path: 'LandingPage', component: VisComponent },
                { path: 'FMEA', component: FMEAComponent},
                { path:'FCA', component:FCAComponent}
            ]
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}