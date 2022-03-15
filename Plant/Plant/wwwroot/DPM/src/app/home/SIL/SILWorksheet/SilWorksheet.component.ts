import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { SILConstantAPI } from '../Shared/Model/SILConstant';

@Component({
    selector: 'app-SilWorksheet',
    templateUrl: './SilWorksheet.component.html',
    styleUrls: ['./SilWorksheet.component.scss'],

})

export class SilWorksheetComponent implements OnInit {
    id: any;
    silDataList: any;
    public getId: number = 0;
    public reportDataList: any = [];
    public getAllList: any = [];
    public ICCountP:number=0;
    public ICCountE:number=0;
    public ICCountA:number=0;
    public ICP:number=1;
    public ICE:number=1;
    public ICA:number=1;
    public span:any;
    public IELP: number = 0;
    public IELA: number = 0;
    public IELE: number = 0;
    public TRFP: number = 0;
    public TRFE: number = 0;
    public TRFA: number = 0;
    public PFDAVGP: number = 0;
    public PFDAVGE: number = 0;
    public PFDAVGA: number = 0;
    public SILP: number = 0;
    public SILE: number = 0;
    public SILA: number = 0;
    public TSIL: number = 0;
    public SifDesc: string = "";

    todayDate: Date = new Date();
    Hazop: any;
    finalElement: any;
    impactEvent: any;
    interlockTag: any;
    sifDesc: any;
    sensor: any;
    targetSil: any;
    sifId: any;
    matrix: [];

    constructor(private ReportTemplateConstantAPI: SILConstantAPI,
        private ReportTemplateBLService: CommonBLService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = (this.route.snapshot.params['id']);
        this.getSILData();
    }

    getSILData() {
        const params = new HttpParams()
            .set('Id', this.id);
        var url: string = this.ReportTemplateConstantAPI.GetSIL;
        this.ReportTemplateBLService.getWithParameters(url, params)
            .subscribe((res: any) => {
                this.silDataList = res;
                this.Hazop = res[0].HazopNodeId;
                this.matrix = res[0];
                console.log(this.matrix);
                this.finalElement = res[0].FinalElement;
                this.interlockTag = res[0].InterLockTag;
                this.sifDesc = res[0].SIFDescription;
                this.sensor = res[0].Sensor;
                this.targetSil = res[0].TargetSIL;
                this.sifId = res[0].Id;
                this.TSIL = this.silDataList[0].TargetSIL;
                this.SifDesc = this.silDataList[0].SIFDescription;
                this.silDataList[0].ImpactEvents.forEach(impact => {
                    let obj = {};
                    let obj1 = {};
                    let obj3 = {};



                    // Category P
                    for (let i = 0; i < impact.RiskMatrix.length; i++) {
                        if (impact.RiskMatrix[i].Category == 'P') {
                            obj['getCategory'] = impact.RiskMatrix[i].Category;
                            obj['getSeverity'] = impact.RiskMatrix[i].Severity;
                            obj['getTRF'] = impact.RiskMatrix[i].TRF;
                            if (impact.RiskMatrix[0].Category == 'P') {
                                obj['getImpactEvent'] = impact.ImpactEventDesciption;
                            }
                            this.TRFP = obj['getTRF']
                            for (let j = 0; j < impact.RiskMatrix[i].InitiatingCauses.length; j++) {
                                if (j == 0) {
                                    obj['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[j].initiatingCause
                                    obj['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[j].IELP;
                                    this.IELP += obj['getIEL'];
                                    this.PFDAVGP = this.TRFP / this.IELP;
                                    obj['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                    obj['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                    obj['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                    obj['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                    for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design') {
                                            obj['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS') {
                                            obj['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm') {
                                            obj['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess') {
                                            obj['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj);
                                }
                                else {
                                    let obj0 = {}
                                    obj0['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[j].initiatingCause
                                    obj0['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[j].IELP;
                                    this.ICP+=1;
                                    this.ICCountP=this.ICP
                                    // this.span=document.querySelector('span');
                                    // this.span.setAttribute("rowspan", this.ICP.toString());
                                    this.IELP += obj0['getIEL'];
                                    this.PFDAVGP = this.TRFP / this.IELP;
                                    obj0['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                    obj0['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                    obj0['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                    obj0['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                    for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design') {
                                            obj0['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj0['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS') {
                                            obj0['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj0['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm') {
                                            obj0['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj0['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess') {
                                            obj0['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj0['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj0['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj0['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj0);
                                }
                            }
                        }
                        else if (impact.RiskMatrix[i].Category == 'E') {
                            obj1['getCategory'] = impact.RiskMatrix[i].Category;
                            obj1['getSeverity'] = impact.RiskMatrix[i].Severity;
                            obj1['getTRF'] = impact.RiskMatrix[i].TRF;
                            if (impact.RiskMatrix[0].Category == 'E') {
                                obj1['getImpactEvent'] = impact.ImpactEventDesciption;
                            }
                            this.TRFP = obj1['getTRF']
                            for (let j = 0; j < impact.RiskMatrix[i].InitiatingCauses.length; j++) {
                                if (j == 0) {
                                    obj1['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[j].initiatingCause
                                    obj1['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[j].IELE;
                                   
                                    this.IELP += obj1['getIEL'];
                                    this.PFDAVGP = this.TRFP / this.IELE;
                                    obj1['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                    obj1['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                    obj1['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                    obj1['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                    for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design') {
                                            obj1['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj1['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS') {
                                            obj1['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj1['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm') {
                                            obj1['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj1['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess') {
                                            obj1['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj1['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj1['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj1['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj1);
                                }
                                else {
                                    let obj2 = {}
                                    obj2['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[j].initiatingCause
                                    obj2['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[j].IELE;
                                    this.ICE+=1;
                                    this.ICCountE=this.ICE
                                    this.IELP += obj2['getIEL'];
                                    this.PFDAVGP = this.TRFP / this.IELE;
                                    obj2['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                    obj2['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                    obj2['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                    obj2['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                    for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design') {
                                            obj2['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj2['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS') {
                                            obj2['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj2['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm') {
                                            obj2['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj2['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess') {
                                            obj2['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj2['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj2['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                            obj2['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj2);
                                }
                            }
                        }
                        else if (impact.RiskMatrix[i].Category == 'A') {
                            obj3['getCategory'] = impact.RiskMatrix[i].Category;
                            obj3['getSeverity'] = impact.RiskMatrix[i].Severity;
                            obj3['getTRF'] = impact.RiskMatrix[i].TRF;
                            if (impact.RiskMatrix[0].Category == 'A') {
                                obj3['getImpactEvent'] = impact.ImpactEventDesciption;
                            }
                            this.TRFA = obj3['getTRF']
                            for (let b = 0; b < impact.RiskMatrix[i].InitiatingCauses.length; b++) {
                                if (b == 0) {
                                    obj3['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[b].initiatingCause
                                    obj3['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[b].IELA;
                                   
                                    this.IELA += obj3['getIEL'];
                                    this.PFDAVGA = this.TRFA / this.IELA;
                                    obj3['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[b].IEF;
                                    obj3['getIP'] = impact.RiskMatrix[i].InitiatingCauses[b].IP;
                                    obj3['getPP'] = impact.RiskMatrix[i].InitiatingCauses[b].PP;
                                    obj3['getTR'] = impact.RiskMatrix[i].InitiatingCauses[b].TR;
                                    for (let z = 0; z < impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers.length; z++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'General Process Design') {
                                            obj3['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj3['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'BPCS') {
                                            obj3['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj3['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Alarm') {
                                            obj3['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj3['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Restricted Acess') {
                                            obj3['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj3['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj3['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj3['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj3);

                                }
                                else {
                                    let obj4 = {}
                                    obj4['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[b].initiatingCause
                                    obj4['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[b].IELA;
                                    this.ICA+=1;
                                    this.ICCountA=this.ICA
                                    this.IELA += obj4['getIEL'];
                                    this.PFDAVGA = this.TRFA / this.IELA;
                                    obj4['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[b].IEF;
                                    obj4['getIP'] = impact.RiskMatrix[i].InitiatingCauses[b].IP;
                                    obj4['getPP'] = impact.RiskMatrix[i].InitiatingCauses[b].PP;
                                    obj4['getTR'] = impact.RiskMatrix[i].InitiatingCauses[b].TR;
                                    for (let z = 0; z < impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers.length; z++) {
                                        if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'General Process Design') {
                                            obj4['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj4['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'BPCS') {
                                            obj4['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj4['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Alarm') {
                                            obj4['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj4['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Restricted Acess') {
                                            obj4['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj4['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                        else if (impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'IPL Dyke,PRV') {
                                            obj4['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].Description;
                                            obj4['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                        }
                                    }
                                    this.getAllList.push(obj4);
                                }

                            }
                        }

                    }
                });
            });
           
    }
    getRowspan(value){
        if(value=="P"){
            return this.ICP.toString()
        }
        else if(value=="E"){
            return this.ICE.toString()
        }
        else if(value=="A"){
            return this.ICA.toString()
        }
        else{
           return "1"
        }
    }
   
}
