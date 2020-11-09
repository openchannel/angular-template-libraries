import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppCategoriesComponent,
  OcAppGalleryComponent,
  OcCommonLibModule
} from 'projects/oc-ng-common-component/src/public-api';
import { BasicAppDetails, FullAppData } from 'oc-ng-common-service';
import { StatElement } from 'oc-ng-common-service/lib/model/app-data-model';

const modules = {
  imports: [OcCommonLibModule]
};

const stat: StatElement = {
  '90day': 10,
  '30day': 20,
  total: 20
};

const app: FullAppData = {
  appId: '34343jfgi3423',
  icon: '',
  name: 'Test App',
  model: [{
    type: 'recurring',
    price: 5,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
  rating: 4.2,
  reviewCount: 20,
  summary: 'Some test summary',
  lastUpdated: new Date(),
  version: 1.1,
  safeName: ['test-app'],
  developerId: '44555-3232gvdfdf',
  submittedDate: new Date(),
  created: new Date().getMonth() - 2,
  status: {
    value: '',
    lastUpdated: 1.1,
    modifiedBy: '',
    reason: ''
  },
  statistics: {
    views: stat,
    downloads: stat,
    developerSales: stat,
    totalSales: stat,
    ownerships: stat,
    reviews: stat
  },
  isLive: true
};

const app2 = new BasicAppDetails();
app2.appCardClass = 'col-md-12';
app2.appDescription = 'Integrate directly with your account and make customer updates a breeze';
app2.appLogoUrl = 'https://drive.google.com/u/0/uc?id=1vDDzbS--o_UIgXFE_LmMfVmSAKuprCyb&export=download';
app2.appName = 'Application';
app2.appPrice = '$11.99';
app2.rating = 0;
app2.reviewCount = 0;

const app3 = new BasicAppDetails();
app3.appCardClass = 'col-md-12';
app3.appDescription = 'With this plugin you can communicate with your teammates any time';
app3.appLogoUrl = 'https://drive.google.com/u/0/uc?id=1fWkPPXp3tmkYRBy-GtCm_9PkP7fmConE&export=download';
app3.appName = 'Plugin';
app3.appPrice = 'Free';
app3.rating = 3.5;
app3.reviewCount = 12;

const app4 = new BasicAppDetails();
app4.appCardClass = 'col-md-12';
app4.appDescription = 'Improve and extend your experience right from your own UI';
app4.appLogoUrl = 'https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download';
app4.appName = 'Integration';
app4.appPrice = '$4.99';
app4.rating = 4.9;
app4.reviewCount = 87;


storiesOf('App Galary', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcAppGalleryComponent,
  })
  .add('Recently Added Empty', () => ({
    component: OcAppGalleryComponent,
    moduleMetadata: modules,
    props: {
      appsArr: [],
      noAppMessage: 'No App Found',
      appGalleryTitle: 'Recently Added',
      appGalleryDescription: 'The latest apps that help you team work and build faster'
    }
  })).add('Recently Added Some', () => ({
  component: OcAppGalleryComponent,
  moduleMetadata: modules,
  props: {
    appsArr: [app1, app2, app3],
    noAppMessage: 'No App Found',
    seeAllUrl: '',
    appGalleryTitle: 'Recently Added',
    appGalleryDescription: 'The latest apps that help you team work and build faster'
  }
})).add('Recently Added Max', () => ({
  component: OcAppGalleryComponent,
  moduleMetadata: modules,
  props: {
    appsArr: [app1, app2, app3, app4, app1, app2],
    noAppMessage: 'No App Found',
    seeAllUrl: 'https://google.com',
    appGalleryTitle: 'Recently Added',
    appGalleryDescription: 'The latest apps that help you team work and build faster'
  }
})).add('Most Popular', () => ({
  component: OcAppGalleryComponent,
  moduleMetadata: modules,
  props: {
    appsArr: [app1, app2, app3, app4, app1, app2],
    noAppMessage: 'No App Found',
    seeAllUrl: 'https://google.com',
    appGalleryTitle: 'Most Popular',
    appGalleryDescription: 'The most used apps that help you and your team get more done'
  }
})).add('Apps For Analytics', () => ({
  component: OcAppGalleryComponent,
  moduleMetadata: modules,
  props: {
    appsArr: [app1, app2, app3, app4, app1, app2],
    noAppMessage: 'No App Found',
    seeAllUrl: 'https://google.com',
    appGalleryTitle: 'Apps for Analytics',
    appGalleryDescription: 'Get insights and analytics to make the better decisions'
  }
}));
