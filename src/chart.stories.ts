import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcForgotPasswordComponent, OcChartComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};


storiesOf('Chart', module)
    .addDecorator(withA11y)
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
