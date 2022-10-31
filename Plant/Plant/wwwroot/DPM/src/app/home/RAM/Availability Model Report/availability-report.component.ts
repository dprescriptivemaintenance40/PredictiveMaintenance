import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { RCMContantAPI } from '../../RCM/FMEA/Shared/RCMConstant';

@Component({
    selector: 'app-availability-report',
    templateUrl: './availability-report.component.html'
})

export class AvailabilityReportComponent implements OnInit {
    public PlantDataList: any = [];
    public NetworkDataTable: any = [];
    public MTBF:number;
    public MDT:number;

    constructor(private PlantConstantAPI: RCMContantAPI,
        private PlantBLService: CommonBLService,
        public router: Router) {
    }

    ngOnInit() {
        this.GetPlantData();
    }

    //here we get the plant id from local storage and make an api call to get plant record
    public GetPlantData() {
        let PlantDataId = localStorage.getItem('PlantObjId');
        var url: string = this.PlantConstantAPI.GetPlantNetworkbyId;
        const params = new HttpParams()
            .set('id', PlantDataId)
        this.PlantBLService.getWithParameters(url, params).subscribe
            ((res: any) => {
                console.log(res);
                this.PlantDataList = res;
                this.SetPlantData();
            });
    }

    //here we set the plant record in a table.
    public SetPlantData() {
        this.NetworkDataTable = [];
        this.PlantDataList.equipment.forEach(equi => {
            let equipmentObj = {};
            equipmentObj['EquipmentName'] = equi.EquipmentName;
            if (equi.equipmentWithoutCalculations.length > 0) {
                // equipmentObj['EquipmentName'] = equi.equipmentWithoutCalculations[0].EquipmentName
                equipmentObj['Lambda'] = equi.equipmentWithoutCalculations[0].Lambda;
                equipmentObj['MDT'] = equi.equipmentWithoutCalculations[0].MDT;
            }
            else if (equi.equipmentWithCalculations.length > 0) {
                // equipmentObj['EquipmentName'] = equi.equipmentWithCalculations[0].EquipmentName
                equipmentObj['Lambda'] = equi.equipmentWithCalculations[0].Lambda;
                equipmentObj['MDT'] = equi.equipmentWithCalculations[0].MDT;
                equipmentObj['EquimentsConnected'] = equi.equipmentWithCalculations[0].EquimentsConnected;
                equipmentObj['Logic'] = equi.equipmentWithCalculations[0].Logic;
                if(equi.equipmentWithCalculations[0].MTBF){
                    this.MTBF = equi.equipmentWithCalculations[0].MTBF;
                    this.MDT = equi.equipmentWithCalculations[0].MDT;
                }
            }
            this.NetworkDataTable.push(equipmentObj);
        });
    }
}
