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
  public getValues: any = [];
  public getDate: any = [];
  public getpredictedDate: any = [];
  public getPredictedValues:any = [];
  public color:string = "";
  constructor(private PredictiveChartCommonBLService: CommonBLService) { }

  ngOnInit(): void {
    this.getPredictiveCSVRecord();
  }

  lineChart() {
    const stackedLine = new Chart("Chart2", {
      type: 'line',
      data: {
        labels: this.getDate,
        datasets: [{
          label: 'New Values(Line Chart)',
          data: this.getValues,
          // fill: true,
          // backgroundColor: 'blue',
          borderColor: this.color,

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
          if (csvRecord.Id <= 1370) {
            this.getValues.push(csvRecord.ValueNew);
            this.getDate.push(csvRecord.Date);
            this.color = "red";
          } else {
            this.getDate.push(csvRecord.Date);
            this.getValues.push(csvRecord.ValueNew)
            this.color = "blue";
            // this.getValues.push(Number(csvRecord.ValueNew));
          }
        });
        this.lineChart();
        // console.log(this.getDate);
        // console.log(this.getPredictiveList);
      })
  }
}