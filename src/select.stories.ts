import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcSelectComponent, OcSelectExpandableComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';


storiesOf('Select', module)
    .addDecorator(withA11y)
    .add('Normal Select', () => ({
        component: OcSelectComponent
    })).add('expandable Select', () => ({
        component: OcSelectExpandableComponent

    }));