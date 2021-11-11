import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { RouterTestingModule } from '@angular/router/testing';
import {
    OcEditUserFormComponent,
    OcEditUserFormConfig,
    OCOrganization,
    OcFormComponentsModule,
    AppFormModel,
} from '@openchannel/angular-common-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { NgModule } from '@angular/core';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

const modules: NgModule = {
    imports: [OcCommonLibModule, OcFormComponentsModule, ReactiveFormsModule, RouterTestingModule, FormsModule],
    providers: [ERROR_MESSAGES_STORY_PROVIDER],
};

const accountTypeData: AppFormModel = {
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

const organizationTypeData: AppFormModel = {
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
        fieldsOrder: ['email', 'name'],
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

const accountData: OCOrganization = {
    name: 'James Bond',
    email: 'test@test.test',
};

const organizationData: OCOrganization = {
    email: null,
    customData: {
        company: 'Test Company',
    },
};

export default {
    title: 'Edit user (organization & account) [BEM]',
    component: OcEditUserFormComponent,
    decorators: [moduleMetadata(modules)],
};

const EditUserFormComponent = (args: OcEditUserFormComponent) => ({
    component: OcEditUserFormComponent,
    moduleMetadata: modules,
    props: args,
});

export const WithoutConfigs = EditUserFormComponent.bind({});
WithoutConfigs.args = {
    formConfigs: null,
    defaultAccountData: accountData,
    defaultOrganizationData: organizationData,
    resultFormData: action('resultFormData'),
};

export const ChangeType = EditUserFormComponent.bind({});
ChangeType.args = {
    formConfigs: multiConfigs,
    enableTypesDropdown: true,
    defaultAccountData: accountData,
    defaultOrganizationData: organizationData,
    resultFormData: action('resultFormData'),
};

export const DisabledChangeType = EditUserFormComponent.bind({});
DisabledChangeType.args = {
    formConfigs: multiConfigs,
    enableTypesDropdown: false,
    defaultAccountData: accountData,
    defaultOrganizationData: organizationData,
    resultFormData: action('resultFormData'),
};

export const PasswordAndCheckboxFields = EditUserFormComponent.bind({});
PasswordAndCheckboxFields.args = {
    formConfigs: multiConfigs,
    enableTypesDropdown: false,
    enableTermsCheckbox: {
        termsUrl: 'http://terms',
        policyUrl: 'http://policy',
    },
    enablePasswordField: true,
    defaultAccountData: accountData,
    defaultOrganizationData: organizationData,
    resultFormData: action('resultFormData'),
};
