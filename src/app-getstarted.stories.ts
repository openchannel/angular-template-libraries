import { storiesOf } from '@storybook/angular';
import { OcAppGetStartedComponent } from 'projects/oc-ng-common-component/src/lib/oc-app-get-started/oc-app-get-started.component';
import { action } from '@storybook/addon-actions';
import { OcCommonLibModule } from 'projects/oc-ng-common-component/src/public-api';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

storiesOf('Get Started', module)
  .add('Get Started Home Page', () => ({
    component: OcAppGetStartedComponent,
    moduleMetadata: modules,
    props: {
      getStartedImage: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png',
      getStartedHeader: 'List Your App in our App Store',
      getStartedDescription: 'Register as an app developer and submit your app easily with our App Store Developer Portal',
      getStartedButtonText: 'Get Started As An App Developer',
      getStartedType:'home',
      getStarted: action('clicked event')
    }
  })).add('Get Started Search Page', () => ({
    component: OcAppGetStartedComponent,
    moduleMetadata: modules,
    props: {
      getStartedImage: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png',
      getStartedHeader: 'List Your App in our App Store',
      getStartedButtonText: 'Get Started',
      getStartedType:'search',
      getStarted: action('clicked event')
    }
  }));

  
