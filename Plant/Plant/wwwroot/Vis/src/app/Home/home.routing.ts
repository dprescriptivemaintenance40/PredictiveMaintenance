import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { VisComponent } from "./Vis/Vis.component";
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'LandingPage', pathMatch: 'full' },
                { path: 'LandingPage', component: VisComponent },  
            ]
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {}