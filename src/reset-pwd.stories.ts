import {moduleMetadata} from '@storybook/angular';
import {
  OcCommonLibModule,
  OcResetPasswordComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserResetPassword} from 'oc-ng-common-service';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule]
};

const pwdEmpty = new UserResetPassword();
const pwdFilled = new UserResetPassword();
pwdFilled.newPassword = 'testpassword';
pwdFilled.code = 'fg45ghJH34';

export default {
  title: 'Reset Password [BEM]',
  component: OcResetPasswordComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const ResetPasswordComponent = (args: OcResetPasswordComponent) => ({
  component: OcResetPasswordComponent,
  moduleMetadata: modules,
  props: args
});

export const Empty = ResetPasswordComponent.bind({});
Empty.args = {
  resetModel: pwdEmpty,
  loginUrl: 'login',
  signupUrl: 'signup',
  companyLogoUrl: './assets/img/logo-company.png',
};

export const Filled = ResetPasswordComponent.bind({});
Filled.args = {
  resetModel: pwdFilled,
  loginUrl: 'login',
  signupUrl: 'signup',
  companyLogoUrl: './assets/img/logo-company.png',
};
