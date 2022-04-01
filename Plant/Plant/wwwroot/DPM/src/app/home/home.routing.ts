import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./About-us/about.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home.component";
import { FCAComponent } from "./RCM/FCA/fca.component";
import { FMEAComponent } from "./RCM/FMEA/FMEA.component";
import { MSSComponent } from "./RCM/MSS/mss.component";
import { RCMListComponent } from "./RCM/RCM-List/rcm-list.component";
import { SILreportComponent } from "./SIL/SILReport/SILreport.component";
import { SILComponent } from "../home/SIL/SILCreation/Sil_Creation.component";
import { VisComponent } from "./Vis/Vis.component";
import { SilWorksheetComponent } from "./SIL/SILWorksheet/SilWorksheet.component";
import { ConstraintValidationComponent } from "./PredictiveMaintenance/ScrewCompressor/constraint-validation/constraint-validation.component";
import { ModelPipelineComponent } from "./PredictiveMaintenance/ScrewCompressor/model-pipeline/model-pipeline.component";
import { PredictiveReportComponent } from "./PredictiveMaintenance/ScrewCompressor/predictive-report/predictive-report.component";
import { DataInsightComponent } from "./PredictiveMaintenance/ScrewCompressor/data-insight/data-insight.component";
import { PredictiveChartComponent } from "./PredictiveMaintenance/ScrewCompressor/predictive-chart/predictive-chart.component";
import { ModelConfidenceComponent } from "./PredictiveMaintenance/ScrewCompressor/model-confidence/model-confidence.component";
import { DataExplanationComponent } from "./PredictiveMaintenance/ScrewCompressor/data-explanation/data-explanation.component";
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'aboutus', pathMatch: 'full' },
                { path: 'aboutus' , component: AboutComponent},
                { path: 'report' , component: SILreportComponent},
                { path: 'LandingPage', component: DashboardComponent },
                { path: 'VisNetwork', component: VisComponent},
                { path: 'FMEA', component: FMEAComponent},
                { path:'FCA', component:FCAComponent},
                { path:'MSS' , component:MSSComponent},
                { path: 'RCMList' , component:RCMListComponent},
                { path:'SIL',component:SILComponent},
                { path:'SIL/:id' , component:SILComponent},
                { path:'Worksheet/:id', component:SilWorksheetComponent},
                { path:'ConstraintValidation', component:ConstraintValidationComponent},
                { path:'ModelPipeline', component:ModelPipelineComponent},
                { path:'PredictiveChart', component:PredictiveChartComponent},
                { path:'PredictiveReport', component:PredictiveReportComponent},
                { path:'DataInsight', component:DataInsightComponent},
                { path:'ModelConfidence', component:ModelConfidenceComponent},
                {path:'DataExplanation', component:DataExplanationComponent}
            ]
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}