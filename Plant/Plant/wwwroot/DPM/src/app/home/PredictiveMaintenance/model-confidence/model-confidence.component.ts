import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { info } from 'console';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

@Component({
  selector: 'app-model-confidence',
  templateUrl: './model-confidence.component.html',
  styleUrls: ['./model-confidence.component.scss']
})
export class ModelConfidenceComponent implements OnInit {
  public getPredictiveList: any = [];
  public gettd1newValues: any = [];
  public gettd1predictedValues: any = [];
  public gettd1newDate: any = [];
  public gettd1predictedDate: any = [];
  public getpredictedDate: any = [];
  public getPredictedValues: any = [];
  public color: string = "";
  public average:string = "";
  public max:string = "";
  public min:string = "";
  public displayConfidenceDetails: boolean = false;
  public displayBadData: boolean = false;
  public getPredictivePercentageList:any = [];

  constructor(private ModelConfidenceCommonBLService: CommonBLService) { }

  ngOnInit(): void {
    this.average = "0%";
    this.max = "9%";
    this.min = "-5%";
    this.GetModelConfidenceCsvData();
    this.GetPredictivePercentageData();
  }
  

  lineChart() {
    const stackedLine = new Chart("Chart2", {
      type: 'line',
      data: {
        labels: this.gettd1newDate,
        datasets: [{
          label: 'Historical Data(Line Chart)',
          data: this.gettd1newValues,
          // fill: true,
          // backgroundColor: 'blue',
          borderColor: 'blue',

        }, {
          label: 'Predicted Data(Line Chart)',
          data: this.gettd1predictedValues,
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
  public showDetails(){
    this.displayConfidenceDetails = true;
  }
  public showBadData(){
     this.displayBadData=true;
  }
  public GetModelConfidenceCsvData() {
    this.ModelConfidenceCommonBLService.getWithoutParameters('/PredictiveChartAPI/GetModelConfidenceCsvData')
      .subscribe((res: any) => {
        this.getPredictiveList = res;
        console.log(this.getPredictiveList)
        this.getPredictiveList.forEach(csvRecord => {
          if (csvRecord.ValueNew == "") {
            csvRecord.ValueNew = "N/A";
          }
          if (csvRecord.ValuePredicted == "") {
            csvRecord.ValuePredicted = "N/A";
          }
          if (csvRecord.ValueNew != "" || csvRecord.ValuePredicted != "") {
            this.gettd1newDate.push(csvRecord.Date);
          }
          this.gettd1newValues.push(csvRecord.ValueNew);
          this.gettd1predictedValues.push(csvRecord.ValuePredicted);

        });
        this.lineChart();
      })
  }
  public GetPredictivePercentageData() {
    this.ModelConfidenceCommonBLService.getWithoutParameters('/PredictiveChartAPI/GetPredictivePercentage')
      .subscribe((res: any) => {
        this.getPredictivePercentageList = res;
        console.log(this.getPredictiveList)
        // this.getPredictiveList.forEach(csvRecord => {
        //   if (csvRecord.ValueNew == "") {
        //     csvRecord.ValueNew = "N/A";
        //   }
        //   if (csvRecord.ValuePredicted == "") {
        //     csvRecord.ValuePredicted = "N/A";
        //   }
        //   if (csvRecord.ValueNew != "" || csvRecord.ValuePredicted != "") {
        //     this.gettd1newDate.push(csvRecord.Date);
        //   }
        //   this.gettd1newValues.push(csvRecord.ValueNew);
        //   this.gettd1predictedValues.push(csvRecord.ValuePredicted);

        // });
        this.lineChart();
      })
  }
}