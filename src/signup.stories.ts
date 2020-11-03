import {storiesOf} from '@storybook/angular';
import {
  DialogService,
  OcCommonLibModule,
  OcSignupComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';
import {SellerSignup} from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
class RouterStub {
  constructor() {
  }

  navigateByUrl(url: string) {

  }
}

const modules = {
  imports: [OcCommonLibModule, NgbModule],
  providers: [DialogService, NgbModal, {
    provide: Router,
    useClass: RouterStub,
  }]
};

const signupEmpty = new SellerSignup();

const signupFilled = new SellerSignup();
signupFilled.uname = 'zinal';
signupFilled.company = 'Tenup';
signupFilled.email = 'zmehta@gmail.com';
signupFilled.password = 'Tenup123#';

storiesOf('SellerSignup', module)
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
      companyLogoUrl: 'https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download',
      title: 'Seller Agreement',
      type: 'secondary',
      closeButtonText: 'Close',
      // confirmButtonText: 'Confirm',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis turpis maximus, efficitur mi non, convallis lectus. Vestibulum aliquam pellentesque tempor. Sed molestie ligula diam, a rhoncus ipsum sollicitudin feugiat. Sed tempor vulputate arcu a eleifend. Maecenas hendrerit sit amet tellus sed blandit. Nunc vestibulum risus leo, vel mollis massa fringilla eu. Aliquam porttitor urna dignissim sapien facilisis sollicitudin. Cras euismod orci arcu, et varius elit interdum et. Mauris aliquam mi ligula, ac egestas nisi faucibus et. Phasellus ultrices accumsan elit eget viverra. Vestibulum hendrerit lorem eu nunc lacinia, eget iaculis augue cursus. Praesent aliquet facilisis mollis. Duis ullamcorper felis eget tempus sagittis. Praesent ac tellus rutrum, lobortis urna sit amet, finibus augue. Maecenas vel augue Phasellus et enim tristique, ornare turpis nec, consectetur sapien. Donec libero nisl, scelerisque id aliquam nec, bibendum non magna. Maecenas vitae tincidunt libero. Pellentesque eget nisi eu ex tempus hendrerit et eu est. Quisque elementum mattis ligula sed blandit. Morbi quam lorem, tincidunt id massa non, tristique vehicula mauris. Phasellus lacinia accumsan velit, eu pellentesque tortor mollis a. Integer consequat gravida eros, vitae suscipit quam convallis sit amet. Maecenas feugiat eu mi sit amet consequat. Nullam sit amet diam finibus, sagittis tortor et, pellentesque nulla. Donec nec dictum leo. Sed vitae ipsum ultricies, molestie risus eu, iaculis orci. Aliquam et magna venenatis, commodo diam quis, ultricies dolor. Maecenas commodo at velit vitae ultrices.Curabitur a augue erat. Nunc egestas viverra dolor, vel faucibus nisl ultricies dapibus. Nulla facilisi. Donec sed sapien non libero vestibulum pharetra sed non nisi. Cras at nibh sed nulla tempor ultricies. Nam vestibulum suscipit vulputate. Nullam sed magna ac lectus consequat scelerisque. Pellentesque commodo est augue, in rhoncus nibh rhoncus sollicitudin. Vivamus tincidunt ex at arcu vehicula, non fermentum ex molestie. Aliquam fermentum, eros sit amet finibus facilisis, magna felis finibus mi, at lacinia sem odio sed elit. Nulla facilisi. Vivamus in varius nunc. Nam mattis mi sed tristique tristique. Nam eu elit ornare, vulputate odio at, ultrices leo. Quisque eu elit sit amet nibh vehicula molestie quis id arcu. Nunc blandit, magna sed placerat malesuada, elit ante commodo augue, ac lobortis arcu nunc eu purus. Mauris gravida egestas est vel dapibus. Nunc hendrerit, nisl sit amet vulputate lacinia, justo quam commodo ligula, ut tempor leo ante eget lectus. Nulla ullamcorper diam augue. Etiam et lectus id ex ultrices ullamcorper vitae dapibus velit. Praesent ultricies nibh in sollicitudin consequat. Donec rutrum accumsan lacus ornare rhoncus.',
      // informationalText:'You can keep the changes as draft',
      textVariable: '',
      // showSignupFeedbackPage: true,
    },
    moduleMetadata: modules
  })).add('With Errors', () => ({
  component: OcSignupComponent,
  props: {
    signupModel: signupEmpty,
    submit: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: 'https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download',
    title: 'Seller Agreement',
    type: 'secondary',
    closeButtonText: 'Close',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis turpis maximus, efficitur mi non, convallis lectus. Vestibulum aliquam pellentesque tempor. Sed molestie ligula diam, a rhoncus ipsum sollicitudin feugiat. Sed tempor vulputate arcu a eleifend. Maecenas hendrerit sit amet tellus sed blandit. Nunc vestibulum risus leo, vel mollis massa fringilla eu. Aliquam porttitor urna dignissim sapien facilisis sollicitudin. Cras euismod orci arcu, et varius elit interdum et. Mauris aliquam mi ligula, ac egestas nisi faucibus et. Phasellus ultrices accumsan elit eget viverra. Vestibulum hendrerit lorem eu nunc lacinia, eget iaculis augue cursus. Praesent aliquet facilisis mollis. Duis ullamcorper felis eget tempus sagittis. Praesent ac tellus rutrum, lobortis urna sit amet, finibus augue. Maecenas vel augue Phasellus et enim tristique, ornare turpis nec, consectetur sapien. Donec libero nisl, scelerisque id aliquam nec, bibendum non magna. Maecenas vitae tincidunt libero. Pellentesque eget nisi eu ex tempus hendrerit et eu est. Quisque elementum mattis ligula sed blandit. Morbi quam lorem, tincidunt id massa non, tristique vehicula mauris. Phasellus lacinia accumsan velit, eu pellentesque tortor mollis a. Integer consequat gravida eros, vitae suscipit quam convallis sit amet. Maecenas feugiat eu mi sit amet consequat. Nullam sit amet diam finibus, sagittis tortor et, pellentesque nulla. Donec nec dictum leo. Sed vitae ipsum ultricies, molestie risus eu, iaculis orci. Aliquam et magna venenatis, commodo diam quis, ultricies dolor. Maecenas commodo at velit vitae ultrices.Curabitur a augue erat. Nunc egestas viverra dolor, vel faucibus nisl ultricies dapibus. Nulla facilisi. Donec sed sapien non libero vestibulum pharetra sed non nisi. Cras at nibh sed nulla tempor ultricies. Nam vestibulum suscipit vulputate. Nullam sed magna ac lectus consequat scelerisque. Pellentesque commodo est augue, in rhoncus nibh rhoncus sollicitudin. Vivamus tincidunt ex at arcu vehicula, non fermentum ex molestie. Aliquam fermentum, eros sit amet finibus facilisis, magna felis finibus mi, at lacinia sem odio sed elit. Nulla facilisi. Vivamus in varius nunc. Nam mattis mi sed tristique tristique. Nam eu elit ornare, vulputate odio at, ultrices leo. Quisque eu elit sit amet nibh vehicula molestie quis id arcu. Nunc blandit, magna sed placerat malesuada, elit ante commodo augue, ac lobortis arcu nunc eu purus. Mauris gravida egestas est vel dapibus. Nunc hendrerit, nisl sit amet vulputate lacinia, justo quam commodo ligula, ut tempor leo ante eget lectus. Nulla ullamcorper diam augue. Etiam et lectus id ex ultrices ullamcorper vitae dapibus velit. Praesent ultricies nibh in sollicitudin consequat. Donec rutrum accumsan lacus ornare rhoncus.',
    textVariable: ''
  },
  moduleMetadata: modules
})).add('Filled', () => ({

  component: OcSignupComponent,

  props: {
    signupModel: signupFilled,
    submit: action('clicked event'),
    loginUrl: 'login',
    companyLogoUrl: 'https://drive.google.com/u/0/uc?id=12raSQ51BZQqMVy_ZVgXk71xHS6a6pb1e&export=download',
    title: 'Seller Agreement',
    type: 'secondary',
    closeButtonText: 'Close',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis turpis maximus, efficitur mi non, convallis lectus. Vestibulum aliquam pellentesque tempor. Sed molestie ligula diam, a rhoncus ipsum sollicitudin feugiat. Sed tempor vulputate arcu a eleifend. Maecenas hendrerit sit amet tellus sed blandit. Nunc vestibulum risus leo, vel mollis massa fringilla eu. Aliquam porttitor urna dignissim sapien facilisis sollicitudin. Cras euismod orci arcu, et varius elit interdum et. Mauris aliquam mi ligula, ac egestas nisi faucibus et. Phasellus ultrices accumsan elit eget viverra. Vestibulum hendrerit lorem eu nunc lacinia, eget iaculis augue cursus. Praesent aliquet facilisis mollis. Duis ullamcorper felis eget tempus sagittis. Praesent ac tellus rutrum, lobortis urna sit amet, finibus augue. Maecenas vel augue Phasellus et enim tristique, ornare turpis nec, consectetur sapien. Donec libero nisl, scelerisque id aliquam nec, bibendum non magna. Maecenas vitae tincidunt libero. Pellentesque eget nisi eu ex tempus hendrerit et eu est. Quisque elementum mattis ligula sed blandit. Morbi quam lorem, tincidunt id massa non, tristique vehicula mauris. Phasellus lacinia accumsan velit, eu pellentesque tortor mollis a. Integer consequat gravida eros, vitae suscipit quam convallis sit amet. Maecenas feugiat eu mi sit amet consequat. Nullam sit amet diam finibus, sagittis tortor et, pellentesque nulla. Donec nec dictum leo. Sed vitae ipsum ultricies, molestie risus eu, iaculis orci. Aliquam et magna venenatis, commodo diam quis, ultricies dolor. Maecenas commodo at velit vitae ultrices.Curabitur a augue erat. Nunc egestas viverra dolor, vel faucibus nisl ultricies dapibus. Nulla facilisi. Donec sed sapien non libero vestibulum pharetra sed non nisi. Cras at nibh sed nulla tempor ultricies. Nam vestibulum suscipit vulputate. Nullam sed magna ac lectus consequat scelerisque. Pellentesque commodo est augue, in rhoncus nibh rhoncus sollicitudin. Vivamus tincidunt ex at arcu vehicula, non fermentum ex molestie. Aliquam fermentum, eros sit amet finibus facilisis, magna felis finibus mi, at lacinia sem odio sed elit. Nulla facilisi. Vivamus in varius nunc. Nam mattis mi sed tristique tristique. Nam eu elit ornare, vulputate odio at, ultrices leo. Quisque eu elit sit amet nibh vehicula molestie quis id arcu. Nunc blandit, magna sed placerat malesuada, elit ante commodo augue, ac lobortis arcu nunc eu purus. Mauris gravida egestas est vel dapibus. Nunc hendrerit, nisl sit amet vulputate lacinia, justo quam commodo ligula, ut tempor leo ante eget lectus. Nulla ullamcorper diam augue. Etiam et lectus id ex ultrices ullamcorper vitae dapibus velit. Praesent ultricies nibh in sollicitudin consequat. Donec rutrum accumsan lacus ornare rhoncus.',
    textVariable: ''
  },
  moduleMetadata: modules
}));
