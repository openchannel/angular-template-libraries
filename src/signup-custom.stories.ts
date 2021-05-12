import { moduleMetadata } from '@storybook/angular';
import {
    OcAuthComponentsModule,
    OcEditUserFormConfig,
    OCOrganization,
    OcSignupCustomComponent,
    TypeFieldModel,
    TypeModel,
} from 'oc-ng-common-component/src/lib/auth-components';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { action } from '@storybook/addon-actions';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, RouterTestingModule, ReactiveFormsModule, OcAuthComponentsModule],
};

export default {
    title: 'User signup custom [BEM]',
    component: OcSignupCustomComponent,
    decorators: [moduleMetadata(modules)],
};

const SignupCustomComponent = (args: OcSignupCustomComponent) => ({
    component: OcSignupCustomComponent,
    moduleMetadata: modules,
    props: args,
});

const accountTypeData: TypeModel<TypeFieldModel> = {
    fields: [
        {
            id: 'name',
            type: 'text',
            label: 'Name',
            attributes: {
                required: true,
            },
        },
        {
            id: 'email',
            type: 'text',
            label: 'Email',
            attributes: {
                required: true,
            },
        },
        {
            id: 'about-me',
            type: 'text',
            attributes: {
                required: true,
            },
            label: 'About me',
        },
    ],
};

const organizationTypeData: TypeModel<TypeFieldModel> = {
    fields: [
        {
            id: 'customData.company',
            type: 'text',
            label: 'Company',
            attributes: {
                required: true,
            },
        },
        {
            id: 'customData.country',
            type: 'text',
            label: 'Country',
            attributes: {
                required: true,
            },
        },
    ],
};

const multiConfigs: OcEditUserFormConfig[] = [
    {
        name: 'First Form',
        account: {
            includeFields: ['name', 'email'],
            typeData: accountTypeData,
            type: 'first-account-form',
        },
        organization: {
            includeFields: ['customData.organization'],
            typeData: organizationTypeData,
            type: 'first-organization-form',
        },
    },
    {
        name: 'Second Form',
        account: {
            includeFields: ['name', 'email', 'about-me'],
            typeData: accountTypeData,
            type: 'second-account-form',
        },
        organization: {
            includeFields: ['customData.organization', 'customData.country'],
            typeData: organizationTypeData,
            type: 'second-organization-form',
        },
    },
];

export const LoadingConfigs = SignupCustomComponent.bind({});
LoadingConfigs.args = {
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
    formConfigs: null,
};

export const WithoutConfigs = SignupCustomComponent.bind({});
WithoutConfigs.args = {
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
    formConfigsLoading: false,
    formConfigs: [],
};

export const MultiConfigs = SignupCustomComponent.bind({});
MultiConfigs.args = {
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
    formConfigsLoading: false,
    formConfigs: multiConfigs,
};

export const OneConfig = SignupCustomComponent.bind({});
OneConfig.args = {
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
    formConfigsLoading: false,
    formConfigs: [multiConfigs[0]],
};

export const ResultPage = SignupCustomComponent.bind({});
ResultPage.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/oc-ng-common-component/logo-company.png',
    showSignupFeedbackPage: true,
    forgotPasswordDoneUrl: './assets/oc-ng-common-component/email_done.svg',
};
