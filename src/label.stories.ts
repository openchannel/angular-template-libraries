import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcInputComponent, OcLabelComponent, OcCheckboxComponent, OcSignupComponent,OcActivationComponent,OcForgotPasswordComponent,OcLoginComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};

storiesOf('Label', module)
    .addDecorator(withA11y)
    .add('Label', () => ({
        component: OcLabelComponent,
        props: {
            text: "Name"
        }
    }));