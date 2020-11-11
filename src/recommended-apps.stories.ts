import { moduleMetadata } from '@storybook/angular';
import {
  OcCommonLibModule, OcNumberComponent,
  OcRecommendedAppsComponent
} from 'projects/oc-ng-common-component/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StatElement } from 'oc-ng-common-service/lib/model/app-data-model';

const modules = {
  imports: [OcCommonLibModule, BrowserAnimationsModule, RouterTestingModule]
};

const stat: StatElement = {
  '90day': 10,
  '30day': 20,
  total: 20
};

const app = {
  appId: '344gf-s3j-gi3423',
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
  description: 'Some Description',
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

const app1 = {...app};
app1.description = 'With this plugin you can communicate with your teammates any time';
app1.summary = 'With this plugin you can communicate with your teammates any time';
app1.icon = 'https://drive.google.com/u/0/uc?id=19l7Znd-iPPYUhM6zaiQZ01rE2NpkDFyk&export=download';
app1.name = 'Plugin';
app1.model[0].type = 'free';
app1.rating = 3.5;
app1.reviewCount = 12;

const app2 = {...app};
app2.description = app2.summary = 'Integrate directly with your account and make customer updates a breeze';
app2.icon = 'https://drive.google.com/u/0/uc?id=1vDDzbS--o_UIgXFE_LmMfVmSAKuprCyb&export=download';
app2.name = 'Application';
app2.model[0].price = 11.99;
app2.rating = 0;
app2.reviewCount = 0;

const app3 = {...app};
app3.description = app2.summary = 'Improve and extend your experience right from your own UI';
app3.icon = 'https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download';
app3.name = 'Integration';
app3.model[0].price = 4.99;
app3.rating = 4.9;
app3.reviewCount = 87;

export default {
  title: 'Recommended Apps',
  component: OcRecommendedAppsComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const RecommendedAppsComponent = (args: OcNumberComponent) => ({
  component: OcRecommendedAppsComponent,
  moduleMetadata: modules,
  props: args
});

export const EmptyList = RecommendedAppsComponent.bind({});

EmptyList.args = {
  appList: [],
  noAppMessage: 'No App Found',
  recommendedAppTitle: 'Recommended For You'
};

export const RecommendedAppsWithData = RecommendedAppsComponent.bind({});

RecommendedAppsWithData.args = {
  appList: [app1, app2, app3],
  noAppMessage: 'No App Found',
  recommendedAppTitle: 'Recommended For You'
};
