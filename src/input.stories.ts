import {storiesOf} from '@storybook/angular';
import {
    OcCheckboxComponent,
    OcCommonLibModule,
    OcInputComponent,
    OcTextSearchComponent,
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

storiesOf('Input', module)
    .addDecorator(withA11y)
    .addParameters({
        component: OcInputComponent,
    })
    .add('Text', () => ({
        component: OcInputComponent,
        props: {
            focus: true,
        },
        moduleMetadata: modules,
    })).add('Checkbox [BEM]', () => ({
        component: OcCheckboxComponent,
        props: {
            labelText: 'Custom Checkbox',
            requiredIndicator: true,
    },
    }));
