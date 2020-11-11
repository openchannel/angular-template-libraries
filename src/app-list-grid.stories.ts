import { moduleMetadata, storiesOf } from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppGalleryComponent,
  OcAppListGridComponent,
  OcCommonLibModule, OcNumberComponent
} from 'projects/oc-ng-common-component/src/public-api';
import { BasicAppDetails, FullAppData, StatElement } from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';

const modules = {
  imports: [OcCommonLibModule]
};

const stat: StatElement = {
  '90day': 30,
  '30day': 10,
  total: 40
};

const app1 = {
  appId: '344gf-43s3j-gi3423',
  icon: 'https://drive.google.com/u/0/uc?id=19l7Znd-iPPYUhM6zaiQZ01rE2NpkDFyk&export=download',
  name: 'Plugin',
  model: [{
    type: 'free',
    price: 0,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
  rating: 3.5,
  reviewCount: 12,
  summary: 'With this plugin you can communicate with your teammates any time',
  description: 'With this plugin you can communicate with your teammates any time',
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

const app2 = {
  appId: '343344gf-43s3j-gi3423',
  icon: 'https://drive.google.com/u/0/uc?id=1vDDzbS--o_UIgXFE_LmMfVmSAKuprCyb&export=download',
  name: 'Application',
  model: [{
    type: 'recurring',
    price: 11.99,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
  rating: 2.4,
  reviewCount: 2,
  summary: 'Integrate directly with your account and make customer updates a breeze',
  description: 'Integrate directly with your account and make customer updates a breeze',
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

const app3 = {
  appId: '34ks344gf-43s3j-gi3423',
  icon: 'https://drive.google.com/u/0/uc?id=1fWkPPXp3tmkYRBy-GtCm_9PkP7fmConE&export=download',
  name: 'Plugin',
  model: [{
    type: 'free',
    price: 11.99,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
  rating: 3.5,
  reviewCount: 12,
  summary: 'With this plugin you can communicate with your teammates any time',
  description: 'With this plugin you can communicate with your teammates any time',
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

const app4 = {
  appId: '35-344gf-43s3j-gi3423',
  icon: 'https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download',
  name: 'Integration',
  model: [{
    type: 'single',
    price: 5.99,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
  rating: 4.9,
  reviewCount: 87,
  summary: 'Integrate directly with your account and make customer updates a breeze',
  description: 'Integrate directly with your account and make customer updates a breeze',
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

export default {
  title: 'App List Grid',
  component: OcAppListGridComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { gotoDetails: { action: 'Go to details' }}
};

const AppListGridComponent = (args: OcAppListGridComponent) => ({
  component: OcAppListGridComponent,
  moduleMetadata: modules,
  props: args
});

export const EmptyGrid = AppListGridComponent.bind({});

EmptyGrid.args = {
  appList: [],
  noAppMessage: 'No App Found',
};

export const GridWithApps = AppListGridComponent.bind({});

GridWithApps.args = {
  appList: [app1, app2, app3, app4],
  noAppMessage: 'No App Found',
};
