import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import {
    OcAuthComponentsModule,
    OcEditUserFormConfig,
    TypeFieldModel,
    TypeModel,
} from '@openchannel/angular-common-components/src/lib/auth-components';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

@Component({
    selector: 'custom-signup-story',
    template: `
        <div>
            <oc-signup-custom
                [loginUrl]="loginUrl"
                [signupUrl]="signupUrl"
                [activationUrl]="activationUrl"
                [termsUrl]="termsUrl"
                [policyUrl]="policyUrl"
                [companyLogoUrl]="companyLogoUrl"
                [process]="process"
                [forgotPasswordDoneUrl]="forgotPasswordDoneUrl"
                [showSignupFeedbackPage]="showSignupFeedbackPage"
                [formConfigsLoading]="formConfigsLoading"
                [formConfigs]="formConfigs"
                [defaultTypeLabelText]="defaultTypeLabelText"
                [customTermsDescription]="enableCustomTerms ? customTerms : null"
            ></oc-signup-custom>
            <ng-template #customTerms let-ctx>
                <div class="edit-user-form__consent__label">
                    Custom
                    <a href="">Terms</a>
                </div>
                <oc-checkbox class="edit-user-form__consent-checkbox" style="border: red;" [formControl]="ctx.termsControl"></oc-checkbox>
            </ng-template>
        </div>
    `,
})
export class CustomSignUpStoryComponent {
    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl: string;
    /**
     * Link to the Sign Up page.
     * ## Example
     * `"/sign-up"`
     */
    @Input() signupUrl: string;
    /**
     * Link to the Activate account page.
     * ## Example
     * `"/activation"`
     */
    @Input() activationUrl: string;
    /**
     * A url for users, which opens the terms of service.
     * @type {string}.
     */
    @Input() termsUrl: string;
    /**
     * A url for users, which opens the data processing policy.
     * @type {string}.
     */
    @Input() policyUrl: string;
    /**
     * A source path to company logo icon.
     * @type {string}.
     */
    @Input() companyLogoUrl: string;
    /**
     * Status of the signup process. If user clicked the Sign Up button - process will start, spinner will be shown on the button
     * and user can not interact with a signup button.
     */
    @Input() process: boolean;
    /**
     * A source path to the icon in a result message after the activation email had been sent to the inbox.
     * @type {boolean}.
     */
    @Input() forgotPasswordDoneUrl: string;
    /**
     * A variable which determines whether to show or hide signup feedback page.
     * @type {boolean}.
     */
    @Input() showSignupFeedbackPage: boolean;
    /**
     * Flag that showing that form for sign up is loading.
     */
    @Input() formConfigsLoading = true;
    /**
     * Config for the Custom Sign Up form.
     */
    @Input() formConfigs: OcEditUserFormConfig[];
    /**
     * Default text for the type label.
     */
    @Input() defaultTypeLabelText = 'Type';
    /**
     * Custom template for the checkbox with privacy and terms.
     */
    @Input() customTermsDescription: TemplateRef<any>;
    @Input() enableCustomTerms: boolean = false;
}

export default {
    title: 'User signup custom [BEM]',
    component: CustomSignUpStoryComponent,
    decorators: [
        moduleMetadata({
            declarations: [CustomSignUpStoryComponent],
            imports: [CommonModule, OcCommonLibModule, RouterTestingModule, ReactiveFormsModule, OcAuthComponentsModule],
            providers: [ERROR_MESSAGES_STORY_PROVIDER],
        }),
        componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
    ],
    excludeStories: /.*StoryComponent$/,
} as Meta;

const Template: Story<CustomSignUpStoryComponent> = args => ({
    props: {
        ...args,
    },
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

export const LoadingConfigs = Template.bind({});
LoadingConfigs.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    formConfigs: null,
};

export const WithoutConfigs = Template.bind({});
WithoutConfigs.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    formConfigsLoading: false,
    formConfigs: [],
};

export const MultiConfigs = Template.bind({});
MultiConfigs.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    formConfigsLoading: false,
    formConfigs: multiConfigs,
};

export const OneConfig = Template.bind({});
OneConfig.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    formConfigsLoading: false,
    formConfigs: [multiConfigs[0]],
};

export const CustomTermsConfig = Template.bind({});
CustomTermsConfig.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    formConfigsLoading: false,
    formConfigs: [multiConfigs[0]],
    enableCustomTerms: true,
};

export const ResultPage = Template.bind({});
ResultPage.args = {
    loginUrl: 'login',
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    showSignupFeedbackPage: true,
    forgotPasswordDoneUrl: './assets/angular-common-components/email_done.svg',
};
