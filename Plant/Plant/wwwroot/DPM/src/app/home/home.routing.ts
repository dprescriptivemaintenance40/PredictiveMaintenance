import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/auth.guard";
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
import { RFMComponent } from "./RFM/rfm.component";
import { DashboardReportComponent } from "./DashboardReport/dashboardReport.component";
import { CBAComponent } from "./RCM/CBA/cba-add/cba-add.component";
import { PrescriptiveConfigurationComponent } from "./RCM/FMEA/prescriptive-configuration/prescriptive-configuration.component";
import { PrescriptiveReportComponent } from "./RCM/FMEA/prescriptive-report/prescriptive-report.component";
import { RCMFunctionalAnalysis } from "./RCM/CBA/RCMFunctionalAnalysis/rcmreport.component";
import { PrescriptiveUpdateComponent } from "./RCM/FMEA/prescriptive-update/prescriptive-update.component";
import { FMEASHEETComponent } from "./RCM/FMEA/fmea-sheet/fmea-sheet.component";
import { CompressorStatusComponent } from "./PredictiveMaintenance/ScrewCompressor/compressor-status/compressor-status.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'aboutus', pathMatch: 'full' },
                { path: 'report', component: DashboardReportComponent },
                { path: 'aboutus', component: AboutComponent },
                { path: 'report', component: SILreportComponent },
                { path: 'LandingPage', component: DashboardComponent },
                { path: 'VisNetwork', component: VisComponent },
                { path: 'Configuration', component: PrescriptiveConfigurationComponent },
                { path: 'FMEA', component: FMEAComponent },
                { path: 'FCA', component: FCAComponent },
                { path: 'MSS', component: MSSComponent },
                { path: 'CBA', component: CBAComponent },
                { path: 'RCMList', component: RCMListComponent },
                { path: 'RCMUpdate', component: PrescriptiveUpdateComponent, canDeactivate: [AuthGuard] },
                { path: 'Report', component: PrescriptiveReportComponent },
                { path: 'RCMFunctionalAnalysis', component: RCMFunctionalAnalysis },
                { path: 'RFM', component: RFMComponent },
                { path: 'SIL', component: SILComponent },
                { path: 'SIL/:id', component: SILComponent },
                { path: 'Worksheet/:id', component: SilWorksheetComponent },
                { path: 'ConstraintValidation', component: ConstraintValidationComponent },
                { path: 'ModelPipeline', component: ModelPipelineComponent },
                { path: 'PredictiveChart', component: PredictiveChartComponent },
                { path: 'PredictiveReport', component: PredictiveReportComponent },
                { path: 'DataInsight', component: DataInsightComponent },
                { path: 'ModelConfidence', component: ModelConfidenceComponent },
                { path: 'DataExplanation', component: DataExplanationComponent },
                { path: 'CompressorStatus', component: CompressorStatusComponent},
                { path:'FMEASHEET',component:FMEASHEETComponent}
            ]
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}