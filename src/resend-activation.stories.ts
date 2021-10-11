import { moduleMetadata } from '@storybook/angular';
import {
    ComponentsUserActivationModel,
    OcCommonLibModule,
    OcResendActivationComponent,
} from 'projects/angular-common-components/src/public-api';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { NgModule } from '@angular/core';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules: NgModule = {
    imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule, FormsModule],
    providers: [ERROR_MESSAGES_STORY_PROVIDER]
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
    argTypes: { buttonClick: action('Activation clicked') },
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
