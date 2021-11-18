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
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Scale, Tooltip } from 'chart.js';
import {
    ChartOptionsChange,
    ChartStatisticFiledModel,
    ChartStatisticModel,
    ChartStatisticParameterModel,
    ChartStatisticPeriodModel,
} from '../models/oc-chart.model';
import { ChartUtils } from '../utils/chart.utils';

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

    @Input() appDropdownTemplate: TemplateRef<any> = null;

    @Input() appDropdownAscendingSVGIcon: string = null;

    @Input() appDropdownDescendingSVGIcon: string = null;

    /**
     * Notification about changing chart data options, like dropdown menu item changing or period switching.
     */
    @Output() readonly changeChartOptions: EventEmitter<ChartOptionsChange> = new EventEmitter<ChartOptionsChange>();

    /** dropdown menu items array. Created from {@link chartData} fields */
    dropdownTypes: ChartStatisticFiledModel[];

    /** chosen item from the dropdown menu */
    dropdownSelectedType: ChartStatisticFiledModel;

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
        this.tabularLabelsHeader = this.chartData?.periods?.find(period => period.active)?.tabularLabel;
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
            this.setChart();
        }
    }

    /**
     * Creating main chart with configuration.
     */
    setChart(): void {
        const gradientFill = this.getGradientFill();

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
                            autoSkip: false,
                            padding: 8,
                            color: '#727272',
                            maxRotation: 0,
                            callback(rawValue: any): any {
                                const value = this.getLabelForValue(rawValue);
                                if (value.length >= 8) {
                                    return value.substring(0, 3);
                                }
                                return value;
                            },
                        },
                        // Custom autoSkip function to always show last tick
                        afterFit(axis: Scale): void {
                            const tickCount = axis.ticks.length;

                            if (tickCount === 0) {
                                return;
                            }

                            const skipPadding = 20;
                            const width = axis.width;
                            const paddingLeft = axis.paddingLeft;
                            const paddingRight = axis.paddingRight;

                            // @ts-ignore
                            let longestRotatedLabel = axis._labelSizes?.widest?.width;

                            if (axis.labelRotation !== 0) {
                                const labelRotationRadians = (axis.labelRotation * Math.PI) / 180;
                                const cosRotation = Math.cos(labelRotationRadians);
                                longestRotatedLabel *= cosRotation;
                            }

                            const maxPossibleWidth = (longestRotatedLabel + skipPadding) * tickCount;
                            const actualWidth = width - (paddingLeft + paddingRight);

                            let skipRatio = Math.floor(maxPossibleWidth / actualWidth) + 1;
                            let visibleTicksIndexes = ChartUtils.calculateVisibleIndexes(tickCount, skipRatio);
                            let increaseSkipRatio = ChartUtils.shouldIncreaseSkipRatio(skipRatio, visibleTicksIndexes);

                            // Increase skip ratio, so for odd ticks count we can render ticks
                            // as evenly as possible. For example, all gaps between ticks have
                            // skip ratio = 2 and last gap has skip ratio = 3 (the best solution for odd ticks count)
                            while (increaseSkipRatio && skipRatio < tickCount - ChartUtils.PERSISTING_TICKS_NUMBER) {
                                skipRatio++;
                                visibleTicksIndexes = ChartUtils.calculateVisibleIndexes(tickCount, skipRatio);
                                increaseSkipRatio = ChartUtils.shouldIncreaseSkipRatio(skipRatio, visibleTicksIndexes);
                            }

                            axis.ticks = axis.ticks.filter((_, i) => visibleTicksIndexes.includes(i));
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
     * Getter for private chart field.
     * @return {any} chart field
     */
    getChart(): any {
        return this.chart;
    }

    /**
     * Creates gradient for chart.
     * @return {CanvasGradient}
     */
    getGradientFill(): CanvasGradient {
        const gradientFill = this.context.createLinearGradient(0, 0, 0, 170);
        gradientFill.addColorStop(0, '#e7eef7');
        gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

        return gradientFill;
    }

    /**
     * Function that triggering on Period changes.
     * Swiping active parameters and updating chart data.
     * @param {ChartStatisticPeriodModel} activePeriod chosen period object
     */
    updateChartPeriod(activePeriod: ChartStatisticPeriodModel): void {
        this.tabularLabelsHeader = activePeriod.tabularLabel;
        this.updateChartOptions(this.chartData?.periods, activePeriod.id);
    }

    updateChartOptions(dropdownModels: ChartStatisticParameterModel[], activeModelId: string): void {
        this.setNewActiveParameter(dropdownModels, activeModelId);
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
                }
                return 0;
            });
        } else {
            this.tabularData.sort((a, b) => {
                if (a[by] > b[by]) {
                    return -1;
                } else if (a[by] < b[by]) {
                    return 1;
                }
                return 0;
            });
        }
    }

    updateChartData(): void {
        this.changeChartOptions.emit({
            field: this.chartData?.fields?.find(item => item?.active),
            period: this.chartData?.periods?.find(item => item?.active),
            selectedApp: this.chartData?.apps?.activeItem,
        });
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
        this.dropdownTypes = this.chartData?.fields || [];
        this.dropdownSelectedType = this.dropdownTypes.find(v => v.active);
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
