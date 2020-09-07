import {storiesOf} from '@storybook/angular';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcLoginComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';
import {action} from '@storybook/addon-actions';
import {SellerSignin} from 'oc-ng-common-service';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

let loginEmpty = new SellerSignin();

let loginfilled = new SellerSignin();
loginfilled.email = "zmehta@gmail.com"
loginfilled.password = "Tenup123#"
loginfilled.grant_type = "password"
loginfilled.isChecked = true;

storiesOf('Login', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcLoginComponent,
  })
  .add('Empty', () => ({
    component: OcLoginComponent,
    props: {
      loginModel: loginEmpty,
      submit: action('clicked event'),
      forgotPwdUrl: "forgotPwd",
      signupUrl: 'signup'
    },
    moduleMetadata: modules
  })).add('With Errors', () => ({
  component: OcLoginComponent,
  props: {
    loginModel: loginEmpty,
    submit: action('clicked event'),
    forgotPwdUrl: "forgotPwd",
    signupUrl: 'signup'
  },
  moduleMetadata: modules
})).add('Filled', () => ({

  component: OcLoginComponent,

  props: {
    loginModel: loginfilled,
    submit: action('clicked event'),
    forgotPwdUrl: "forgotPwd",
    signupUrl: 'signup'
  },
  moduleMetadata: modules
}));
