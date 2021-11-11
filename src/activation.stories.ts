import { Meta, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { ComponentsUserActivationModel, OcActivationComponent } from '@openchannel/angular-common-components/src/lib/auth-components';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { NgModule } from '@angular/core';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules: NgModule = {
    imports: [OcCommonLibModule, RouterTestingModule, FormsModule],
    providers: [ERROR_MESSAGES_STORY_PROVIDER],
};

const activationEmpty = new ComponentsUserActivationModel();

const activationFilled = new ComponentsUserActivationModel();
activationFilled.email = 'test@gmail.com';
activationFilled.password = 'Tenup123#';
activationFilled.code = '2202';

export default {
    title: 'User Activation [BEM]',
    component: OcActivationComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { buttonClick: action('Activation clicked') },
} as Meta;

const UserActivationComponent = (args: OcActivationComponent) => ({
    component: OcActivationComponent,
    moduleMetadata: modules,
    props: args,
});

export const Empty = UserActivationComponent.bind({});
Empty.args = {
    activationModel: activationEmpty,
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};

export const Filled = UserActivationComponent.bind({});
Filled.args = {
    activationModel: activationFilled,
    signupUrl: 'signup',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
};
