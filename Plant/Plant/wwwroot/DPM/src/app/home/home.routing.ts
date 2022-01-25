import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./About-us/about.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home.component";
import { FCAComponent } from "./RCM/FCA/fca.component";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { MSSComponent } from "./RCM/MSS/mss.component";
import { RCMListComponent } from "./RCM/RCM-List/rcm-list.component";
import { ReportComponent } from "./Report/report.component";
import { VisComponent } from "./Vis/Vis.component";
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'aboutus', pathMatch: 'full' },
                { path: 'aboutus' , component: AboutComponent},
                { path: 'report' , component: ReportComponent},
                { path: 'LandingPage', component: DashboardComponent },
                { path: 'VisNetwork', component: VisComponent},
                { path: 'FMEA', component: FMEAComponent},
                { path:'FCA', component:FCAComponent},
                { path:'MSS' , component:MSSComponent},
                { path: 'RCMList' , component:RCMListComponent }
            ]
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}