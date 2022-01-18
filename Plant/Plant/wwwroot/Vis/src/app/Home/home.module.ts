import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { VisComponent } from "./Vis/Vis.component";
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
    declarations: [
        HomeComponent,
        VisComponent,
    ],
    imports : [
        CommonModule,
        HomeRoutingModule,
        PanelMenuModule
    ],
    providers : [],
    bootstrap: [HomeComponent]
})

export class HomeModule {}