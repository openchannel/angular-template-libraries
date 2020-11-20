import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chart} from 'chart.js';
import { SafeUrl } from '@angular/platform-browser';
import {
  ChartStatisticModel,
  ChartStatisticParameterModel,
  ChartStatisticFiledModel,
  ChartStatisticPeriodModel,
  DropdownModel
} from 'oc-ng-common-service';



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
  /** Min width for the dropdown **/
  @Input() minDropdownWidth: string;
  /** Main model for building chart with buttons and dropdown **/
  @Input() chartData: ChartStatisticModel;
  /** Function for updating chart data, when user choice a new options **/
  @Input() updateChartDataFunc = (period: ChartStatisticPeriodModel, fields: ChartStatisticFiledModel): void => {};

  private chart: any;

  dropdownTypes: DropdownModel<ChartStatisticFiledModel>[];
  dropdownSelectedType: DropdownModel<ChartStatisticFiledModel>;

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
    this.updateDropdownValues();

    const gradientFill = this.context.createLinearGradient(0, 0, 0, 170);
    gradientFill.addColorStop(0, '#e7eef7');
    gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.chartData?.data?.labelsX ? this.chartData.data.labelsX : [],
        datasets: [{
          label: '',
          data: this.chartData?.data?.labelsY ? this.chartData.data.labelsY : [],
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

  updateChartPeriod(activePeriod: ChartStatisticPeriodModel): void {
    this.setNewActiveParameter(this.chartData?.periods, activePeriod.id);
    this.updateChartData();
  }

  updateChartFiled(activeFiled: DropdownModel<ChartStatisticFiledModel>): void {
    this.setNewActiveParameter(this.chartData?.fields, activeFiled.value.id);
    this.updateChartData();
  }

  private updateChartData(): void {
    let period = null;
    let field = null;
    if(this.chartData?.periods) {
      period = this.chartData.periods.filter(period => period && period.active)[0];
    }
    if(this.chartData?.fields) {
      field = this.chartData.fields.filter(field => field && field.active)[0];
    }
    this.updateChartDataFunc(period, field);
  }

  private setNewActiveParameter(parameters: ChartStatisticParameterModel[], newActiveElementId: string): void  {
    if(parameters) {
      parameters.forEach(parameter => {
        if(parameter) {
          parameter.active = parameter.id === newActiveElementId;
        }
      })
    }
  }

  private updateDropdownValues() {
    this.dropdownTypes = this.chartData?.fields ? this.chartData.fields
      .map(field => new DropdownModel(field.label, field)) : [];
    this.dropdownSelectedType = this.dropdownTypes.filter(field => field.value.active)[0];
  }
}

