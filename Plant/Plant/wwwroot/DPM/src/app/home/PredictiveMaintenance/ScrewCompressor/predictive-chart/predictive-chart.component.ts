import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

@Component({
  selector: 'app-predictive-chart',
  templateUrl: './predictive-chart.component.html',
  styleUrls: ['./predictive-chart.component.scss']
})
export class PredictiveChartComponent implements OnInit {

  public SelectBoxEnabled: boolean = false
  public SelectedBatchNumber: number;
  public batch: any = [];
  public Data:any= [];
  public list:any= [];
  public Id:any;
  public getSelectedValues: any = [];
  public getSelectedPredictedValues: any = [];
  public getSelectedDate: any = [];
  public getPredictiveList: any = [];
  public processedValues: any = [];
  public predictedValues: any = [];

  constructor(private PredictiveChartCommonBLService: CommonBLService) { }

  ngOnInit(): void {
    this.getPredictiveRecord();
  }

  lineChart() {
    const stackedLine = new Chart("Chart2", {
      type: 'line',
      data: {
        labels: this.getSelectedDate,
        datasets: [{
          label: 'Historical Data(Line Chart)',
          data: this.getSelectedValues,
          // fill: true,
          // backgroundColor: 'blue',
          borderColor: 'blue',

        }, {
          label: 'Predicted Data(Line Chart)',
          data: this.getSelectedPredictedValues,
          // fill: true,
          // backgroundColor: 'blue',
          borderColor: 'red',

        },]
      },
      options: {
        scales: {
          // y: {
          //   stacked: true
          // }
        }
      }
    },
    )
  }
  getPredictiveRecord() {
    this.PredictiveChartCommonBLService.getWithoutParameters('/CompressorProcessAPI/GetBatchRecords')
       .subscribe((res: any) => {
              this.SelectBoxEnabled=true;
              console.log(res);
              this.getPredictiveList=res;
              this.getPredictiveList.forEach(record =>{
              this.batch.push(record[0]);
              this.processedValues=record[1];
              this.predictedValues=record[2];
              this.Id=record[0].Id;
              this.Data.push(this.Id,this.processedValues,this.predictedValues);
              this.list.push(this.Data);
              this.Data=[];
              });
        }, 
        error => { console.log(error.error) }
       );
  }
  BatchNumberSelect(){
    if (this.SelectedBatchNumber != null) {
      for(let x=0; x<this.list.length; x++){
        if(this.list[x][0]===this.SelectedBatchNumber){
           
        }
      }
    }
  }
}

// this.PredictiveChartCommonBLService.getWithoutParameters('/PredictiveChartAPI/GetPrescriptiveCsvData')
//       .subscribe((res: any) => {
//         this.getPredictiveList = res;
//         this.getPredictiveList.forEach(csvRecord => {
//           if (csvRecord.td1new == "") {
//             csvRecord.td1new = "N/A"
//           }
//           else if(csvRecord.td1predicted == ""){
//             csvRecord.td1predicted = "N/A"
//           }
//             this.gettd1newValues.push(csvRecord.td1new);
//             this.gettd1newDate.push(csvRecord.Date);
//             this.gettd1predictedValues.push(csvRecord.td1predicted);
//         });
//         this.lineChart();
//       })