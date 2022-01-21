
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { FCAComponent } from "./RCM/FMEA/FCA/fca.component";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { ExcelFormatService } from "./Services/excel-format.service";
import { VisComponent } from "./Vis/Vis.component";
import { MSSComponent } from "./RCM/FMEA/MSS/mss.component";

@NgModule({
    declarations: [
        HomeComponent,
        VisComponent,
        FMEAComponent,
        FCAComponent,
        MSSComponent
    ],
    imports: [    
        HomeRoutingModule,       
        SharedModule
    ],
    providers: [ExcelFormatService],
    bootstrap: [HomeComponent]
})
export class HomeModule {

}