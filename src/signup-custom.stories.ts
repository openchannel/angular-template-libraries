import {componentWrapperDecorator, Meta, moduleMetadata, Story} from '@storybook/angular';
import {OcCommonLibModule} from '@openchannel/angular-common-components/src/lib/common-components';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Component, Input, TemplateRef} from '@angular/core';
import {
    OcAuthComponentsModule,
    OcEditUserFormConfig,
    TypeFieldModel,
    TypeModel
} from '@openchannel/angular-common-components/src/lib/auth-components';

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
                [customTermsDescription]="enableCustomTerms ? customTerms: null">
            </oc-signup-custom>
            <ng-template #customTerms let-ctx>
                <div class="edit-user-form__consent__label">
                    Custom <a href="">Terms</a>
                </div>
                <oc-checkbox class="edit-user-form__consent-checkbox" style='border: red;' [formControl]="ctx.termsControl"></oc-checkbox>
            </ng-template>
        </div>`
})
export class CustomSignUpStoryComponent {
  @Input() loginUrl: string;
  @Input() signupUrl: string;
  @Input() activationUrl: string;
  @Input() termsUrl: string;
  @Input() policyUrl: string;
  @Input() companyLogoUrl: string;
  @Input() process: boolean;
  @Input() forgotPasswordDoneUrl: string;
  @Input() showSignupFeedbackPage: boolean;
  @Input() formConfigsLoading = true;
  @Input() formConfigs: OcEditUserFormConfig[];
  @Input() defaultTypeLabelText = 'Type';
  @Input() customTermsDescription: TemplateRef<any>;
  @Input() enableCustomTerms: boolean = false;

  constructor() {
  }
}

export default {
  title: 'User signup custom [BEM]',
  component: CustomSignUpStoryComponent,
  decorators: [
    moduleMetadata({
      declarations: [CustomSignUpStoryComponent],
      imports: [CommonModule, OcCommonLibModule, RouterTestingModule, ReactiveFormsModule, OcAuthComponentsModule],
    }),
    componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ],
  excludeStories: /.*StoryComponent$/
} as Meta;

const Template: Story<CustomSignUpStoryComponent> = args => ({
  props: {
    ...args
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
        fieldsOrder: ['email', 'name']
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
  enableCustomTerms: true
};

export const ResultPage = Template.bind({});
ResultPage.args = {
  loginUrl: 'login',
  companyLogoUrl: './assets/angular-common-components/logo-company.png',
  showSignupFeedbackPage: true,
  forgotPasswordDoneUrl: './assets/angular-common-components/email_done.svg',
};
