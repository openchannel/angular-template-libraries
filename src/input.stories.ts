import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcInputComponent, OcLabelComponent, OcCheckboxComponent, OcSignupComponent, OcTextSearhComponent, OcRadioComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};

storiesOf('Input', module)
    .addDecorator(withA11y)
    .add('Text', () => ({
        component: OcInputComponent,
        props: {
            focus: true
        },
        moduleMetadata: modules
    })).add('Radio', () => ({
        component: OcRadioComponent,

    })).add('Checkbox', () => ({
        component: OcCheckboxComponent,
        // props: {
        //     text: "Name"
        // }
    })).add('Text search', () => ({
        component: OcTextSearhComponent,
        // props: {
        //     text: "Name"
        // }
    }));