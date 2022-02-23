import { Component, OnInit } from '@angular/core';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { SILConstantAPI } from '../Shared/Model/SILConstant';


@Component({
    selector: 'app-SilReport',
    templateUrl: './SilReport.component.html',
    styleUrls: ['./SilReport.component.css'],

})

export class SilReportComponent implements OnInit {

    public reportDataList: any = [];
    constructor(private ReportTemplateConstantAPI: SILConstantAPI,
        private ReportTemplateBLService: CommonBLService) { }

    ngOnInit() {
        var val=window.value;
        console.log(val)
        this.getReportData();
    }

    getReportData() {
        this.ReportTemplateBLService.getWithoutParameters(this.ReportTemplateConstantAPI.GetReportData)
            .subscribe((res: any) => {
                this.reportDataList = res;
                console.log(this.reportDataList)
            })

    }
}
