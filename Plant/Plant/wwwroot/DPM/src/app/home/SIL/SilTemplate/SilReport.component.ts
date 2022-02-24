import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { SILConstantAPI } from '../Shared/Model/SILConstant';


@Component({
    selector: 'app-SilReport',
    templateUrl: './SilReport.component.html',
    styleUrls: ['./SilReport.component.css'],

})

export class SilReportComponent implements OnInit {
    public getId: number = 0;
    public silDataList: any = [];
    public id: any;
    public reportDataList: any = [];
    public getAllList: any = [];

    constructor(private ReportTemplateConstantAPI: SILConstantAPI,
        private ReportTemplateBLService: CommonBLService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = (this.route.snapshot.params['id']);
        this.getReportData();
        this.getSILData();
    }

    getReportData() {
        this.ReportTemplateBLService.getWithoutParameters(this.ReportTemplateConstantAPI.GetReportData)
            .subscribe((res: any) => {
                this.reportDataList = res;
                console.log(this.reportDataList)
            })

    }
    getSILData() {
        const params = new HttpParams()
            .set('Id', this.id);
        var url: string = this.ReportTemplateConstantAPI.GetSIL;
        this.ReportTemplateBLService.getWithParameters(url, params)
            .subscribe((res: any) => {
                this.silDataList = res;
                this.silDataList[0].ImpactEvents.forEach(impact => {
                    impact.RiskMatrix.forEach(risk => {
                        risk.InitiatingCauses.forEach(init => {
                            let obj = {};
                            obj['getinitiatingcauses'] = init.initiatingCause
                            obj['getIELP'] = init.IELP
                            obj['getIEF'] = init.IEF
                            init.ProtectionLayers.forEach(protlayer => {
                                if (protlayer.NameOfIPL == 'Alarm') {
                                    obj['PFD'] = protlayer.PFD;
                                    this.getAllList.push(obj)
                                }
                            });
                        });
                    });
                });
            })
    }
}