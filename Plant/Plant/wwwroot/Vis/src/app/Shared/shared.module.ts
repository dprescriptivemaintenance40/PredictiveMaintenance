import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DragDropModule } from "primeng/dragdrop";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { PasswordModule } from "primeng/password";
import { RadioButtonModule } from "primeng/radiobutton";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { SafePipe } from "./safe.pipe";
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import {CalendarModule} from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import {TreeTableModule} from 'primeng/treetable';
import {CheckboxModule} from 'primeng/checkbox';
import {InputNumberModule} from 'primeng/inputnumber';
import {MultiSelectModule} from 'primeng/multiselect';
@NgModule({
    declarations: [
        // CommonLoadingComponent, SafePipe
    ],
    imports: [
        FileUploadModule,
        CommonModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        MessagesModule,
        MessageModule,
        CardModule,
        StepsModule,
        RadioButtonModule,
        DragDropModule,
        SliderModule,
        DialogModule,
        OverlayPanelModule,
        ConfirmDialogModule,
        TooltipModule,
        PanelMenuModule,
        TreeTableModule,
        CheckboxModule,
        CalendarModule],
    exports: [CommonModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        MessagesModule,
        MessageModule,
        CardModule,
        StepsModule,
        RadioButtonModule,
        DragDropModule,
        SliderModule,
        DialogModule,
        OverlayPanelModule,
        TabViewModule,
        ConfirmDialogModule,
        TooltipModule,
        PanelMenuModule,
        TreeTableModule,
        CheckboxModule,
        CalendarModule,
        MultiSelectModule,
        InputNumberModule]
})
export class SharedModule {

}