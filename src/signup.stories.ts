import { moduleMetadata } from '@storybook/angular';
import { ComponentsUserRegistrationModel, OcSignupComponent } from '@openchannel/angular-common-components/src/lib/auth-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { action } from '@storybook/addon-actions';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, RouterTestingModule, FormsModule],
};

const signupEmpty = new ComponentsUserRegistrationModel();

const signupFilled: ComponentsUserRegistrationModel = {
    uname: 'User name',
    company: 'test company',
    email: 'test@gmail.com',
    password: 'Gfhjkm123!@',
    isChecked: true,
};

export default {
    title: 'User signup [BEM]',
    component: OcSignupComponent,
    decorators: [moduleMetadata(modules)],
};

const SignupComponent = (args: OcSignupComponent) => ({
    component: OcSignupComponent,
    moduleMetadata: modules,
    props: args,
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
    companyLogoUrl: './assets/angular-common-components/logo-company.png',
    showSignupFeedbackPage: true,
    forgotPasswordDoneUrl: './assets/angular-common-components/email_done.svg',
};
