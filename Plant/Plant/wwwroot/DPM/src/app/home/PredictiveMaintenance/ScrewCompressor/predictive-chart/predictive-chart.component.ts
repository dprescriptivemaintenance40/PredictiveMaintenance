import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

@Component({
  selector: 'app-predictive-chart',
  templateUrl: './predictive-chart.component.html',
  styleUrls: ['./predictive-chart.component.scss']
})
export class PredictiveChartComponent implements OnInit {

  public getPredictiveList: any = [];
  public gettd1newValues: any = [];
  public gettd1predictedValues: any = [];
  public gettd1newDate: any = [];
  public gettd1predictedDate: any = [];
  public getpredictedDate: any = [];
  public getPredictedValues: any = [];
  public color: string = "";
  constructor(private PredictiveChartCommonBLService: CommonBLService) { }

  ngOnInit(): void {
    this.getPredictiveCSVRecord();
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
  public getPredictiveCSVRecord() {
    this.PredictiveChartCommonBLService.getWithoutParameters('/PredictiveChartAPI/GetPrescriptiveCsvData')
      .subscribe((res: any) => {
        this.getPredictiveList = res;
        this.getPredictiveList.forEach(csvRecord => {
          if (csvRecord.td1new == "") {
            csvRecord.td1new = "N/A"
          }
          else if(csvRecord.td1predicted == ""){
            csvRecord.td1predicted = "N/A"
          }
            this.gettd1newValues.push(csvRecord.td1new);
            this.gettd1newDate.push(csvRecord.Date);
            this.gettd1predictedValues.push(csvRecord.td1predicted);
        });
        this.lineChart();
      })
  }
}