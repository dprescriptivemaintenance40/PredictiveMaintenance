import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Equipment, SIF,CompressorModel } from './Vis.model';
// import * as XLSX from 'xlsx';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as xlsx from "xlsx";

declare var vis:any;

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css'],
  providers:[DialogService,MessageService]
})

export class VisComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  @ViewChild("svgNetwork") svgNetworkContainer: ElementRef;

  public popup:any=[];
  public network: any;
  public plant:any =[];
  public EquipmentId :any = [];
  public editNode:any = [];
  public sif:any = [];
  public file: File
  public filelist: any;
  public compressorList:any = [];
  public rcmList:any =[];
  public arrayBuffer: any
  public HistoricalData:boolean =false;
  public VIEW:boolean = false;
  public ForecastData:boolean =false;
  public FunctionUpdate:boolean = false;
  public currentNodeObj:Equipment=new Equipment();
  public sifObj:SIF = new SIF();
  public TempcompressorModelObj:CompressorModel = new CompressorModel();
  private OrganizationId : number = 0;
  public state: any;
  public Records: any;
  constructor(public http:HttpClient,
    private router : Router, private VISBLService: CommonBLService,) { }

  ngOnInit() {
    
  }

  async ngAfterViewInit(){
    let plant = await this.getTreeData();
    let nodes : any= [];
    let edges : any= []; 
  
    this.plant = plant;
    this.state = window.history.state;    
    var id=this.plant[0].PlantId
    if( id === this.state.PlantId){
    console.log(this.plant)
    this.OrganizationId = this.plant[0].OrganizationId;
    this.plant[0].networks[0].equipmentList.forEach(async element => {
      var image : string = "";

      var nodeHover = [
      'MachineId : ' + element.MachineId,
      '<br/>' + 'TagNumber : ' + element.TagNumber,
      '<br/>' + 'AssetCost : ' + element.AssetCost,
      '<br/>' + 'RepairCost : ' + element.RepairCost,
      '<br/>' + 'MDT : ' + element.MDT,
      '<br/>' + 'FailureRate : ' + element.FailureRate
      ]
     

      if(element.Description.split("N")[0] == ""){
          image = "https://th.bing.com/th/id/OIP.d2X_P_UXADfWhMRSrbyoyAHaHa?pid=ImgDet&rs=1"
      }else if(element.Description.split("Pu")[0] == ""){
          image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7DpaifTnijlNu6zXuhmWRQwpWNGn2tuGldA&usqp=CAU"
      }else if(element.Description.split("Po")[0] == ""){
        image = "https://th.bing.com/th/id/OIP.tRIMgSyuztS--g525lJ-HAHaH0?pid=ImgDet&rs=1"
      }else if(element.Description.split("G")[0] == ""){
        image = "https://cdn-icons-png.flaticon.com/512/6527/6527003.png"
      }else if(element.Description.split("C")[0] == ""){
        image = "https://th.bing.com/th/id/OIP.hE7SV_CWo5ZOIHsrGUJOzAHaHa?pid=ImgDet&rs=1"
      }else if(element.Description.split("V")[0] == ""){
        image = "https://thumbs.dreamstime.com/z/industrial-valve-line-icon-industrial-valve-vector-line-icon-isolated-white-background-industrial-valve-line-icon-100290897.jpg"
      }else if(element.Description.split("M")[0] == ""){
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLt7HnYP7LGIogjuz63XYkpiPojcIMc75hA&usqp=CAU"
      }
    
      let obj = { 
            id: element.TagNumber, 
            label:element.Description, 
            image:image,
            shape: 'image',
            title:nodeHover,
            } 
       nodes.push(obj);
    });
   }
   else{
    console.log("error")
   }
   
    this.plant[0].networks[0].edges.forEach(async element => {
    let obj = {
        from: element.SrcId,  
        to: element.DestinationId,
      }
      edges.push(obj);   
    });
    let treeData = {
      nodes:nodes,
      edges:edges
    }
     this.loadVisTree(treeData); 
   
  }

  loadVisTree(treedata) {
    var options = {
      "layout": {
        "hierarchical": {
          "enabled": true,
          "levelSeparation": 210,
          "nodeSpacing": 340,
          "treeSpacing": 120,
          "direction": "LR",
          "sortMethod": "directed"
        }
      },
      "physics": {
        "hierarchicalRepulsion": {
          "centralGravity": 0.15,
          "springLength": 45,
          "springConstant": 1.13,
          "nodeDistance": 280,
          "damping": 0.12
        },
        "minVelocity": 0.75,
        "solver": "hierarchicalRepulsion"
      },  
    edges:{
      smooth: {roundness: 0.0,},shadow: true,
      arrows: {
        to: { enabled: true, scaleFactor: 1.56, type: "arrow" }
      }
    },        
    interaction: {
      dragNodes:true,
      dragView: true,
      hover: true,
      zoomView: true 
  },
};
    var container = this.networkContainer.nativeElement;
    this.network = new vis.Network(container, treedata, options);

    this.network.on("click", async (clickProperties) =>{
        this.popup=[]
        this.popup= document.getElementById("FunctionUpdate")
      if (clickProperties.nodes.length == 1) {
        this.FunctionUpdate = true;
        this.EquipmentId=clickProperties.nodes[0];
        this.currentNodeObj=new Equipment();
        this.currentNodeObj= ((this.plant[0].networks[0].equipmentList.filter(r => r.TagNumber ===this.EquipmentId)[0]) || (this.plant[0].networks[0].equipmentList.filter(r => r.EquipmentId === this.sif[0].EquipmentId ))[0]);
        console.log(this.currentNodeObj);
      }
      else{
        console.log("error");
      }
    });
  }
  
  async getTreeData() 
  {  
    return await this.http.get("api/PlantAPI/GetPlant").toPromise();
  }
 
  public closeModal(){
    this.popup= document.getElementById("FunctionUpdate")
    this.popup.style.display='none';
  }
 
  editequipmentList(node){
      this.editNode= this.plant[0].networks[0].equipmentList.filter(r => r.TagNumber === node.TagNumber )[0];
      console.log(this.plant);
      // this.http.put("/api/PlantAPI/UpdatePlant",node).subscribe(res=>{
      //   alert("Updated");
      //   console.log(res);
      // },
      // (err)=>{console.log(err)});
      this.popup= document.getElementById("FunctionUpdate")
      this.popup.style.display='none';
  }
  
   addfile(event) {    
  // this.file= event.target.files[0];     
  // let fileReader = new FileReader();    
  // fileReader.readAsArrayBuffer(this.file);     
  // fileReader.onload = (e) => {    
  //     this.arrayBuffer = fileReader.result;    
  //     var data = new Uint8Array(this.arrayBuffer);    
  //     var arr = new Array();    
  //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
  //     var bstr = arr.join("");    
  //     var workbook = XLSX.read(bstr, {type:"binary"});    
  //     var first_sheet_name = workbook.SheetNames[0];    
  //     var worksheet = workbook.Sheets[first_sheet_name];  
  //     this.compressorList = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  //     // console.log(this.store);
  //     // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
  //     var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});  
  //     console.log(this.compressorList)
  //     this.filelist = [];    
  //     console.log(this.filelist)  
  //     var TempcompressorModelObj = [];
  //     this.compressorList.forEach(element => {
  //       var obj:any={};
  //       obj['CompressorId'] = JSON.stringify(element.CompressorId),
  //       obj['OrganizationId'] = JSON.stringify(element.OrganizationId),
  //       obj['PS1'] = JSON.stringify(element.PS1);
  //       obj['PD1'] = JSON.stringify(element.PD1);
  //       obj['PS2'] = JSON.stringify(element.PS2);
  //       obj['PD2'] = JSON.stringify(element.PD2);
  //       obj['TS1'] = JSON.stringify(element.TS1);
  //       obj['TD1'] = JSON.stringify(element.TD1);
  //       obj['TS2'] =JSON.stringify( element.TS2);
  //       obj['TD2'] = JSON.stringify(element.TD2);
  //       obj['InsertedDate'] = element.InsertedDate;
  //       TempcompressorModelObj.push(obj);
  //     }); 
  //    this.http.post("api/PlantAPI/UploadCSV",TempcompressorModelObj).subscribe (res =>
  //     alert(res)
  //     );
  //   } 
  }
  public async forecastData(){
    await this.dygraph();
    this.ForecastData=true;
  //  this.router.navigateByUrl('/Home/Forecast')
  }
  public fmea(){
    this.router.navigateByUrl('/Home/FMEA', { state : { Machine : this.currentNodeObj, OrganizationId:this.OrganizationId} })
  }
  public rcm(){
    this.VIEW = true;
    const params = new HttpParams()
    .set('EquipmentId',this.currentNodeObj.EquipmentId.toString())
    this.VISBLService.getWithParameters("/RCMAPI/GetRCMList",params)
    .subscribe((res:any) => {
      this.rcmList = res;
    }, err => console.log(err.error))
  }

  // public fca(){
  //   this.router.navigateByUrl('/Home/FCA');
  // }

  dygraph() {
    this.http.get('dist/DPM/assets/Seasonal.xlsx', { responseType: 'blob' }).subscribe(
      (res: any) => {
        this.Records = res;
        console.log(this.Records);
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(res);
        fileReader.onload = async (e) => {
          var arrayBuffer: any = fileReader.result;
          var data = new Uint8Array(arrayBuffer);
          var arr = new Array();
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = xlsx.read(bstr, { type: "binary", cellDates: true });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          this.Records = xlsx.utils.sheet_to_json(worksheet, { raw: true });
          console.log(this.Records);
          var h = this.Records.map(function (e: any) {
            return e.historicalData;
            console.log(e.Predicted)
          })
         
          var p = this.Records.map(function (e: any) {
            return e.predictedData;
            console.log(e.Predicted)
          })
          

          var d = this.Records.map(function (e: any) {
            const date = moment(e.date).format("DD/MM/YYYY");
            return date;
            console.log(e.Predicted)
          })
          const stackedLine = new Chart("Chart1", {
            type: 'line',

            data: {
              labels: d,
              datasets: [{
                label: 'Historical values from 01/06/2016 - 16/11/2018 ',
                // data:[44,80,102,201],
                data: h,
                // backgroundColor: 'blue',
                borderColor:'blue',
              //  borderWidth:1.5
              },
              {
                label: 'Predicted values from 17/11/2018 - 19/08/2021',
                // data:[44,80,102,201],
                data: p,
                // backgroundColor: 'red',
                borderColor:'red',
                //borderWidth:1.5
              }],


            },

            options: {
              events: ["mousemove",],
              // scales: {
              //   x: {
              //     stacked: true
              //   },
              //   y: {
              //     stacked: true
              //   }
              // }

            }

          })

        }
      })
  }
}
