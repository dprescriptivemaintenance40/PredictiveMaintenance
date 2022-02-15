
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { FCAComponent } from "./RCM/FCA/fca.component";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { ExcelFormatService } from "./Services/excel-format.service";
import { VisComponent } from "./Vis/Vis.component";
import { MSSComponent } from "./RCM/MSS/mss.component";
import {DashboardComponent} from "./dashboard/dashboard.component"
import { AboutComponent } from "./About-us/about.component";
import { ReportComponent } from "./Report/report.component";
import { RCMListComponent } from "./RCM/RCM-List/rcm-list.component";
import { SILComponent } from "./SIL/Sil_Creation.component";
import {FieldsetModule} from 'primeng/fieldset';
import { Matrix6Component } from "../shared/6x6Matrix/matrix-six.component";


@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
        VisComponent,
        FMEAComponent,
        FCAComponent,
        MSSComponent,
        AboutComponent,
        ReportComponent,
        RCMListComponent,
        SILComponent,Matrix6Component

    ],
    imports: [    
        HomeRoutingModule,       
        SharedModule,FieldsetModule
    ],
    providers: [ExcelFormatService],
    bootstrap: [HomeComponent]
})
export class HomeModule {

}