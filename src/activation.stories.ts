import {storiesOf} from '@storybook/angular';
import {
  OcActivationComponent,
  OcCommonLibModule
} from 'projects/oc-ng-common-component/src/public-api';
import {SellerActivation} from 'oc-ng-common-service';
import {withA11y} from '@storybook/addon-a11y';
import {action} from '@storybook/addon-actions';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

let activationEmpty = new SellerActivation();

let activationFilled = new SellerActivation();
activationFilled.email = "zmehta@gmail.com"
activationFilled.password = "Tenup123#"
activationFilled.code = "2202"


storiesOf('SellerActivation', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcActivationComponent,
  })
  .add('Empty', () => ({
    component: OcActivationComponent,
    props: {
      activationModel: activationEmpty,
      submit: action('clicked event'),
      signupUrl: "signup",
      companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
    },
    moduleMetadata: modules
  })).add('With Errors', () => ({
  component: OcActivationComponent,
  props: {
    activationModel: activationEmpty,
    submit: action('clicked event'),
    signupUrl: "signup",
    companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
  },
  moduleMetadata: modules
})).add('Filled', () => ({
  component: OcActivationComponent,
  props: {
    activationModel: activationEmpty,
    submit: action('clicked event'),
    signupUrl: "signup",
    companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
  },
  moduleMetadata: modules
}));
