import { moduleMetadata } from '@storybook/angular';
import {
    ChartLayoutTypeModel,
    ChartStatisticAppModel,
    OcChartComponent,
    OcCommonLibModule,
} from 'projects/angular-common-components/src/public-api';
import { sum } from 'lodash';
import { NgModule } from '@angular/core';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules: NgModule = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Chart [BEM]',
    component: OcChartComponent,
    decorators: [moduleMetadata(modules)],
};

const month = {
    labelsY: [3, 10, 30, 50, 25, 40, 100, 70, 150, 200, 50, 85, 50],
    labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    tabularLabels: [
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        'January',
        'February',
        'March',
    ],
};

const day = {
    labelsY: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750],
    labelsX: [
        'Jan 30',
        'Jan 31',
        'Feb 01',
        'Feb 02',
        'Feb 03',
        'Feb 04',
        'Feb 04',
        'Feb 06',
        'Feb 07',
        'Feb 08',
        'Feb 09',
        'Feb 10',
        'Feb 11',
    ],
    tabularLabels: [
        'Jan 30',
        'Jan 31',
        'Feb 01',
        'Feb 02',
        'Feb 03',
        'Feb 04',
        'Feb 04',
        'Feb 06',
        'Feb 07',
        'Feb 08',
        'Feb 09',
        'Feb 10',
        'Feb 11',
    ],
};

const periods = [
    {
        id: 'month',
        label: 'Monthly',
        tabularLabel: 'Month',
    },
    {
        id: 'day',
        label: 'Daily',
        active: true,
        tabularLabel: 'Day',
    },
];

const fields = [
    {
        id: 'downloads',
        label: 'Downloads',
        active: true,
    },
    {
        id: 'reviews',
        label: 'Reviews',
    },
    {
        id: 'leads',
        label: 'Leads',
    },
    {
        id: 'views',
        label: 'Views',
    },
];

const selectedApp = {
    id: 'all-app',
    label: 'All apps',
    active: true,
};

const apps = {
    activeItem: selectedApp,
    items: [
        selectedApp,
        {
            id: 'app-1',
            label: 'API Connections',
        },
        {
            id: 'app-2',
            label: 'Lead Accounting',
        },
        {
            id: 'app-3',
            label: 'Full CRM',
        },
        {
            id: 'app-4',
            label: 'Intersect AI Prediction',
        },
        {
            id: 'app-5',
            label: 'Fuel CRM Lite',
        },
        {
            id: 'app-6',
            label: 'Long app name 12345678901234567890123456789012345678901234567890',
        },
    ],
};

const ChartComponent = (args: OcChartComponent) => ({
    component: OcChartComponent,
    moduleMetadata: modules,
    props: args,
});

export const Monthly = ChartComponent.bind({});

Monthly.args = {
    chartData: {
        layout: ChartLayoutTypeModel.standard,
        data: month,
        periods,
        fields,
        apps,
    },
    count: sum(month.labelsY),
    countText: 'Total',
    downloadUrl: './assets/img/upload_icon.svg',
    isBackgroundColor: true,
    enablePoints: true,
    random: true,
};

export const Daily = ChartComponent.bind({});

Daily.args = {
    chartData: {
        layout: ChartLayoutTypeModel.standard,
        data: day,
        periods,
        fields,
        apps,
    },
    count: sum(day.labelsY),
    countText: 'Total',
    downloadUrl: './assets/img/upload_icon.svg',
    isBackgroundColor: true,
    enablePoints: true,
    random: true,
};

export const WitoutAppsDropdown = ChartComponent.bind({});

WitoutAppsDropdown.args = {
    chartData: {
        layout: ChartLayoutTypeModel.standard,
        data: day,
        periods,
        fields,
    },
    count: sum(day.labelsY),
    countText: 'Total',
    downloadUrl: './assets/img/upload_icon.svg',
    isBackgroundColor: true,
    enablePoints: true,
    random: true,
};

export const Empty = ChartComponent.bind({});

Empty.args = {
    count: 0,
};
