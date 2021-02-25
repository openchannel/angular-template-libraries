import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule, OcSignupComponent} from 'projects/oc-ng-common-component/src/public-api';
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
    submit: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
};

export const Filled = SignupComponent.bind({});
Filled.args = {
    signupModel: signupFilled,
    submit: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
};

export const ResultPage = SignupComponent.bind({});
ResultPage.args = {
    signupModel: signupFilled,
    submit: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: './assets/img/logo-company.png',
    showSignupFeedbackPage: true,
    forgotPasswordDoneUrl: './assets/img/email_done.svg'
};
