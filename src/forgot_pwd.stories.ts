import { moduleMetadata } from '@storybook/angular';
import { OcForgotPasswordComponent } from 'oc-ng-common-component/src/lib/auth-components';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { UserLoginModel } from 'oc-ng-common-service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule]
};

const pwdEmpty = new UserLoginModel();
const pwdFilled = new UserLoginModel();
pwdFilled.email = 'zmehta@tenupsoft.com';

export default {
  title: 'Forgot Password',
  component: OcForgotPasswordComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const ForgotPasswordComponent = (args: OcForgotPasswordComponent) => ({
  component: OcForgotPasswordComponent,
  moduleMetadata: modules,
  props: args
});

export const Empty = ForgotPasswordComponent.bind({});
Empty.args = {
  loginModel: pwdEmpty,
  loginUrl: 'login',
  signupUrl: 'signup',
  companyLogoUrl: './assets/img/logo-company.png',
};

export const Filled = ForgotPasswordComponent.bind({});
Filled.args = {
  loginModel: pwdFilled,
  loginUrl: 'login',
  signupUrl: 'signup',
  companyLogoUrl: './assets/img/logo-company.png',
};

export const ResultPage = ForgotPasswordComponent.bind({});
ResultPage.args = {
  loginModel: pwdFilled,
  loginUrl: 'login',
  signupUrl: 'signup',
  companyLogoUrl: './assets/img/logo-company.png',
  showResultPage: true
};
