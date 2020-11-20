import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule, OcLoginComponent} from 'projects/oc-ng-common-component/src/public-api';
import {action} from '@storybook/addon-actions';
import {SellerSignin} from 'oc-ng-common-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, BrowserAnimationsModule, RouterTestingModule]
};

const loginEmpty = new SellerSignin();

const loginFilled = new SellerSignin();
loginFilled.email = 'zmehta@gmail.com';
loginFilled.password = 'Tenup123#';
loginFilled.grant_type = 'password';
loginFilled.isChecked = true;

export default {
  title: 'Login',
  component: OcLoginComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const LoginComponent = (args: OcLoginComponent) => ({
  component: OcLoginComponent,
  moduleMetadata: modules,
  props: args
});

const defaultProps = {
  submit: action('clicked event'),
  forgotPwdUrl: 'forgotPwd',
  signupUrl: 'signup',
  loginModelChange: action('model changed'),
};

export const EmptyLogin = LoginComponent.bind({});
EmptyLogin.args = {
  ...defaultProps,
  loginModel: loginEmpty,
};

export const FilledLogin = LoginComponent.bind({});
FilledLogin.args = {
  ...defaultProps,
  loginModel: loginFilled,
};
