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

/**
 * Component for statistical data view. Includes chart, table, menus for data switching.
 */
@Component({
    selector: 'oc-chart',
    templateUrl: './oc-chart.component.html',
    styleUrls: ['./oc-chart.component.scss'],
})
export class OcChartComponent implements OnChanges, OnInit {
    @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;

    /**
     * Total sum of the data. It can be total reviews or total downloads.
     * @default  null
     */
    @Input() count: number;
    /**
     * Info title of the total count
     * @default empty
     */
    @Input() countText: string = '';
    /**
     * Path to the chart counter image. Can be local or url from server.
     * ## Data example for docs
     * ``
     * "./assets/img/image.png" or "https://example.site.com/image.png "
     * ``
     * @example
     * './assets/img/image.png'
     * 'https://example.site.com/image.png'
     */
    @Input() downloadUrl: SafeUrl;
    /**
     * Enable/Disable background gradient under chart line.
     * It is enabled by default
     */
    @Input() isBackgroundColor: boolean = true;
    /**
     * Enable/Disable points on the Chart line.
     * It is disabled by default.
     */
    @Input() enablePoints: boolean = false;
    /** Min width for the dropdown menu */
    @Input() minDropdownWidth: string;
    /**
     * (Required)
     * Main config model for the component.
     * Including chart data, layout type, etc.
     */
    @Input() chartData: ChartStatisticModel;
    /**
     * Set active data view type from the start.
     *
     * `tabular` - will demonstrate the tabular view of the data.
     *
     * `graph` - will show line graph.
     * @default 'graph'
     */
    @Input() activeDataType: 'tabular' | 'graph' = 'graph';
    /**
     * Path to the custom icon for the sorting button.
     * Can be local or url from server.
     * ## Data example for docs
     * ``
     * "./assets/img/image.png" or "https://example.site.com/image.png "
     * ``
     * @example
     * './assets/img/image.png'
     * 'https://example.site.com/image.png'
     */
    @Input() sortIcon: string = 'assets/angular-common-components/dropdown.svg';
    /**
     * Notification about changing chart data options, like dropdown menu item changing or period switching.
     */
    @Output() readonly changeChartOptions: EventEmitter<ChartOptionsChange> = new EventEmitter<ChartOptionsChange>();
    /** dropdown menu items array. Created from {@link chartData} fields */
    dropdownTypes: DropdownModel<ChartStatisticFiledModel>[];
    /** chosen item from the dropdown menu */
    dropdownSelectedType: DropdownModel<ChartStatisticFiledModel>;
    /** 2d context for the chart canvas */
    context: CanvasRenderingContext2D;
    /** header text for the tabular data labels column */
    tabularLabelsHeader: string;
    /** data array for the tabular format */
    tabularData: any[] = [];
    /**
     * helper for sorting tabular data.
     *
     * `by`: "key" | "value"
     *
     * `ascending`: true | false
     */
    activeTabularSort = {
        by: 'key',
        ascending: true,
    };
    /**
     * @ignore
     * @private
     */
    private chart: any;
    /**
     * @ignore
     * @private
     */
    private Chart;

    /**
     * Angular lifecycle function. Init on component creation.
     * Setting the {@link tabularLabelsHeader}. Connecting chart lib, loading chart and dropdown menu items.
     */
    async ngOnInit(): Promise<void> {
        this.tabularLabelsHeader = this.chartData.periods.find(period => period.active).tabularLabel;
        await this.connectChartLib();
        this.updateDropdownValues();
    }

    /**
     * Angular lifecycle function. Triggering on every changes of the Input of component.
     * Reloads chart on any chart data changes.
     */
    async ngOnChanges(changes: SimpleChanges) {
        await this.connectChartLib();
        if (changes.chartData.previousValue !== changes.chartData.currentValue) {
            this.fillTabularData();
            this.reloadChart();
        }
    }

    /**
     * Checking if chart already exists and reloading it.
     */
    reloadChart(): void {
        if (typeof this.chart !== 'undefined') {
            this.chart.destroy();
        }
        if (this.myCanvas) {
            this.context = this.myCanvas.nativeElement.getContext('2d');
            this.getChart();
        }
    }

    /**
     * Creating main chart with configuration.
     */
    getChart(): void {
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

    /**
     * Function that triggering on Period changes.
     * Swiping active parameters and updating chart data.
     * @param {ChartStatisticPeriodModel} activePeriod chosen period object
     */
    updateChartPeriod(activePeriod: ChartStatisticPeriodModel): void {
        this.tabularLabelsHeader = activePeriod.tabularLabel;
        this.setNewActiveParameter(this.chartData?.periods, activePeriod.id);
        this.updateChartData();
    }

    /**
     * Function that catches dropdown fields changes.
     * Swiping active parameters and updating chart data.
     * @param activeFiled chosen item
     */
    updateChartFiled(activeFiled: DropdownModel<ChartStatisticFiledModel>): void {
        this.setNewActiveParameter(this.chartData?.fields, activeFiled.value.id);
        this.updateChartData();
        this.updateDropdownValues();
    }

    /**
     * Switching between tabular and chart views.
     * @param type chosen type of the view
     */
    swapActiveDataType(type: 'tabular' | 'graph'): void {
        this.activeDataType = type;
        if (type === 'graph') {
            setTimeout(() => this.reloadChart(), 0);
        }
    }

    /**
     * Sorting tabular data column on click of the header.
     * Sorts by labels or by values.
     * @param by parameter for sorting
     */
    sortTabularData(by: 'label' | 'value'): void {
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

    /**
     * Checking for loaded chartJs lib and connects it of not connected.
     */
    async connectChartLib() {
        if (!this.Chart) {
            this.Chart = (await importChart).Chart;
        }
    }

    /**
     * Updating chart options and fields and throw changed value to the parent component.
     * @private
     */
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

    /**
     * Changing active dropdown item or period.
     * @param parameters array of parameters. It can be periods or fields
     * @param newActiveElementId unique id for switching
     * @private
     */
    private setNewActiveParameter(parameters: ChartStatisticParameterModel[], newActiveElementId: string): void {
        if (parameters) {
            parameters.forEach(parameter => {
                if (parameter) {
                    parameter.active = parameter.id === newActiveElementId;
                }
            });
        }
    }

    /**
     * Updating dropdown menu items
     * @private
     */
    private updateDropdownValues(): void {
        this.dropdownTypes = this.chartData?.fields ? this.chartData.fields.map(field => new DropdownModel(field.label, field)) : [];
        this.dropdownSelectedType = this.dropdownTypes.filter(field => field.value.active)[0];
    }

    /**
     * Filling tabular data array from the Chart data.
     * @private
     */
    private fillTabularData(): void {
        this.tabularData = [];
        this.chartData.data?.tabularLabels.forEach((label, index) => {
            this.tabularData.push({
                label,
                value: this.chartData.data.labelsY[index],
            });
        });
    }
}
