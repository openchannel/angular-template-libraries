import { moduleMetadata } from '@storybook/angular';
import {
    ComponentsUserActivationModel,
    OcCommonLibModule,
    OcResendActivationComponent,
} from 'projects/angular-common-components/src/public-api';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule, FormsModule],
};

const activationEmpty = new ComponentsUserActivationModel();
const activationFilled = new ComponentsUserActivationModel();
activationFilled.email = 'zmehta@tenupsoft.com';
activationFilled.code = 'fj45GHd34g';
activationFilled.password = 'testpassword';

export default {
    title: 'Resend Activation Code [BEM]',
    component: OcResendActivationComponent,
    decorators: [moduleMetadata(modules)],
};

const ForgotPasswordComponent = (args: OcResendActivationComponent) => ({
    component: OcResendActivationComponent,
    moduleMetadata: modules,
    props: args,
});

export const Empty = ForgotPasswordComponent.bind({});
Empty.args = {
    activationModel: activationEmpty,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};

export const Filled = ForgotPasswordComponent.bind({});
Filled.args = {
    activationModel: activationFilled,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};
