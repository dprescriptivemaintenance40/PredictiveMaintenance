import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import {ProgressBarModule} from 'primeng/progressbar';
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
import { SilWorksheetComponent } from "./SIL/SILWorksheet/SilWorksheet.component";
import { NgxCopyPasteModule } from "ngx-copypaste";
import { PredictiveReportComponent } from './PredictiveMaintenance/ScrewCompressor/predictive-report/predictive-report.component';
import { PredictiveChartComponent } from './PredictiveMaintenance/ScrewCompressor/predictive-chart/predictive-chart.component';
import { ConstraintValidationComponent } from './PredictiveMaintenance/ScrewCompressor/constraint-validation/constraint-validation.component';
import { ModelPipelineComponent } from './PredictiveMaintenance/ScrewCompressor/model-pipeline/model-pipeline.component';
import { DataInsightComponent } from './PredictiveMaintenance/ScrewCompressor/data-insight/data-insight.component';
import { ModelConfidenceComponent } from "./PredictiveMaintenance/ScrewCompressor/model-confidence/model-confidence.component";
import { DataExplanationComponent } from "./PredictiveMaintenance/ScrewCompressor/data-explanation/data-explanation.component";
import {DialogModule} from 'primeng/dialog';
import { CBAComponent } from "./RCM/CBA/cba-add/cba-add.component";
import { RiskMatrix5Component } from "./RCM/CBA/Shared/CBA/RiskMatrix5/riskmatrix5.component";
import { RiskMatrix6Component } from "./RCM/CBA/Shared/CBA/RiskMatrix6/riskmatrix6.component";
import { RCMFunctionalAnalysis } from "./RCM/CBA/RCMFunctionalAnalysis/rcmreport.component";
import { PrescriptiveConfigurationComponent } from "./RCM/FMEA/prescriptive-configuration/prescriptive-configuration.component";
import { PrescriptiveReportComponent } from "./RCM/FMEA/prescriptive-report/prescriptive-report.component";
import { PrescriptiveUpdateComponent } from "./RCM/FMEA/prescriptive-update/prescriptive-update.component";
import { FMEASHEETComponent } from "./RCM/FMEA/fmea-sheet/fmea-sheet.component";
import { PrescriptiveConsequencesComponent } from "./RCM/FMEA/prescriptive-consequences/prescriptive-consequences.component";
import { NetworkDiagram } from "./RAM/Availability/network-diagram.component";
import {MultiSelectModule} from 'primeng/multiselect'; 
import {AccordionModule} from 'primeng/accordion';


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
        SilWorksheetComponent,
        PredictiveReportComponent,
        PredictiveChartComponent,
        ConstraintValidationComponent,
        ModelPipelineComponent,
        DataInsightComponent,
        ModelConfidenceComponent,
        DataExplanationComponent,
        CBAComponent,
        RCMFunctionalAnalysis,
        RiskMatrix5Component,
        RiskMatrix6Component,
        PrescriptiveConfigurationComponent,
        PrescriptiveReportComponent,
        PrescriptiveUpdateComponent,
        FMEASHEETComponent,
        PrescriptiveConsequencesComponent,
        NetworkDiagram
    ],
    imports: [    
        HomeRoutingModule,       
        SharedModule,FieldsetModule,TabViewModule,NgxCopyPasteModule,ProgressBarModule,DialogModule,
        MultiSelectModule,AccordionModule
    ],
    providers: [ExcelFormatService],
    bootstrap: [HomeComponent],exports:[HomeComponent]


})
export class HomeModule {

}