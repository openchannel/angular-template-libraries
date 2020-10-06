import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { SafeUrl } from '@angular/platform-browser';


const chartPoint = new Image();
chartPoint.src = '../../../assets/img/chart_point.svg';

@Component({
  selector: 'oc-chart',
  templateUrl: './oc-chart.component.html',
  styleUrls: ['./oc-chart.component.scss']
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class OcChartComponent implements AfterViewInit, OnChanges {

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;
  /** Labels at the bottom of the chart */
  @Input() labels: string[] = [];
  /** Datasets at the right side of the chart */
  @Input() dataSets: number[] = [];
  /** Sum of data or other total count that can be shown */
  @Input() count: number;
  /** Title text of the data count */
  @Input() countText: string = '';
  /** Url of the Chart count image */
  @Input() downloadUrl: SafeUrl;
  /** Set or remove background color for chart line */
  @Input() isBackgroundColor: boolean = true;
  /** Enable or Disable points on Chart */
  @Input() enablePoints: boolean = false;
  // change in value of this invokes ngOnChanges
  @Input() random;

  private chart: any;

  constructor() {
  }


  ngAfterViewInit(): void {
    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }
    if (this.myCanvas) {
      this.context = this.myCanvas.nativeElement.getContext('2d');
      this.getChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngAfterViewInit();
  }

  getChart() {
    const gradientFill = this.context.createLinearGradient(0, 0, 0, 170);
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
          backgroundColor: this.isBackgroundColor ? gradientFill : 'transparent',
          borderColor: 'rgba(83, 124, 253, 1)',
          lineTension: 0,
          borderWidth: 1.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        // hover: {
        //   onHover: (e, data) => {
        //     if (this.tooltip._active && this.tooltip._active.length > 0) {
        //       //console.log("on hover:" + (<any>this).tooltip._active.length);
        //       const chartPointArray = new Array(this.tooltip._active[0]._index);
        //       chartPointArray.push(chartPoint);
        //       this.data.datasets[0].pointStyle = chartPointArray;
        //       this.update();
        //     }
        //   }
        // },
        tooltips: {
          enabled: true,
          intersect: false,
          position: 'nearest',
          backgroundColor: '#FFF',
          titleFontSize: 14,
          titleFontColor: '#333333',
          bodyFontColor: '#727272',
          borderColor: '#c9d5ea',
          borderWidth: 1,
          titleMarginBottom: 6,
          bodyFontSize: 12,
          xPadding: 12,
          yPadding: 12,
          caretPadding: 20,
          displayColors: false,
          titleAlign: 'center',
          bodyAlign: 'center',
          callbacks: {
            title: (tooltipItem, data) => {
              return '  ' + tooltipItem[0].value + '  ';
            },
            label: (tooltipItem, data) => {
              // data.datasets[0].pointStyle = chartPoint;
              // this.chart.update();
              // const label = data.datasets[tooltipItem.datasetIndex].label || '';
              return tooltipItem.label;
            }
          }
        },
        elements: {
          point: {
            radius: this.enablePoints ? 2 : 0,
            hitRadius: 10,
            hoverRadius: this.enablePoints ? 4 : 0,
            hoverBorderWidth: 0,
            backgroundColor: 'rgba(83, 124, 253, 1)',
            borderColor: 'rgba(83, 124, 253, 1)',
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
              padding: 24,
              fontColor: '#727272',
              // maxRotation: 30,
              // minRotation: 30,
              callback(value: any, index, values) {
                if (value.length === 8) {
                  return value.substring(0, 3);
                }
                return value;
              }
            }
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(201, 213, 234, 0.4)',
              zeroLineColor: 'rgba(201, 213, 234, 0.4)'
            },
            ticks: {
              min: 0,
              padding: 20,
              beginAtZero: true,
              fontColor: '#727272',
              callback(value: any, index, values) {
                if (value > 999) {
                  return (value / 1000) + 'k';
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
