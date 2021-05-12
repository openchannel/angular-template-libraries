import { storiesOf } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { ComponentsUserActivationModel, OcActivationComponent } from '@openchannel/angular-common-components/src/lib/auth-components';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { RouterTestingModule } from '@angular/router/testing';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule, RouterTestingModule],
};

const activationEmpty = new ComponentsUserActivationModel();

const activationFilled = new ComponentsUserActivationModel();
activationFilled.email = 'test@gmail.com';
activationFilled.password = 'Tenup123#';
activationFilled.code = '2202';

storiesOf('User Activation [BEM]', module)
    .addDecorator(withA11y)
    .addParameters({
        component: OcActivationComponent,
    })
    .add('Empty', () => ({
        component: OcActivationComponent,
        props: {
            activationModel: activationEmpty,
            submit: action('clicked event'),
            signupUrl: 'signup',
      companyLogoUrl: './assets/angular-common-components/logo-company.png',
        },
        moduleMetadata: modules,
    }))
    .add('Filled', () => ({
        component: OcActivationComponent,
        props: {
            activationModel: activationFilled,
            submit: action('clicked event'),
            signupUrl: 'signup',
      companyLogoUrl: './assets/angular-common-components/logo-company.png',
        },
        moduleMetadata: modules,
    }));
