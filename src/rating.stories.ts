import { OcCommonLibModule, OcRatingComponent } from 'projects/oc-ng-common-component/src/public-api';
import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

const modules = {
    imports: [OcCommonLibModule]
};
storiesOf('Rating', module)
    .addDecorator(withA11y)
    .add('multi star', () => ({
        component: OcRatingComponent,
        moduleMetadata: modules,
        props: {
            type: "multi-star",
            rating: 4
        }
    })).add('signle star', () => ({
        component: OcRatingComponent,
        moduleMetadata: modules,
        props: {
            type: "single-star",
            rating: 4.5,
            reviewCount: 50
        }
    }));