import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as jspreadsheet from "jspreadsheet-ce";

@Component({
    selector: 'app-fmeasheet',
    templateUrl: './fmea-sheet.component.html',
    styleUrls: ['./fmea-sheet.component.scss']
})
export class FMEASHEETComponent implements OnInit {
    @ViewChild("spreadsheet", { static: false }) spreadsheet: ElementRef;
    public RCMDATA: any = [];

    public EquipmentClass: string = "";
    public TagNo: string = "";
    public Type: string = "";
    public Application: string = "";
    public SubUnit: string = "";

    public cbaSheet: boolean = true;
    public columns: any = [];
    public nestedHeaders: any = [];
    public jspreadsheet: any = [];
    public SetFailureChar: number = 1;
    public setFunction: string = "";
    public setFunctionFailure: string = "";
    public setFailureMode: string = "";
    public setLocalEffect: string = "";
    public setSystemEffect: string = "";
    public setConsequence: string = "";
    public IndexY = 0;

    constructor(private cdr: ChangeDetectorRef,
        private router:Router) { }

    ngOnInit() {
        this.RCMDATA = JSON.parse(localStorage.getItem('FMEAObject'));
        console.log(this.RCMDATA);
        this.cbaSheet = false;
        this.cbasheet();
        // const c = String.fromCharCode("A".charCodeAt(0) + 1);
        // console.log(c);
    }

    public BackToRCMList(){
        this.router.navigateByUrl('/Home/RCMList')
    }
    public DownloadFMEASheet() {
        window.print();
    }

    public cbasheet() {
        this.cbaSheet = true;
        this.cdr.detectChanges()
        this.createColumns();
        this.CreateNestedHeader();
        this.RCMDATA.failureModes.forEach(failuemode => {
            this.IndexY++;
        });
        this.jspreadsheet = jspreadsheet(this.spreadsheet.nativeElement, {
            data: [[]],
            columns: this.columns,
            nestedHeaders: this.nestedHeaders,
            tableOverflow: true,
            tableWidth: "1350px",
            tableHeight: "600px",
            minDimensions: [, this.IndexY]
        });
        this.SetFMEAData();
    }

    public createColumns() {
        this.columns.push({ type: 'text', wordWrap: true, width: "40" }),
            this.columns.push({ type: 'text', wordWrap: true, width: "150" }),
            this.columns.push({ type: 'text', wordWrap: true, width: "40" }),
            this.columns.push({ type: 'text', wordWrap: true, width: "150" }),
            this.columns.push({ type: 'text', wordWrap: true, width: "40" }),
            this.columns.push({ type: 'text', wordWrap: true, width: "150" }),
            this.columns.push({ type: 'text', title: 'Local Effect', wordWrap: true, width: "200" }),
            this.columns.push({ type: 'text', title: 'Sysyem Effect', width: "200", wordWrap: true }),
            this.columns.push({ type: 'text', title: 'Consequence', width: "250", wordWrap: true })
    }

    public CreateNestedHeader() {
        this.nestedHeaders.push({ title: 'Function', colspan: '2' }),
            this.nestedHeaders.push({ title: 'Function Failure', colspan: '2' }),
            this.nestedHeaders.push({ title: 'Failure Mode', colspan: '2' }),
            this.nestedHeaders.push({ colspan: '3' })
    }

    public SetFMEAData() {
        this.IndexY = 0;
        this.setFunction = this.RCMDATA.Function;
        this.EquipmentClass = this.RCMDATA.MachineType;
        this.TagNo = this.RCMDATA.TagNumber;
        this.Type = this.RCMDATA.EquipmentType;
        this.Application = this.RCMDATA.Application;
        this.SubUnit = this.RCMDATA.SubUnit;
        this.jspreadsheet.setValueFromCoords(0, 0, '01', true);
        this.jspreadsheet.setValueFromCoords(1, 0, this.setFunction, true);
        this.setFunctionFailure = this.RCMDATA.FunctionFailure;
        this.jspreadsheet.setValueFromCoords(2, 0, 'A', true);
        this.jspreadsheet.setValueFromCoords(3, 0, this.setFunctionFailure, true);
        this.RCMDATA.failureModes.forEach(failuemode => {
            this.jspreadsheet.setValueFromCoords(4, this.IndexY, this.SetFailureChar, true);
            // this.SetFailureChar = this.nextChar('A');
            this.setFailureMode = failuemode.FailureMode;
            this.jspreadsheet.setValueFromCoords(5, this.IndexY, this.setFailureMode, true);
            this.setSystemEffect = failuemode.SystemEffect;
            this.jspreadsheet.setValueFromCoords(6, this.IndexY, this.setSystemEffect, true);
            this.setLocalEffect = failuemode.LocalEffect;
            this.jspreadsheet.setValueFromCoords(7, this.IndexY, this.setLocalEffect, true);
            this.setConsequence = failuemode.Consequence;
            this.jspreadsheet.setValueFromCoords(8, this.IndexY, this.setConsequence, true);
            this.IndexY++;
            this.SetFailureChar++;
        });
    }

    // public nextChar(c) {
    //     return String.fromCharCode(c.charCodeAt(0) + 1);
    // }
    // nextChar('a');
}