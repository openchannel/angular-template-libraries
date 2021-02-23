import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { OcChartComponent } from 'oc-ng-common-component/src/lib/portal-components';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Chart',
  component: OcChartComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const ChartComponent = (args: OcChartComponent) => ({
  component: OcChartComponent,
  moduleMetadata: modules,
  props: args
});

export const Filled = ChartComponent.bind({});

Filled.args = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
  dataSets: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750, 250],
  count: 40,
  enablePoints: true
};

export const Empty = ChartComponent.bind({});

Empty.args = {
  count: 0
};
