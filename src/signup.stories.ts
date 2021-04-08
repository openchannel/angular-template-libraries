import {moduleMetadata} from '@storybook/angular';
import {OcSignupComponent} from 'oc-ng-common-component/src/lib/auth-components';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import {UserRegistrationModel} from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';
import {RouterTestingModule} from '@angular/router/testing';

const modules = {
    imports: [OcCommonLibModule, RouterTestingModule],
};

const signupEmpty = new UserRegistrationModel();

const signupFilled: UserRegistrationModel = {
    uname: 'User name',
    company: 'test company',
    email: 'test@gmail.com',
    password: 'Gfhjkm123!@',
    isChecked: true,
};

export default {
    title: 'User signup [BEM]',
    component: OcSignupComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const SignupComponent = (args: OcSignupComponent) => ({
    component: OcSignupComponent,
    moduleMetadata: modules,
    props: args
});

export const Empty = SignupComponent.bind({});
Empty.args = {
    signupModel: signupEmpty,
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
};

export const Filled = SignupComponent.bind({});
Filled.args = {
    signupModel: signupFilled,
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
};

export const ResultPage = SignupComponent.bind({});
ResultPage.args = {
    signupModel: signupFilled,
    submitClick: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/oc-ng-common-component/logo-company.png',
    showSignupFeedbackPage: true,
    forgotPasswordDoneUrl: './assets/oc-ng-common-component/email_done.svg'
};
