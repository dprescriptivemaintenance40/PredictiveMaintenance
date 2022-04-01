import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';

@Component({
  selector: 'app-data-insight',
  templateUrl: './data-explanation.component.html',
  styleUrls: ['./data-explanation.component.scss']
})
export class DataExplanationComponent implements OnInit {

  public chart;
  public GetDataExplanation: any = [];
  public getTd1LowerLimit: any = [];
  public getTd1UpperLimit: any = [];
  public getMonthYear: any = [];
  public getDifflowerlimit:any=[];
  public getDiffupperlimit:any=[];
  public allData:any=[];
  constructor(private DataExplanationCommonBLService: CommonBLService) { }

  ngOnInit(): void {
    this.getDataExplanationCSVRecord();
  }

  lineChart() {
    const stackedLine = new Chart("Chart2", {
      type: 'line',
      data: {
        labels: this.getMonthYear,
        datasets: [{
          label: 'Historical Data(Line Chart)',
          data: this.getTd1LowerLimit,
          // fill: true,
          // backgroundColor: 'blue',
          borderColor: 'blue',

        }, {
          label: 'Predicted Data(Line Chart)',
          data: this.getTd1UpperLimit,
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
          responsive:true
        }
      }
    },
    )
  }
  public getDataExplanationCSVRecord() {
    
    this.DataExplanationCommonBLService.getWithoutParameters('/PredictiveChartAPI/GetDataExplanation')
      .subscribe((res: any) => {
        this.GetDataExplanation = res;
        console.log(this.GetDataExplanation)
        this.GetDataExplanation.forEach(csvRecord => {
          this.getTd1LowerLimit.push(csvRecord.Td1LowerLimit);
          this.getMonthYear.push(csvRecord.MonthYear);
          this.getTd1UpperLimit.push(csvRecord.Td1UpperLimit);
          this.getDifflowerlimit.push(csvRecord.Difflowerlimit);
          this.getDiffupperlimit.push(csvRecord.Diffupperlimit);
          this.allData.push(csvRecord);
        });
        this.lineChart();
        this.chart= document.getElementById("Chart2")
        this.chart.style.height="400px"
      })
  }
}
