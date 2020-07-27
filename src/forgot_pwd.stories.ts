import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcForgotPasswordComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';
import { Login } from 'oc-ng-common-service';
import { action } from '@storybook/addon-actions';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};

let pwdEmpty = new Login();

let pwdFilled = new Login();
pwdFilled.email = "zmehta@tenupsoft.com"
console.log(pwdFilled);

storiesOf('Forgot Password', module)
    .addDecorator(withA11y)
    .add('Empty', () => ({
        component: OcForgotPasswordComponent,
        props: {
            loginModel: pwdEmpty,
            submit: action('clicked event'),
            loginUrl: "login",
            signupUrl: "signup"
        },
        moduleMetadata: modules
    })).add('With Errors', () => ({
        component: OcForgotPasswordComponent,
        props: {
            loginModel: pwdEmpty,
            submit: action('clicked event'),
            loginUrl: "login",
            signupUrl: "signup"
        },
        moduleMetadata: modules
    })).add('Filled', () => ({
        component: OcForgotPasswordComponent,
        props: {
            loginModel: pwdFilled,
            submit: action('clicked event'),
            loginUrl: "login",
            signupUrl: "signup"
        },
        moduleMetadata: modules
    }));