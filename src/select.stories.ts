import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcSelectComponent, OcSelectExpandableComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';

const selectValArr = ['Assembly', 'Communication'];
storiesOf('Select', module)
    .addDecorator(withA11y)
    .add('Normal Select', () => ({
        component: OcSelectComponent,
        props:{
            defaultBlankValue:'Select Category',
            selectValArr: selectValArr
        }
    })).add('expandable Select', () => ({
        component: OcSelectExpandableComponent

    }));