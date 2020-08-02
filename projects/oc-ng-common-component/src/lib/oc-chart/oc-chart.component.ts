import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'oc-chart',
  templateUrl: './oc-chart.component.html',
  styleUrls: ['./oc-chart.component.scss']
  //encapsulation: ViewEncapsulation.ShadowDom
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

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '',
          data: this.dataSets,
          // backgroundColor: 'rgba(240, 247, 255, 0.25)',
          backgroundColor: 'rgba(83,124,253,0.1)',
          borderColor: 'rgb(83,124,253)',
          borderWidth: 1.8,
          pointBorderColor: 'rgb(83,124,253)',
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

  getValue(label: string) {
    return label;
  }


}
