import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { RCMContantAPI } from '../../RCM/FMEA/Shared/RCMConstant';
declare var vis: any;

@Component({
    selector: 'app-update-availability',
    templateUrl: './update-availability.component.html'
})

export class UpdateAvailabilityComponent implements OnInit {
    @ViewChild("siteConfigNetwork", { static: true }) networkContainer: ElementRef;

    public network: any;
    public PlantDataList: any = [];
    public EquipmentDataList: any = [];
    public MTBF: number;
    public MDT: number;
    public PlantName
    public Location: string = ""
    public Availability: string = "";
    public Unavailability: string = "";


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
                var treeData = this.getTreeData();
                this.loadVisTree(treeData);
            });
    }

    public SetPlantData() {
        this.EquipmentDataList = [];
        this.PlantName = this.PlantDataList.PlantName;
        this.Location = this.PlantDataList.Location;
        this.Availability = this.PlantDataList.Availability;
        this.Unavailability = this.PlantDataList.Unavailability;
        this.PlantDataList.equipment.forEach(equi => {
            let equipmentObj = {};
            equipmentObj['equipmentName'] = equi.EquipmentName;
            if (equi.equipmentWithoutCalculations.length > 0) {
                // equipmentObj['equipmentName'] = equi.equipmentWithoutCalculations[0].EquipmentName
                equipmentObj['lambda'] = equi.equipmentWithoutCalculations[0].Lambda;
                equipmentObj['mdt'] = equi.equipmentWithoutCalculations[0].MDT;
            }
            else if (equi.equipmentWithCalculations.length > 0) {
                // equipmentObj['equipmentName'] = equi.equipmentWithCalculations[0].EquipmentName
                equipmentObj['lambda'] = equi.equipmentWithCalculations[0].Lambda;
                equipmentObj['mdt'] = equi.equipmentWithCalculations[0].MDT;
                equipmentObj['selectedEquipments'] = equi.equipmentWithCalculations[0].EquimentsConnected;
                equipmentObj['logic'] = equi.equipmentWithCalculations[0].Logic;
                equipmentObj['mtbf'] = equi.equipmentWithCalculations[0].MTBF;
                // if (equi.equipmentWithCalculations[0].MTBF) {
                //     this.MTBF = equi.equipmentWithCalculations[0].MTBF;
                //     this.MDT = equi.equipmentWithCalculations[0].MDT;
                // }
            }
            this.EquipmentDataList.push(equipmentObj);
        });
    }

    //dispays nodes and edges on a screen
    loadVisTree(treedata) {
        var options = {
            interaction: {
                hover: true,
            },
            manipulation: {
                enabled: true
            }
        };
        var container = this.networkContainer.nativeElement;
        this.network = new vis.Network(container, treedata, options);

        var that = this;
        this.network.on("hoverNode", function (params) {
            console.log('hoverNode Event:', params);
        });
        this.network.on("blurNode", function (params) {
            console.log('blurNode event:', params);
        });
    }

    //creates a list of all nodes and edges
    getTreeData() {
        var nodes = [];
        var edges = [];
        this.PlantDataList.equipment.forEach(node => {
            if (node.equipmentWithCalculations.length > 0) {
                var nodeHover = [
                    'Equipment Name : ' + node.EquipmentName,
                    '<br/>' + 'Equipments Connected : ' + node.equipmentWithCalculations[0].EquimentsConnected +
                    '<br/>' + 'Logic : ' + node.equipmentWithCalculations[0].Logic +
                    '<br/>' + 'Lambda : ' + node.equipmentWithCalculations[0].Lambda +
                    '<br/>' + 'Mdt : ' + node.equipmentWithCalculations[0].MDT +
                    '<br/>' + 'MTBF : ' + node.equipmentWithCalculations[0].MTBF
                ]
                let obj = {
                    id: node.EquipmentNode,
                    label: node.EquipmentName,
                    title: nodeHover
                };
                nodes.push(obj);
            }
            else if(node.equipmentWithoutCalculations.length>0){
                var nodeHover = [
                    'Equipment Name : ' + node.EquipmentName +
                    '<br/>' + 'Lambda : ' + node.equipmentWithoutCalculations[0].Lambda +
                    '<br/>' + 'Mdt : ' + node.equipmentWithoutCalculations[0].MDT
                ]
                let obj = {
                    id: node.EquipmentNode,
                    label: node.EquipmentName,
                    image: node.equipmentWithoutCalculations[0].EquipmentImage,
                    title: nodeHover,
                    shape: 'image',
                };
                nodes.push(obj);
            }

        });
        this.PlantDataList.edge.forEach(edge => {
            let obj = {
                from: edge.EdgeSrc
                , to: edge.EdgeDestination
            };
            edges.push(obj);
        });
        var treeData = {
            nodes: nodes,
            edges: edges
        };
        return treeData;
    }
}
