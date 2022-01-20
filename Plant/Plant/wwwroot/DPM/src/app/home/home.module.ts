
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { VisComponent } from "./Vis/Vis.component";

@NgModule({
    declarations: [
        HomeComponent,
        VisComponent,
        FMEAComponent
    ],
    imports: [    
        HomeRoutingModule,       
        SharedModule,
    ],
    providers: [],
    bootstrap: [HomeComponent]
})
export class HomeModule {

}