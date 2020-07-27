import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'oc-chart',
  templateUrl: './oc-chart.component.html',
  styleUrls: ['./oc-chart.component.scss']
})
export class OcChartComponent implements AfterViewInit {

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;
  @Input() labels: string[] = [];
  @Input() dataSets: number[] = [];
  @Input() count;
  @Input() downloadUrl;

  chart: any;

  constructor() {
    // this.labels = [];
    // this.dataSets = [];
  }

  ngAfterViewInit(): void {
    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }

    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.getChart();
  }

  getChart() {
    // this.context.font = "30px Arial";
    // this.context.textBaseline = 'middle';
    // this.context.textAlign = 'center';

    // const x = (this.myCanvas.nativeElement as HTMLCanvasElement).width / 2;
    // const y = (this.myCanvas.nativeElement as HTMLCanvasElement).height / 2;
    // this.context.fillText("@realappie", x, y);

    // let chart = new Chart(this.context, {
    //   type: 'line',
    //   data: {
    //     datasets: [{
    //       label: 'First dataset',
    //       data: [0, 20, 40, 50]
    //     }],
    //     labels: ['January', 'February', 'March', 'April']
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           suggestedMin: 50,
    //           suggestedMax: 100
    //         }
    //       }]
    //     }
    //   }
    // });

    console.log(this.dataSets);
    console.log(this.labels);

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '',
          data: this.dataSets,
          backgroundColor: 'rgba(20,116,164 ,0.1)',
          borderColor: 'rgba(20,116,164 ,1)',
          borderWidth: 2.3,
          pointBackgroundColor: 'rgba(20,116,164 ,1)',
          pointBorderColor: 'rgba(20,116,164 ,1)',
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        scales: {
          xAxes: [{
            position: 'bottom',
            gridLines: {
              display: false,
              // drawBorder: true,
            },
            ticks: {
              autoSkip: false,
              // maxRotation: 30,
              // minRotation: 30
            }
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
            },
            ticks: {
              min: 0,
              beginAtZero: true,
              callback(value: any, index, values) {
                if (value > 999) {
                  const val = (value / 1000) + 'k';
                  return val;
                }
                return value;
              }
            }
          }]
        }
      }
    });
  }


}
