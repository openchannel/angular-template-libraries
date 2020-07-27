import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcCommonLibModule, OcMenuGridComponent } from 'projects/oc-ng-common-component/src/public-api';

const modules = {
    imports: [OcCommonLibModule]
};

// let application = new Applications();


storiesOf('App Data Grid', module)
    .addDecorator(withA11y)
    .add('App grid', () => ({
        component: OcMenuGridComponent,
        moduleMetadata: modules
    }));