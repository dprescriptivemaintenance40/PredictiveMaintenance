
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { VisComponent } from "./Vis/Vis.component";

@NgModule({
    declarations: [
        HomeComponent,
        VisComponent
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