import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
    var gradientFill = this.context.createLinearGradient(0, 0, 0, 170);
    gradientFill.addColorStop(0, '#e7eef7');
    gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '',
          data: this.dataSets,
          // backgroundColor: 'rgba(240, 247, 255, 0.25)',

          backgroundColor: gradientFill,
          borderColor: 'rgba(83, 124, 253, 1)',
          lineTension: 0,
          borderWidth: 1.7,
          pointBorderColor: 'rgb(83,124,253)',
          pointHoverBackgroundColor: 'rgba(250, 251, 255, 1)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
          // backgroundColor: '#ffff',
          // callbacks: {

          //   labelColor: function (tooltipItem, chart) {
          //     return {
          //       label: tooltipItem.label
          //     };
          //   },
          //   labelTextColor: function (tooltipItem, chart) {
          //     return '#333333';
          //   }
          // }
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0, // 0 disables bezier curves
          }
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
