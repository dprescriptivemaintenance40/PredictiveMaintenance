import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jspreadsheet from "jspreadsheet-ce";

@Component({
    selector: 'app-fmeasheet',
    templateUrl: './fmea-sheet.component.html',
    styleUrls: ['./fmea-sheet.component.scss']
})
export class FMEASHEETComponent implements OnInit {
    @ViewChild("spreadsheet", { static: false }) spreadsheet: ElementRef;
    public RCMDATA: any = [];

    public cbaSheet: boolean = true;
    public columns: any = [];
    public jspreadsheet: any = [];

    public setFunction: string = "";
    public setFunctionFailure: string = "";
    public setFailureMode: string = "";
    public setLocalEffect: string = "";
    public setSystemEffect: string = "";
    public setConsequence: string = "";
    public IndexY = 0;
    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.RCMDATA = JSON.parse(localStorage.getItem('FMEAObject'));
        console.log(this.RCMDATA);
        this.cbaSheet = false;
        this.cbasheet();
    }

    public cbasheet() {
        this.cbaSheet = true;
        this.cdr.detectChanges()
        this.createColumns();
        this.RCMDATA.failureModes.forEach(failuemode => {
            this.IndexY++;
        });
        this.jspreadsheet = jspreadsheet(this.spreadsheet.nativeElement, {
            data: [[]],
            columns: this.columns,
            tableOverflow: true,
            tableWidth: "1350px",
            tableHeight: "600px",
            minDimensions: [, this.IndexY]
        });
        this.SetFMEAData();
    }

    createColumns() {
        this.columns.push({ type: 'text', title: 'Function', wordWrap: true, width: "250" }),
            this.columns.push({ type: 'text', title: 'Function Failure', width: "250", wordWrap: true }),
            this.columns.push({ type: 'text', title: 'Failure Mode', wordWrap: true, width: "250" }),
            this.columns.push({ type: 'text', title: 'Local Effect', wordWrap: true, width: "250" }),
            this.columns.push({ type: 'text', title: 'Sysyem Effect', width: "250", wordWrap: true }),
            this.columns.push({ type: 'text', title: 'Consequence', width: "150", wordWrap: true })
    }
    public SetFMEAData() {
        this.IndexY = 0;
        this.setFunction = this.RCMDATA.Function;
        this.jspreadsheet.setValueFromCoords(0, 0, this.setFunction, true);
        this.setFunctionFailure = this.RCMDATA.FunctionFailure;
        this.jspreadsheet.setValueFromCoords(1, 0, this.setFunctionFailure, true);
        this.RCMDATA.failureModes.forEach(failuemode => {
            this.setFailureMode = failuemode.FailureMode;
            this.jspreadsheet.setValueFromCoords(2, 0, this.setFailureMode, true);
            this.setSystemEffect = failuemode.SystemEffect;
            this.jspreadsheet.setValueFromCoords(3, 0, this.setSystemEffect, true);
            this.setLocalEffect = failuemode.LocalEffect;
            this.jspreadsheet.setValueFromCoords(4, 0, this.setLocalEffect, true);
            this.setConsequence = failuemode.Consequence;
            this.jspreadsheet.setValueFromCoords(5, 0, this.setConsequence, true);
            this.IndexY++;
        });
    }
}