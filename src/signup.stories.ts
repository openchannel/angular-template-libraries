import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcSignupComponent, OcLoginComponent, OcForgotPasswordComponent } from 'projects/oc-ng-common-component/src/public-api';
import { withA11y } from '@storybook/addon-a11y';
import { SellerSignup, Login } from 'oc-ng-common-service';
import { action } from '@storybook/addon-actions';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule]
};

let signupEmpty = new SellerSignup();

let signupFilled = new SellerSignup();
if(signupFilled.developerAccount){
    signupFilled.developerAccount.name = "zinal";
    signupFilled.developerAccount.email = "zmehta@gmail.com"
}
if(signupFilled.developer){
    signupFilled.developer.name = "Tenup"
}
if(signupFilled.extra){
    signupFilled.extra.password = "Tenup123#"
}
signupFilled.isChecked = true;


storiesOf('SellerSignup', module)
    .addDecorator(withA11y)
    .add('Empty', () => ({
        component: OcSignupComponent,
        props: {
            signupModel: signupEmpty,
            submit: action('clicked event'),
            loginUrl: "login",
            companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
        },
        moduleMetadata: modules
    })).add('With Errors', () => ({
        component: OcSignupComponent,
        props: {
            signupModel: signupEmpty,
            submit: action('clicked event'),
            loginUrl: "login",
            companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
        },
        moduleMetadata: modules
    })).add('Filled', () => ({

        component: OcSignupComponent,

        props: {
            signupModel: signupFilled,
            submit: action('clicked event'),
            loginUrl: "login",
            companyLogoUrl: "https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download"
        },
        moduleMetadata: modules
    }));