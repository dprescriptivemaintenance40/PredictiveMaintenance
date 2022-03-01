
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
import { SILreportComponent } from "./SIL/SILReport/SILreport.component";
import { RCMListComponent } from "./RCM/RCM-List/rcm-list.component";
import { SILComponent } from "../home/SIL/SILCreation/Sil_Creation.component";
import {FieldsetModule} from 'primeng/fieldset';
import { Matrix6Component } from "./SIL/Shared/6x6Matrix/matrix-six.component";
import { Matrix5Component } from "./SIL/Shared/5x5Matrix/matrix-five.component";
import {TabViewModule} from 'primeng/tabview';
import { SilWorksheetComponent } from "../home/SIL/Shared/SILWorksheet/SilWorksheet.component";
import { NgxCopyPasteModule } from "ngx-copypaste";
@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
        VisComponent,
        FMEAComponent,
        FCAComponent,
        MSSComponent,
        AboutComponent,
        SILreportComponent,
        RCMListComponent,
        SILComponent,Matrix6Component,
        Matrix5Component,
        SilWorksheetComponent
        
    ],
    imports: [    
        HomeRoutingModule,       
        SharedModule,FieldsetModule,TabViewModule,NgxCopyPasteModule
    ],
    providers: [ExcelFormatService],
    bootstrap: [HomeComponent],exports:[HomeComponent]


})
export class HomeModule {

}