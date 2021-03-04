import {storiesOf} from '@storybook/angular';
import {OcActivationComponent, OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {UserActivationModel} from 'oc-ng-common-service';
import {withA11y} from '@storybook/addon-a11y';
import {action} from '@storybook/addon-actions';
import {RouterTestingModule} from '@angular/router/testing';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, RouterTestingModule]
};

const activationEmpty = new UserActivationModel();

const activationFilled = new UserActivationModel();
activationFilled.email = 'test@gmail.com';
activationFilled.password = 'Tenup123#';
activationFilled.code = '2202';


storiesOf('User Activation [BEM]', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcActivationComponent,
  })
  .add('Empty', () => ({
    component: OcActivationComponent,
    props: {
      activationModel: activationEmpty,
      submit: action('clicked event'),
      signupUrl: 'signup',
      companyLogoUrl: './assets/img/logo-company.png',
    },
    moduleMetadata: modules
  })).add('Filled', () => ({
    component: OcActivationComponent,
    props: {
      activationModel: activationFilled,
      submit: action('clicked event'),
      signupUrl: 'signup',
      companyLogoUrl: './assets/img/logo-company.png',
    },
  moduleMetadata: modules
}));
