import {storiesOf} from '@storybook/angular';
import {OcChartComponent, OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};


storiesOf('Chart', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcChartComponent,
  })
  .add('Filled', () => ({
    component: OcChartComponent,
    props: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
      dataSets: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750, 250],
      count: 40
    },
    moduleMetadata: modules
  })).add('Empty', () => ({
  component: OcChartComponent,
  props: {
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
    // dataSets: [200, 400, 100, 50, 700, 750, 250]
  },
  moduleMetadata: modules
}));
