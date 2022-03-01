import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { SILConstantAPI } from '../Model/SILConstant';

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
  public SifDesc:string="";

  todayDate: Date = new Date();
    Hazop: any;
    finalElement: any;
    interlockTag: any;
    sifDesc: any;
    sensor: any;
    targetSil: any;
    sifId: any;
   
    constructor(private ReportTemplateConstantAPI:SILConstantAPI,
      private ReportTemplateBLService:CommonBLService,
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
              console.log(this.silDataList);
              this.Hazop=res[0].HazopNodeId;
              this.finalElement=res[0].FinalElement;
              this.interlockTag=res[0].InterLockTag;
              this.sifDesc=res[0].SIFDescription;
              this.sensor=res[0].Sensor;
              this.targetSil=res[0].TargetSIL;
              this.sifId=res[0].Id;
              this.TSIL=this.silDataList[0].TargetSIL;
              this.SifDesc=this.silDataList[0].SIFDescription;
              this.silDataList[0].ImpactEvents.forEach(impact => {
                  let obj = {};
                  obj['getImpactEvent'] = impact.ImpactEventDesciption;

              // Category P
                  for (let i = 0; i < impact.RiskMatrix.length; i++) {
                      if (impact.RiskMatrix[i].Category == 'P') {
                          obj['getCategory'] = impact.RiskMatrix[i].Category;
                          obj['getSeverity'] = impact.RiskMatrix[i].Severity;
                          obj['getTRF'] = impact.RiskMatrix[i].TRF;
                          this.TRFP=obj['getTRF']
                          for (let j = i; j < impact.RiskMatrix[i].InitiatingCauses.length; j++) {
                              if (j == i) {
                                  obj['getinitiatingcauses'] = impact.RiskMatrix[i].InitiatingCauses[j].initiatingCause
                                  obj['getIEL'] = impact.RiskMatrix[i].InitiatingCauses[j].IELP;
                                  this.IELP+=obj['getIEL'];
                                  this.PFDAVGP=this.TRFP/this.IELP;
                                  obj['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                  obj['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                  obj['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                  obj['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                  for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                      if( impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design'){
                                      obj['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                      obj['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS'){
                                          obj['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm'){
                                          obj['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess'){
                                          obj['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV'){
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
                                  this.IELP+=obj0['getIEL'];
                                  this.PFDAVGP=this.TRFP/this.IELP;
                                  obj0['getIEF'] = impact.RiskMatrix[i].InitiatingCauses[j].IEF;
                                  obj0['getIP'] = impact.RiskMatrix[i].InitiatingCauses[j].IP;
                                  obj0['getPP'] = impact.RiskMatrix[i].InitiatingCauses[j].PP;
                                  obj0['getTR'] = impact.RiskMatrix[i].InitiatingCauses[j].TR;
                                  for (let x = 0; x < impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers.length; x++) {
                                      if( impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'General Process Design'){
                                          obj0['getDescription1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                      obj0['getPFD1'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'BPCS'){
                                          obj0['getDescription2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj0['getPFD2'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Alarm'){
                                          obj0['getDescription3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj0['getPFD3'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'Restricted Acess'){
                                          obj0['getDescription4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj0['getPFD4'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                      else if(impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].NameOfIPL == 'IPL Dyke,PRV'){
                                          obj0['getDescription5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].Description;
                                          obj0['getPFD5'] = impact.RiskMatrix[i].InitiatingCauses[j].ProtectionLayers[x].PFD;
                                      }
                                  }
                                  this.getAllList.push(obj0);
                              }
                          }
                      }
                      else if (impact.RiskMatrix[i].Category == 'A' || impact.RiskMatrix[i].Category == 'E'
                          || impact.RiskMatrix[i].Category == '') {
                          break;
                      }
                  }

              //Categpry E
                  for (let m = 0; m < impact.RiskMatrix.length; m++) {
                      let obj1 = {};
                      if (impact.RiskMatrix[m].Category == 'E') {
                          obj1['getCategory'] = impact.RiskMatrix[m].Category;
                          obj1['getSeverity'] = impact.RiskMatrix[m].Severity;
                          obj1['getTRF'] = impact.RiskMatrix[m].TRF;
                          this.TRFE=obj1['getTRF'];
                          for (let n = 0; n < impact.RiskMatrix[m].InitiatingCauses.length; n++) {
                              if (n == 0) {
                                  obj1['getinitiatingcauses'] = impact.RiskMatrix[m].InitiatingCauses[n].initiatingCause
                                  obj1['getIEL'] = impact.RiskMatrix[m].InitiatingCauses[n].IELE;
                                  this.IELE+=obj1['getIEL'];
                                  this.PFDAVGE=this.TRFE/this.IELE;
                                  obj1['getIEF'] = impact.RiskMatrix[m].InitiatingCauses[n].IEF;
                                  obj1['getIP'] = impact.RiskMatrix[m].InitiatingCauses[n].IP;
                                  obj1['getPP'] = impact.RiskMatrix[m].InitiatingCauses[n].PP;
                                  obj1['getTR'] = impact.RiskMatrix[m].InitiatingCauses[n].TR;
                                  for (let y = 0; y < impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers.length; y++) {
                                      if( impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'General Process Design'){
                                          obj1['getDescription1'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj1['getPFD1'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'BPCS'){
                                          obj1['getDescription2'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj1['getPFD2'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'Alarm'){
                                          obj1['getDescription3'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj1['getPFD3'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'Restricted Acess'){
                                          obj1['getDescription4'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj1['getPFD4'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'IPL Dyke,PRV'){
                                          obj1['getDescription5'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj1['getPFD5'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                  }
                                  this.getAllList.push(obj1);
                              }
                              else {
                                  let obj2 = {}
                                  obj2['getinitiatingcauses'] = impact.RiskMatrix[m].InitiatingCauses[n].initiatingCause
                                  obj2['getIEL'] = impact.RiskMatrix[m].InitiatingCauses[n].IELE;
                                  this.IELE+=obj2['getIEL'];
                                  this.PFDAVGE=this.TRFE/this.IELE;
                                  obj2['getIEF'] = impact.RiskMatrix[m].InitiatingCauses[n].IEF;
                                  obj2['getIP'] = impact.RiskMatrix[m].InitiatingCauses[n].IP;
                                  obj2['getPP'] = impact.RiskMatrix[m].InitiatingCauses[n].PP;
                                  obj2['getTR'] = impact.RiskMatrix[m].InitiatingCauses[n].TR;
                                  for (let y = 0; y < impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers.length; y++) {
                                      if( impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'General Process Design'){
                                          obj2['getDescription1'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj2['getPFD1'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'BPCS'){
                                          obj2['getDescription2'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj2['getPFD2'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'Alarm'){
                                          obj2['getDescription3'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj2['getPFD3'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'Restricted Acess'){
                                          obj2['getDescription4'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj2['getPFD4'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                      else if(impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].NameOfIPL == 'IPL Dyke,PRV'){
                                          obj2['getDescription5'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].Description;
                                          obj2['getPFD5'] = impact.RiskMatrix[m].InitiatingCauses[n].ProtectionLayers[y].PFD;
                                      }
                                  }
                                  this.getAllList.push(obj2);
                              }

                          }
                      }
                  }

                  //Categpry A
                  for (let a = 0; a < impact.RiskMatrix.length; a++) {
                      let obj3 = {};
                      if (impact.RiskMatrix[a].Category == 'A') {
                          obj3['getCategory'] = impact.RiskMatrix[a].Category;
                          obj3['getSeverity'] = impact.RiskMatrix[a].Severity;
                          obj3['getTRF'] = impact.RiskMatrix[a].TRF;
                          this.TRFA=obj3['getTRF']
                          for (let b = 0; b < impact.RiskMatrix[a].InitiatingCauses.length; b++) {
                              if (b == 0) {
                                  obj3['getinitiatingcauses'] = impact.RiskMatrix[a].InitiatingCauses[b].initiatingCause
                                  obj3['getIEL'] = impact.RiskMatrix[a].InitiatingCauses[b].IELA;
                                  this.IELA+=obj3['getIEL'];
                                  this.PFDAVGA=this.TRFA/this.IELA;
                                  obj3['getIEF'] = impact.RiskMatrix[a].InitiatingCauses[b].IEF;
                                  obj3['getIP'] = impact.RiskMatrix[a].InitiatingCauses[b].IP;
                                  obj3['getPP'] = impact.RiskMatrix[a].InitiatingCauses[b].PP;
                                  obj3['getTR'] = impact.RiskMatrix[a].InitiatingCauses[b].TR;
                                  for (let z = 0; z < impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers.length; z++) {
                                      if( impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'General Process Design'){
                                          obj3['getDescription1'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj3['getPFD1'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'BPCS'){
                                          obj3['getDescription2'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj3['getPFD2'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Alarm'){
                                          obj3['getDescription3'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj3['getPFD3'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Restricted Acess'){
                                          obj3['getDescription4'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj3['getPFD4'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'IPL Dyke,PRV'){
                                          obj3['getDescription5'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj3['getPFD5'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                  }
                                  this.getAllList.push(obj3);
                                  
                              }
                              else {
                                  let obj4 =  {}
                                  obj4['getinitiatingcauses'] = impact.RiskMatrix[a].InitiatingCauses[b].initiatingCause
                                  obj4['getIEL'] = impact.RiskMatrix[a].InitiatingCauses[b].IELA;
                                  this.IELA+=obj4['getIEL'];
                                  this.PFDAVGA=this.TRFA/this.IELA;
                                  obj4['getIEF'] = impact.RiskMatrix[a].InitiatingCauses[b].IEF;
                                  obj4['getIP'] = impact.RiskMatrix[a].InitiatingCauses[b].IP;
                                  obj4['getPP'] = impact.RiskMatrix[a].InitiatingCauses[b].PP;
                                  obj4['getTR'] = impact.RiskMatrix[a].InitiatingCauses[b].TR;
                                  for (let z = 0; z < impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers.length; z++) {
                                      if( impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'General Process Design'){
                                          obj4['getDescription1'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj4['getPFD1'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'BPCS'){
                                          obj4['getDescription2'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj4['getPFD2'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Alarm'){
                                          obj4['getDescription3'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj4['getPFD3'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'Restricted Acess'){
                                          obj4['getDescription4'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj4['getPFD4'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
                                      }
                                      else if(impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].NameOfIPL == 'IPL Dyke,PRV'){
                                          obj4['getDescription5'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].Description;
                                          obj4['getPFD5'] = impact.RiskMatrix[a].InitiatingCauses[b].ProtectionLayers[z].PFD;
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
}
