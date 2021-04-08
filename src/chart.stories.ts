import {moduleMetadata} from '@storybook/angular';
import {OcChartComponent, OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {ChartLayoutTypeModel} from 'oc-ng-common-service';
import {sum} from 'lodash';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Chart [BEM]',
  component: OcChartComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const month = {
  labelsY: [3, 10, 30, 50, 25, 40, 100, 70, 150, 200, 50, 85, 50],
  labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
};

const day = {
  labelsY: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750],
  labelsX: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 04', 'Feb 06',
    'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11']
};

const ChartComponent = (args: OcChartComponent) => ({
  component: OcChartComponent,
  moduleMetadata: modules,
  props: args
});

export const Monthly = ChartComponent.bind({});

Monthly.args = {
  chartData: {
    layout: ChartLayoutTypeModel.standard,
    data: month,
    periods: [
      {
        id: 'month',
        label: 'Monthly',
        active: true,
      }, {
        id: 'day',
        label: 'Daily'
      }],
    fields: [
      {
        id: 'downloads',
        label: 'Downloads',
        active: true,
      }, {
        id: 'reviews',
        label: 'Reviews',
      }, {
        id: 'leads',
        label: 'Leads',
      }, {
        id: 'views',
        label: 'Views'
      }]
  },
  count: sum(month.labelsY),
  countText: 'Total',
  downloadUrl: './assets/img/upload_icon.svg',
  isBackgroundColor: true,
  enablePoints: true,
  minDropdownWidth: '247px',
  random: true
};

export const Daily = ChartComponent.bind({});

Daily.args = {
  chartData: {
    layout: ChartLayoutTypeModel.standard,
    data: day,
    periods: [
      {
        id: 'month',
        label: 'Monthly',
        active: true,
      }, {
        id: 'day',
        label: 'Daily'
      }],
    fields: [
      {
        id: 'downloads',
        label: 'Downloads',
        active: true,
      }, {
        id: 'reviews',
        label: 'Reviews',
      }, {
        id: 'leads',
        label: 'Leads',
      }, {
        id: 'views',
        label: 'Views'
      }]
  },
  count: sum(day.labelsY),
  countText: 'Total',
  downloadUrl: './assets/img/upload_icon.svg',
  isBackgroundColor: true,
  enablePoints: true,
  minDropdownWidth: '247px',
  random: true
};

export const Empty = ChartComponent.bind({});

Empty.args = {
  count: 0
};
