import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcSignupComponent, OcLoginComponent, OcForgotPasswordComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';
import { SignUp, Login } from 'oc-ng-common-service';
import { action } from '@storybook/addon-actions';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};

let signupEmpty = new SignUp();

let signupFilled = new SignUp();
signupFilled.uname = "zinal";
signupFilled.company = "Tenup"
signupFilled.email = "zmehta@gmail.com"
signupFilled.password = "Tenup123#"
signupFilled.isChecked = true;


storiesOf('Signup', module)
    .addDecorator(withA11y)
    .add('Empty', () => ({
        component: OcSignupComponent,
        props: {
            signupModel: signupEmpty,
            submit: action('clicked event'),
            loginUrl: "login"
        },
        moduleMetadata: modules
    })).add('With Errors', () => ({
        component: OcSignupComponent,
        props: {
            signupModel: signupEmpty,
            submit: action('clicked event'),
            loginUrl: "login"
        },
        moduleMetadata: modules
    })).add('Filled', () => ({

        component: OcSignupComponent,

        props: {
            signupModel: signupFilled,
            submit: action('clicked event'),
            loginUrl: "login"
        },
        moduleMetadata: modules
    }));