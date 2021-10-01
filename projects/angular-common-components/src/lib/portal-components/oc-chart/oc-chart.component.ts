import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js';
import {
    ChartOptionsChange,
    ChartStatisticFiledModel,
    ChartStatisticModel,
    ChartStatisticParameterModel,
    ChartStatisticPeriodModel,
} from '../models/oc-chart.model';
import { DropdownModel } from '@openchannel/angular-common-components/src/lib/common-components';

const chartPoint = new Image();
chartPoint.src = 'assets/angular-common-components/chart_point.svg';

/**
 * Component for statistical data view. Includes chart, table, menus for data switching.
 */
@Component({
    selector: 'oc-chart',
    templateUrl: './oc-chart.component.html',
    styleUrls: ['./oc-chart.component.css'],
})
export class OcChartComponent implements OnChanges, OnInit, AfterViewInit {
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
     * Setup SVG icon for navigation to tabular view.
     */
    @Input() tabularSvgIcon: string = '';
    /**
     *  Setup SVG icon for navigation to graph view.
     */
    @Input() graphSvgIcon: string = '';
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
     * Angular lifecycle function. Init on component creation.
     * Setting the {@link tabularLabelsHeader}. Connecting chart lib, loading chart and dropdown menu items.
     */
    ngOnInit(): void {
        this.tabularLabelsHeader = this.chartData?.periods?.find(period => period.active).tabularLabel;
        this.updateDropdownValues();
    }

    /**
     * Angular lifecycle function. Triggering on every changes of the Input of component.
     * Reloads chart on any chart data changes.
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chartData?.previousValue !== changes.chartData?.currentValue) {
            this.fillTabularData();
            this.reloadChart();
        }
    }

    ngAfterViewInit(): void {
        this.reloadChart();
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

        Chart.register(CategoryScale, LineController, PointElement, LineElement, LinearScale, Tooltip, Legend);

        this.chart = new Chart(this.context, {
            type: 'line',
            data: {
                labels: this.chartData?.data?.labelsX || [],
                datasets: [
                    {
                        data: this.chartData?.data?.labelsY ? this.chartData.data.labelsY : [],
                        backgroundColor: this.isBackgroundColor ? gradientFill : 'transparent',
                        borderColor: 'rgba(83, 124, 253, 1)',
                        tension: 0,
                        borderWidth: 1.7,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                    x: {
                        position: 'bottom',
                        grid: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            padding: 8,
                            color: '#727272',
                            maxRotation: 0,
                            autoSkipPadding: 20,
                            callback(rawValue: any): any {
                                const value = this.getLabelForValue(rawValue);
                                if (value.length >= 8) {
                                    return value.substring(0, 3);
                                }
                                return value;
                            },
                        },
                    },
                    y: {
                        grid: {
                            drawBorder: false,
                            color: 'rgba(201, 213, 234, 0.4)',
                            lineWidth: 1,
                        },
                        min: 0,
                        beginAtZero: true,
                        ticks: {
                            autoSkip: true,
                            color: '#727272',
                            callback(value: any, index: number, values: any[]): any {
                                if (value > 999) {
                                    return value / 1000 + 'k';
                                }
                                return value;
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        intersect: false,
                        position: 'nearest',
                        backgroundColor: '#FFF',
                        titleFont: {
                            size: 14,
                        },
                        titleColor: '#333333',
                        bodyColor: '#727272',
                        borderColor: '#c9d5ea',
                        borderWidth: 1,
                        titleMarginBottom: 6,
                        bodyFont: {
                            size: 12,
                        },
                        padding: 12,
                        caretPadding: 20,
                        displayColors: false,
                        titleAlign: 'center',
                        bodyAlign: 'center',
                        callbacks: {
                            title: tooltipItem => `  ${tooltipItem[0].formattedValue}  `,
                            label: tooltipItem => tooltipItem.label,
                        },
                    },
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
