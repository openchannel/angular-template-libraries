import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, ViewEncapsulation, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';


const chartPoint = new Image()
chartPoint.src = '../../../assets/img/chart_point.svg';

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
  @Input() name;

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
    if(this.myCanvas){
      this.context = this.myCanvas.nativeElement.getContext('2d');
      this.getChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngAfterViewInit();    
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
           borderWidth: 1.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        hover: {
          onHover: function(e, data) {
             if((<any>this).tooltip._active && (<any>this).tooltip._active.length > 0){
              //console.log("on hover:" + (<any>this).tooltip._active.length);
              let chartPointArray = new Array((<any>this).tooltip._active[0]._index);
              chartPointArray.push(chartPoint);
              this.data.datasets[0].pointStyle= chartPointArray;
              this.update();
             }             
          }
       },
        tooltips: {
          enabled: true,
          intersect:false,
          position: 'nearest',
          //mode: 'nearest',
          backgroundColor: '#FFF',
          titleFontSize: 14,
          titleFontColor: '#333333',
          bodyFontColor: '#727272',
          borderColor: '#c9d5ea',
          borderWidth: 1,
          titleMarginBottom:6,
          bodyFontSize: 12,
          xPadding:12,
          yPadding:12,
          caretPadding: 20,
          displayColors: false,
          titleAlign:'center',
          bodyAlign:'center',
          callbacks: {
            title:function(tooltipItem, data) {
              
              return "  " + tooltipItem[0].value + "  ";
            },
            label: function(tooltipItem, data) {
              //data.datasets[0].pointStyle = chartPoint;
              //this.chart.update();
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
              return tooltipItem.label;
            }
          }
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
              padding: 24,
              fontColor: '#727272',
              // maxRotation: 30,
              // minRotation: 30,
              callback(value: any, index, values) {     
                if(this.chart.name == 'month'){
                  return value.substring(0,3);
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
    this.chart.name = this.name;
  }

  getValue(label: string) {
    return label;
  }

}
