import {storiesOf} from '@storybook/angular';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcForgotPasswordComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';
import {action} from '@storybook/addon-actions';
import {SellerSignin} from 'oc-ng-common-service';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

let pwdEmpty = new SellerSignin();

let pwdFilled = new SellerSignin();
pwdFilled.email = "zmehta@tenupsoft.com"
console.log(pwdFilled);

storiesOf('Forgot Password', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcForgotPasswordComponent,
  })
  .add('Empty', () => ({
    component: OcForgotPasswordComponent,
    props: {
      loginModel: pwdEmpty,
      submit: action('clicked event'),
      loginUrl: "login",
      signupUrl: "signup"
    },
    moduleMetadata: modules
  })).add('With Errors', () => ({
  component: OcForgotPasswordComponent,
  props: {
    loginModel: pwdEmpty,
    submit: action('clicked event'),
    loginUrl: "login",
    signupUrl: "signup"
  },
  moduleMetadata: modules
})).add('Filled', () => ({
  component: OcForgotPasswordComponent,
  props: {
    loginModel: pwdFilled,
    submit: action('clicked event'),
    loginUrl: "login",
    signupUrl: "signup"
  },
  moduleMetadata: modules
}));
