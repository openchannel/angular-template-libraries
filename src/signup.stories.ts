import {storiesOf} from '@storybook/angular';
import {OcCommonLibModule, OcSignupComponent} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';
import {SellerSignup} from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';
import {RouterTestingModule} from '@angular/router/testing';

const modules = {
    imports: [OcCommonLibModule, RouterTestingModule],
};

const signupEmpty = new SellerSignup();

const signupFilled: SellerSignup = {
    uname: 'User name',
    company: 'test company',
    email: 'test@gmail.com',
    password: 'Gfhjkm123!@',
    isChecked: true,
};

storiesOf('User signup', module)
    .addDecorator(withA11y)
    .addParameters({
        component: OcSignupComponent,
    })
    .add('Empty', () => ({
        component: OcSignupComponent,
        props: {
            signupModel: signupEmpty,
            submit: action('clicked event'),
            loginUrl: 'login',
            companyLogoUrl: './assets/img/company_logo.svg',
        },
        moduleMetadata: modules,
    })).add('Filled', () => ({
    component: OcSignupComponent,
    props: {
        signupModel: signupFilled,
        submit: action('clicked event'),
        loginUrl: 'login',
        companyLogoUrl: './assets/img/company_logo.svg',
    },
    moduleMetadata: modules,
}));
