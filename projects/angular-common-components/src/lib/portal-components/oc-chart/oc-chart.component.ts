import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { normalizeCommonJSImport } from '../utils/normalizeCommonJSImport';
import {
    ChartOptionsChange,
    ChartStatisticFiledModel,
    ChartStatisticModel,
    ChartStatisticParameterModel,
    ChartStatisticPeriodModel,
} from '../models/oc-chart.model';
import { DropdownModel } from '@openchannel/angular-common-components/src/lib/common-components';

const importChart = normalizeCommonJSImport(import('chart.js'));

const chartPoint = new Image();
chartPoint.src = 'assets/angular-common-components/chart_point.svg';

@Component({
    selector: 'oc-chart',
    templateUrl: './oc-chart.component.html',
    styleUrls: ['./oc-chart.component.scss'],
})
export class OcChartComponent implements OnChanges, OnInit {
    @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;

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
    /** Min width for the dropdown */
    @Input() minDropdownWidth: string;
    /** Main model for building chart with buttons and dropdown */
    @Input() chartData: ChartStatisticModel;
    /**
     * Set active data view type from the start.
     * Default 'graph'
     */
    @Input() activeDataType: 'tabular' | 'graph' = 'graph';
    /**
     * Path to the custom icon for the 'sort' button
     */
    @Input() sortIcon: string = 'assets/angular-common-components/dropdown.svg';
    @Output() changeChartOptions: EventEmitter<ChartOptionsChange> = new EventEmitter<ChartOptionsChange>();

    dropdownTypes: DropdownModel<ChartStatisticFiledModel>[];
    dropdownSelectedType: DropdownModel<ChartStatisticFiledModel>;
    context: CanvasRenderingContext2D;
    tabularLabelsHeader: string;
    tabularData: any[] = [];
    activeTabularSort = {
        by: 'key',
        ascending: true,
    };

    private chart: any;

    private Chart;

    constructor() {}

    async ngOnInit(): Promise<void> {
        this.tabularLabelsHeader = this.chartData.periods.find(period => period.active).tabularLabel;
        await this.connectChartLib();
        this.updateDropdownValues();
    }

    async ngOnChanges(changes: SimpleChanges) {
        await this.connectChartLib();
        if (changes.chartData.previousValue !== changes.chartData.currentValue) {
            this.fillTabularData();
            this.reloadChart();
        }
    }

    reloadChart(): void {
        if (typeof this.chart !== 'undefined') {
            this.chart.destroy();
        }
        if (this.myCanvas) {
            this.context = this.myCanvas.nativeElement.getContext('2d');
            this.getChart();
        }
    }

    getChart() {
        const gradientFill = this.context.createLinearGradient(0, 0, 0, 170);
        gradientFill.addColorStop(0, '#e7eef7');
        gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

        this.chart = new this.Chart(this.context, {
            type: 'line',
            data: {
                labels: this.chartData?.data?.labelsX ? this.chartData.data.labelsX : [],
                datasets: [
                    {
                        label: '',
                        data: this.chartData?.data?.labelsY ? this.chartData.data.labelsY : [],
                        backgroundColor: this.isBackgroundColor ? gradientFill : 'transparent',
                        borderColor: 'rgba(83, 124, 253, 1)',
                        lineTension: 0,
                        borderWidth: 1.7,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
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
                            return tooltipItem.label;
                        },
                    },
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
                    },
                },
                scales: {
                    xAxes: [
                        {
                            position: 'bottom',
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                autoSkip: true,
                                padding: 8,
                                fontColor: '#727272',
                                maxRotation: 0,
                                autoSkipPadding: 20,
                                callback(value: any, index, values) {
                                    if (value.length >= 8) {
                                        return value.substring(0, 3);
                                    }
                                    return value;
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                drawBorder: false,
                                color: 'rgba(201, 213, 234, 0.4)',
                                zeroLineWidth: 0,
                            },
                            ticks: {
                                autoSkip: true,
                                min: 0,
                                beginAtZero: true,
                                fontColor: '#727272',
                                lineHeight: 3,
                                callback(value: any, index, values) {
                                    if (value > 999) {
                                        return value / 1000 + 'k';
                                    }
                                    return value;
                                },
                            },
                        },
                    ],
                },
            },
        });
    }

    updateChartPeriod(activePeriod: ChartStatisticPeriodModel): void {
        this.tabularLabelsHeader = activePeriod.tabularLabel;
        this.setNewActiveParameter(this.chartData?.periods, activePeriod.id);
        this.updateChartData();
    }

    updateChartFiled(activeFiled: DropdownModel<ChartStatisticFiledModel>): void {
        this.setNewActiveParameter(this.chartData?.fields, activeFiled.value.id);
        this.updateChartData();
        this.updateDropdownValues();
    }

    swapActiveDataType(type: 'tabular' | 'graph') {
        this.activeDataType = type;
        if (type === 'graph') {
            setTimeout(() => this.reloadChart(), 0);
        }
    }

    sortTabularData(by: 'label' | 'value') {
        this.activeTabularSort.by = by;
        this.activeTabularSort.ascending = !this.activeTabularSort.ascending;
        if (this.activeTabularSort.ascending) {
            this.tabularData.sort((a, b) => {
                if (a[by] < b[by]) {
                    return -1;
                } else if (a[by] > b[by]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            this.tabularData.sort((a, b) => {
                if (a[by] > b[by]) {
                    return -1;
                } else if (a[by] < b[by]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    async connectChartLib() {
        if (!this.Chart) {
            this.Chart = (await importChart).Chart;
        }
    }

    private updateChartData(): void {
        let period = null;
        let field = null;
        if (this.chartData?.periods) {
            period = this.chartData.periods.filter(periodItem => periodItem && periodItem.active)[0];
        }
        if (this.chartData?.fields) {
            field = this.chartData.fields.filter(fieldItem => fieldItem && fieldItem.active)[0];
        }
        this.changeChartOptions.emit({ field, period });
    }

    private setNewActiveParameter(parameters: ChartStatisticParameterModel[], newActiveElementId: string): void {
        if (parameters) {
            parameters.forEach(parameter => {
                if (parameter) {
                    parameter.active = parameter.id === newActiveElementId;
                }
            });
        }
    }

    private updateDropdownValues() {
        this.dropdownTypes = this.chartData?.fields ? this.chartData.fields.map(field => new DropdownModel(field.label, field)) : [];
        this.dropdownSelectedType = this.dropdownTypes.filter(field => field.value.active)[0];
    }

    private fillTabularData() {
        this.tabularData = [];
        this.chartData.data?.tabularLabels.forEach((label, index) => {
            this.tabularData.push({
                label,
                value: this.chartData.data.labelsY[index],
            });
        });
    }
}
