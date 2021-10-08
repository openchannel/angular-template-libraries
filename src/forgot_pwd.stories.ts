import { moduleMetadata } from '@storybook/angular';
import { ComponentsUserLoginModel, OcForgotPasswordComponent } from '@openchannel/angular-common-components/src/lib/auth-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { NgModule } from '@angular/core';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules: NgModule = {
    imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
    providers: [ERROR_MESSAGES_STORY_PROVIDER],
};

const pwdEmpty = new ComponentsUserLoginModel();
const pwdFilled = new ComponentsUserLoginModel();
pwdFilled.email = 'zmehta@tenupsoft.com';

export default {
    title: 'Forgot Password [BEM]',
    component: OcForgotPasswordComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { buttonClick: action('Activation clicked') },
};

const ForgotPasswordComponent = (args: OcForgotPasswordComponent) => ({
    component: OcForgotPasswordComponent,
    moduleMetadata: modules,
    props: args,
});

export const Empty = ForgotPasswordComponent.bind({});
Empty.args = {
    loginModel: pwdEmpty,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};

export const Filled = ForgotPasswordComponent.bind({});
Filled.args = {
    loginModel: pwdFilled,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};

export const ResultPage = ForgotPasswordComponent.bind({});
ResultPage.args = {
    loginModel: pwdFilled,
    loginUrl: 'login',
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    forgotPasswordDoneUrl: './assets/angular-common-components/email_done.svg',
    showResultPage: true,
};
