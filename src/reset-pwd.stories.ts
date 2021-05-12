import { moduleMetadata } from '@storybook/angular';
import {
    ComponentsUserResetPassword,
    OcCommonLibModule,
    OcResetPasswordComponent,
} from 'projects/angular-common-components/src/public-api';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { FormsModule } from '@angular/forms';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule, FormsModule],
};

const pwdEmpty = new ComponentsUserResetPassword();
const pwdFilled = new ComponentsUserResetPassword();
pwdFilled.newPassword = 'testpassword';
pwdFilled.code = 'fg45ghJH34';

export default {
    title: 'Reset Password [BEM]',
    component: OcResetPasswordComponent,
    decorators: [moduleMetadata(modules)],
};

const ResetPasswordComponent = (args: OcResetPasswordComponent) => ({
    component: OcResetPasswordComponent,
    moduleMetadata: modules,
    props: args,
});

export const Empty = ResetPasswordComponent.bind({});
Empty.args = {
    resetModel: pwdEmpty,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/img/logo-company.png',
    submit: action('submit'),
};

export const Filled = ResetPasswordComponent.bind({});
Filled.args = {
    resetModel: pwdFilled,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/img/logo-company.png',
    submit: action('submit'),
};
