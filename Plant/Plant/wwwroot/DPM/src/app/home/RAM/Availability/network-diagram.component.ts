import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { RCMContantAPI } from '../../RCM/FMEA/Shared/RCMConstant';
import { PlantNetwork, Equipments, Edges, EquipmentWithCalculations, EquipmentWithoutCalculations } from '../Availability/network-diagram.model';
declare var vis: any;

@Component({
    selector: 'app-network-diagram',
    templateUrl: './network-diagram.component.html'
})

export class NetworkDiagram implements OnInit {
    @ViewChild("siteConfigNetwork", { static: true }) networkContainer: ElementRef;
    public addData: boolean = false;
    public Enterdata: boolean = false;
    public CalculateData: boolean = false;
    public CalculateUnavailability: boolean = false;
    public popup: any = [];
    public network: any;

    public nodeData: any = [];

    // public Node: string = "";
    public EquipmentNode: string = "";  //common for both Calculated and provided

    public EquipmentName: string = "";
    public Lambda: number;
    public MDT: number;

    public CalculatedEquipmentName: string = "";
    public selectedEquipmentsName: any = [];
    public Logic: string = "";
    public CalculatedLambda: number;
    public CalculatedMDT: number;
    public CalculatedMTBF: number;

    public EquipmentDataList: any = [];
    public EquipmentsName: any = [];

    //Calculations
    public LambdaValueplus: number = 0;
    public MdtValueplus: number = 0;
    public MdtValuemultiplied: number = 1;
    public LambdaValuemultiplied: number = 1;
    public lambdamdtvalue: number = 0;

    //Save
    public NodeDataList: any = [];
    public EdgeDataList: any = [];
    public PlantDataList: any = [];
    public plantClass: PlantNetwork = new PlantNetwork();

    public image: string = "";
    public SelectedList: any = [];
    public equipment = new Equipments();

    public MasterNetworkDataList: any = [];
    public MasterPlantDataList: any = [];
    public MasterPlantName: string[] = [];

    public TagNumbers: any = [];
    public SelectedTag: string = "";
    public AssetImage: string = "";

    constructor(private NetworkBLService: CommonBLService,
        private messageService: MessageService,
        private NetworkContantAPI: RCMContantAPI,
        public router: Router,) { }

    ngOnInit() {
        this.getMasterPlantData();
        var treeData = this.getTreeData();
        this.loadVisTree(treeData);     // RENDER STANDARD NODES WITH TEXT LABEL
    }

    save() {
        console.log(this.network);
    }

    public getMasterPlantData() {
        var url: string = this.NetworkContantAPI.PlantMasterData;
        this.NetworkBLService.getWithoutParameters(url)
            .subscribe((res: any) => {
                this.MasterPlantDataList = res;
                this.MasterPlantDataList.forEach(plantData => {
                    this.MasterPlantName.push(plantData.PlantName)
                });
            }, err => {
                console.log(err.err);
            }
            )
    }

    public SetPlantLocation() {
        var PlantData = this.MasterPlantDataList.find(a => a['PlantName'] === this.plantClass.PlantName);
        this.plantClass.Location = PlantData.Location;
        this.getNetworkMasterData();
    }

    public getNetworkMasterData() {
        var url: string = this.NetworkContantAPI.NetworkMasterData;
        this.NetworkBLService.getWithoutParameters(url)
            .subscribe((res: any) => {
                this.MasterNetworkDataList = res;
                this.MasterNetworkDataList.forEach(masterData => {
                    this.TagNumbers.push(masterData.TagNumber)
                });
            }, err => {
                console.log(err.err);
            }
            )
    }

    public TagNumberSelect() {
        this.EquipmentName = "";
        this.Lambda = null;
        this.MDT = null;
        this.AssetImage = "";
        var MasterData = this.MasterNetworkDataList.find(a => a['TagNumber'] === this.SelectedTag);
        this.EquipmentName = MasterData.AssetName;
        this.Lambda = MasterData.AssetLambda;
        this.MDT = MasterData.AssetMdt;
        this.AssetImage = MasterData.AssetImage;
    }

    loadVisTree(treedata) {
        var options = {
            // "layout": {
            //   "hierarchical": {
            //     "enabled": true,
            //     "levelSeparation": 10,
            //     "nodeSpacing": 40,
            //     "treeSpacing": 20,
            //     "direction": "LR",
            //     "sortMethod": "directed"
            //   }
            // },
            "physics": {
                enabled: false
                // "hierarchicalRepulsion": {
                //     "centralGravity": 0.15,
                //     "springLength": 45,
                //     "springConstant": 1.13,
                //     "nodeDistance": 40,
                //     "damping": 0.12
                // },
                // "minVelocity": 0.75,
                // "solver": "hierarchicalRepulsion"
            },
            edges: {
                smooth: { roundness: 0.0, }, shadow: true,
                arrows: {
                    to: { enabled: true, scaleFactor: 1.56, type: "arrow" }
                }
            },
            interaction: {
                dragNodes: true,
                dragView: true,
                hover: true,
                zoomView: true
            },
            manipulation: {
                enabled: true
            },
        };
        var container = this.networkContainer.nativeElement;
        this.network = new vis.Network(container, treedata, options);

        this.network.on("click", async (clickProperties) => {
            this.popup = []
            this.popup = document.getElementById("addData")
            if (clickProperties.nodes.length == 1) {
                this.addData = true;
                this.EquipmentNode = clickProperties.nodes[0];
                for (let index = 0; index < this.EquipmentDataList.length; index++) {
                    if (this.EquipmentNode == this.EquipmentDataList[index].node) {
                        if (!(this.EquipmentDataList[index].logic)) {
                            this.EquipmentName = this.EquipmentDataList[index].equipmentName;
                            this.SelectedTag = this.EquipmentDataList[index].tagNumber;
                            this.MDT = this.EquipmentDataList[index].mdt;
                            this.Lambda = this.EquipmentDataList[index].lambda;
                            this.CalculatedMDT = null;
                            this.CalculatedLambda = null;
                            this.selectedEquipmentsName = "";
                            this.Logic = "";
                            this.CalculatedEquipmentName = "";
                            break;
                        }
                        else if (this.EquipmentDataList[index].logic) {
                            this.CalculatedMDT = this.EquipmentDataList[index].mdt;
                            this.CalculatedLambda = this.EquipmentDataList[index].lambda;
                            if (this.CalculateUnavailability == true) {
                                this.CalculatedMTBF = this.EquipmentDataList[index].mtbf;
                            }
                            this.selectedEquipmentsName = this.EquipmentDataList[index].selectedEquipments;
                            this.Logic = this.EquipmentDataList[index].logic;
                            this.CalculatedEquipmentName = this.EquipmentDataList[index].equipmentName;
                            this.EquipmentName = '';
                            this.MDT = null;
                            this.Lambda = null;
                            break;
                        }
                    }
                    else {
                        this.EquipmentName = '';
                        this.MDT = null;
                        this.Lambda = null;
                        this.CalculatedMDT = null;
                        this.CalculatedLambda = null;
                        this.selectedEquipmentsName = "";
                        this.Logic = "";
                        this.CalculatedEquipmentName = "";
                        this.SelectedTag = "";
                    }
                }
            }
            else {
                console.log("error");
            }
        });
        var that = this;
        this.network.on("hoverNode", function (params) {
            console.log('hoverNode Event:', params);
        });
        this.network.on("blurNode", function (params) {
            console.log('blurNode event:', params);
        });
    }

    getTreeData() {
        var nodes = [
            { id: 1, label: 'Node 1', title: 'I am node 1!' },
        ];

        // create an array with edges

        var treeData = {
            nodes: nodes
        };
        return treeData;
    }

    public EnterNodeData() {
        this.Enterdata = true;
    }

    public CalculateNodeData() {
        this.CalculateData = true;
    }

    public DisplayUnavailability() {
        this.CalculateUnavailability = true;
    }

    public SaveNodeData() {
        let obj = {};
        obj['node'] = this.EquipmentNode;
        obj['equipmentName'] = this.EquipmentName;
        obj['lambda'] = this.Lambda;
        obj['mdt'] = this.MDT;
        obj['tagNumber'] = this.SelectedTag;
        obj['image'] = this.AssetImage;
        var nodeHover = [
            'Equipment Name : ' + this.EquipmentName,
            '<br/>' + 'Lambda : ' + this.Lambda,
            '<br/>' + 'Mdt : ' + this.MDT
        ]
        this.EquipmentsName.push(this.EquipmentName)
        this.EquipmentDataList.push(obj);
        // this.SetEquipmentImage();
        this.nodeData = this.network.body.data.nodes;
        this.nodeData.forEach(element => {
            if (element.id == this.EquipmentNode) {
                element.label = this.EquipmentName;
                // if (this.image != "") {
                this.network.body.data.nodes.update({
                    id: element.id, label: this.EquipmentName, title: nodeHover, image: this.AssetImage,
                    shape: 'image',
                });
                // }
                // else {
                //     this.network.body.data.nodes.update({
                //         id: element.id, label: this.EquipmentName, title: nodeHover
                //     });
                // }
            }
        });
        this.network.redraw()
        this.Enterdata = false;
        this.addData = false;
    }

    public SaveCalculatedNodeData() {
        let obj = {};
        obj['node'] = this.EquipmentNode;
        obj['equipmentName'] = this.CalculatedEquipmentName;
        this.SelectedList = [];
        for (let index = 0; index < this.selectedEquipmentsName.length; index++) {
            this.SelectedList.push(this.selectedEquipmentsName[index].equipmentName);
        }
        obj['selectedEquipments'] = this.SelectedList
        obj['logic'] = this.Logic;
        obj['lambda'] = this.CalculatedLambda.toFixed(2);
        obj['mdt'] = this.CalculatedMDT.toFixed(2);
        if (this.CalculateUnavailability == true) {
            obj['mtbf'] = this.CalculatedMTBF.toFixed(2);
        }
        var nodeHover = [
            'Equipment Name : ' + this.CalculatedEquipmentName,
            '<br/>' + 'Selected Equipments : ' + this.SelectedList,
            '<br/>' + 'Logic : ' + this.Logic,
            '<br/>' + 'Lambda : ' + this.CalculatedLambda.toFixed(2),
            '<br/>' + 'Mdt : ' + this.CalculatedMDT.toFixed(2)
        ]
        this.EquipmentsName.push(this.CalculatedEquipmentName);
        this.EquipmentDataList.push(obj);
        // this.SetEquipmentImage();
        this.nodeData = this.network.body.data.nodes;
        this.nodeData.forEach(element => {
            if (element.id == this.EquipmentNode) {
                element.label = this.CalculatedEquipmentName;
                if (this.image != "") {
                    this.network.body.data.nodes.update({
                        id: element.id, label: this.CalculatedEquipmentName, title: nodeHover, image: this.image,
                        shape: 'image',
                    });
                }
                else {
                    this.network.body.data.nodes.update({
                        id: element.id, label: this.CalculatedEquipmentName, title: nodeHover
                    });
                }

            }
        });
        this.network.redraw()
        this.Enterdata = false;
        this.CalculateData = false;
        this.CalculateUnavailability = false;
        this.addData = false;
    }

    public CalculatedValues() {
        this.LambdaValueplus = 0;
        this.MdtValueplus = 0;
        this.MdtValuemultiplied = 1;
        this.LambdaValuemultiplied = 1;
        this.lambdamdtvalue = 0;
        this.selectedEquipmentsName.forEach(selectedEquipmentName => {
            this.MdtValueplus += Number(selectedEquipmentName.mdt);
            this.LambdaValueplus += Number(selectedEquipmentName.lambda);
            this.MdtValuemultiplied *= Number(selectedEquipmentName.mdt);
            this.LambdaValuemultiplied *= Number(selectedEquipmentName.lambda);
            this.lambdamdtvalue += Number(selectedEquipmentName.mdt * selectedEquipmentName.lambda)
        });
        if (this.Logic == 'AND') {
            this.CalculatedLambda = Number(this.MdtValueplus * this.LambdaValuemultiplied / 1000000);
            this.CalculatedMDT = Number(this.MdtValuemultiplied / this.MdtValueplus);
        }
        else if (this.Logic == 'OR') {
            this.CalculatedLambda = Number(this.LambdaValueplus);
            this.CalculatedMDT = Number(this.lambdamdtvalue / this.LambdaValueplus);
        }
        if (this.CalculateUnavailability == true) {
            this.CalculatedMTBF = Number(1000000 / this.CalculatedLambda / 8760);
            this.plantClass.Unavailability = Number((this.CalculatedMTBF / (this.CalculatedMTBF + this.CalculatedMDT)).toFixed(2));
            this.plantClass.Availability = Number(parseFloat(String( this.plantClass.Unavailability * 100)).toFixed(2));
        }
    }

    // public SetEquipmentImage() {
    //     this.EquipmentDataList.forEach(element => {
    //         this.image = "";
    //         if (element.equipmentName == 'PSU') {
    //             this.image = "https://cdn-icons-png.flaticon.com/512/1368/1368352.png"
    //         } else if (element.equipmentName == 'Standby') {
    //             this.image = "https://cdn-icons-png.flaticon.com/512/0/396.png"
    //         } else if (element.equipmentName == 'Detector') {
    //             this.image = "https://cdn-icons-png.flaticon.com/512/2784/2784797.png"
    //         } else if (element.equipmentName == 'Pump') {
    //             this.image = "https://cdn-icons-png.flaticon.com/512/2983/2983881.png"
    //         } else if (element.equipmentName == 'Motor') {
    //             this.image = "https://cdn-icons-png.flaticon.com/512/7016/7016867.png"
    //         } else if (element.equipmentName == 'Panel') {
    //             this.image = "https://cdn-icons.flaticon.com/png/512/4115/premium/4115020.png?token=exp=1660819966~hmac=8892742671a5c444d1e50d54972375d9"
    //         }
    //     });

    // }

    public SaveNetwork() {
        this.NodeDataList = this.network.body.data.nodes;
        this.EdgeDataList = this.network.body.data.edges;
        let networkDiagram = new PlantNetwork();
        networkDiagram.PlantId = 0;
        networkDiagram.PlantName = this.plantClass.PlantName;
        networkDiagram.Location = this.plantClass.Location;
        networkDiagram.Unavailability = this.plantClass.Unavailability;
        networkDiagram.Availability = this.plantClass.Availability;
        this.NodeDataList.forEach(node => {
            let equipment = new Equipments
            equipment.EquipmentId = 0;
            equipment.PlantId = networkDiagram.PlantId;
            equipment.EquipmentNode = node.id;
            var dataforPOC = this.EquipmentDataList.find(a => a['node'] === equipment.EquipmentNode);
            equipment.EquipmentName = dataforPOC.equipmentName;
            if (dataforPOC) {
                if (dataforPOC.logic) {
                    let equipmentWithCalculations = new EquipmentWithCalculations();
                    equipmentWithCalculations.EquipmentWithCalculationsId = 1;
                    equipmentWithCalculations.EquipmentId = equipment.EquipmentId;
                    // equipmentWithCalculations.EquipmentName = dataforPOC.equipmentName;
                    equipmentWithCalculations.EquimentsConnected = dataforPOC.selectedEquipments.toString();
                    equipmentWithCalculations.Logic = dataforPOC.logic;
                    equipmentWithCalculations.Lambda = dataforPOC.lambda;
                    equipmentWithCalculations.MDT = dataforPOC.mdt;
                    equipmentWithCalculations.MTBF = dataforPOC.mtbf;
                    equipment.EquipmentWithCalculations.push(equipmentWithCalculations);
                }
                else {
                    let equipmentWithoutCalculations = new EquipmentWithoutCalculations();
                    equipmentWithoutCalculations.EquipmentWithoutCalculationsId = 1;
                    equipmentWithoutCalculations.EquipmentId = equipment.EquipmentId;
                    // equipmentWithoutCalculations.EquipmentName = dataforPOC.equipmentName;
                    equipmentWithoutCalculations.Lambda = dataforPOC.lambda;
                    equipmentWithoutCalculations.MDT = dataforPOC.mdt;
                    equipmentWithoutCalculations.EquipmentImage = dataforPOC.image;
                    equipment.EquipmentWithoutCalculations.push(equipmentWithoutCalculations);
                }
            }
            networkDiagram.equipment.push(equipment);
        });
        this.EdgeDataList.forEach(edgeData => {
            let edge = new Edges();
            edge.EdgeId = 1;
            edge.PlantId = networkDiagram.PlantId;
            edge.EdgeName = edgeData.id;
            edge.EdgeSrc = edgeData.from;
            edge.EdgeDestination = edgeData.to;
            networkDiagram.edge.push(edge);
        });
        this.PlantDataList = networkDiagram;
        var url: string = this.NetworkContantAPI.PlantNetwork
        this.NetworkBLService.postWithoutHeaders(url, this.PlantDataList)
            .subscribe(
                res => {
                    console.log(res);
                    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Successfully Updated PlantNetwork' });
                    // this.router.navigateByUrl('/Home/RCMList');
                },
                err => {
                    console.log(err.Message);
                    console.log(err.error)
                    this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Something went wrong while updating, please try again later' });
                }
            )
    }
}
