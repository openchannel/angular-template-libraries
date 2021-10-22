import { DropdownItemModel } from '@openchannel/angular-common-components/src/lib/common-components';

/**
 * Interface for the [Chart]{@link OcChartComponent} component.
 * Contains of chart layout type, chart data, chart fields and periods.
 */
export interface ChartStatisticModel {
    /**
     * type of the component layout
     * @default 'standard'
     */
    layout: ChartLayoutTypeModel.standard;
    /** main chart data */
    data: ChartStatisticDataModel;
    /** fields array that will be used for the dropdown menu */
    fields: ChartStatisticFiledModel[];
    /** periods array for data switching */
    periods: ChartStatisticPeriodModel[];
    /**
     * apps dropdown
     */
    apps?: {
        activeItem: ChartStatisticAppModel;
        items: ChartStatisticAppModel[];
    };
}
/**
 * Interface for the [Chart]{@link OcChartComponent} component's data.
 * @example
 * configExample: ChartStatisticDataModel = {
 *     labelsY: [3, 10, 30, 50],
 *     labelsX: ['Mar', 'Apr', 'May', 'Jun'],
 *     tabularLabels: ['March','April','May','June']
 * }
 */
export interface ChartStatisticDataModel {
    /** data that will be shown on Y axis */
    labelsY: string[];
    /** data that will be shown on X axis */
    labelsX: string[];
    /**
     * labels that will be shown in tabular data.
     * It's necessary if `tabular` data view option is applied
     */
    tabularLabels?: string[];
}

/**
 * Interface for the [Chart]{@link OcChartComponent} component's dropdown menu.
 * Extends the {@link ChartStatisticParameterModel} .
 * Has `icon` field for the custom dropdown menu item icon.
 * @example
 * chartData = {
 *     ...
 *     fields: [
 *         {
 *              id: 'downloads',
 *              label: 'Downloads',
 *              active: true,
 *              icon: './assets/img/image.png'
 *         },
 *         {
 *             id: 'reviews',
 *             label: 'Reviews',
 *             icon: './assets/img/image2.png'
 *         }
 *     ]
 * }
 */
export interface ChartStatisticFiledModel extends ChartStatisticParameterModel {
    /**
     *  path to the icon that will be placed near dropdown menu item.
     *  Can be local or url from server.
     *  @example
     * './assets/img/image.png'
     * 'https://example.site.com/image.png'
     */
    icon?: string;
}

/**
 * Interface for the [Chart]{@link OcChartComponent} component's period radio buttons.
 * Extends the {@link ChartStatisticParameterModel} .
 * Has `tabularLabel` field that will be shown as a header of labels column
 * @example
 * chartData = {
 *     ...
 *     periods: [
 *         {
 *              id: 'month',
 *              label: 'Monthly',
 *              active: true,
 *              tabularLabel: 'Month',
 *         },
 *         {
 *             id: 'day',
 *             label: 'Daily',
 *             tabularLabel: 'Day',
 *         }
 *     ]
 * }
 */
export interface ChartStatisticPeriodModel extends ChartStatisticParameterModel {
    /** field that will be shown as a header of labels column */
    tabularLabel?: string;
}

/**
 * Interface for the [Chart]{@link OcChartComponent} component's emitter which triggering on period or field changes.
 */
export interface ChartOptionsChange {
    /** object of chosen field */
    field: ChartStatisticFiledModel;
    /** object of chosen period */
    period: ChartStatisticPeriodModel;

    selectedApp?: ChartStatisticAppModel;
}

/**
 * Basic interface for the [Chart]{@link OcChartComponent} component's [Field model]{@link ChartStatisticFiledModel}
 * and [Period model]{@link ChartStatisticPeriodModel}
 */
export interface ChartStatisticParameterModel extends DropdownItemModel {
    /** unique identificator of the parameter */
    id: string;
    /** label text of the parameter that will be shown */
    label: string;
    /** marks parameter as chosen */
    active?: boolean;
}

export interface ChartStatisticAppModel extends DropdownItemModel {
    id: string;
}

export enum ChartLayoutTypeModel {
    standard = 'standard',
}
