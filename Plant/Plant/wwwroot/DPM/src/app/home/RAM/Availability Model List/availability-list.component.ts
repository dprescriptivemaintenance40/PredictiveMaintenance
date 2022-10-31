import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { RCMContantAPI } from '../../RCM/FMEA/Shared/RCMConstant';

@Component({
    selector: 'app-availability-list',
    templateUrl: './availability-list.component.html',
    providers: [MessageService]
})
export class AvailabilityListComponent implements OnInit {

    public PlantnetworkList: any = [];
    public DeletePlantId: string ="";

    constructor(private RCMConstantAPI: RCMContantAPI,
        private PlantBLService: CommonBLService,
        public router: Router,
        public messageService:MessageService) {
    }

    ngOnInit() {
        this.getNetworkkDiagramList();
    }

    //gets the list of saved network diagram
    public getNetworkkDiagramList() {
        var url: string = this.RCMConstantAPI.GetPlantNetwork
        this.PlantBLService.getWithoutParameters(url)
            .subscribe((res: any) => {
                this.PlantnetworkList = res;
                console.log(this.PlantnetworkList)
            }, err => {
                console.log(err.err);
            }
            )
    }

    //save plantobj in local storage for report
    public AvailabilityModelReport(p) {
        let PlantId = p.PlantId;
        localStorage.setItem('PlantObjId', PlantId);
        this.router.navigateByUrl('/Home/AvailabilityReport');
    }

    //save plantobj in local storage to display the diagram
    public UpdateAvailabilityModel(p) {
        let PlantId = p.PlantId;
        localStorage.setItem('PlantObjId', PlantId);
        this.router.navigateByUrl('/Home/UpdateAvailability');
    }

    //here we get plantid
    public DeletePlantRecords(p) {
        this.DeletePlantId = p.PlantId;
    }

    //here we delete the record
    SoftDeletePantRecords() {
        var url: string = this.RCMConstantAPI.PlantListSingleDelete
        const params = new HttpParams()
            .set("id", this.DeletePlantId)
        this.PlantBLService.DeleteWithParam(url, params)
            .subscribe(res => {
                this.getNetworkkDiagramList();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
            }, err => {
                console.log(err)
            });
    }
}
