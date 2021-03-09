import { moduleMetadata } from '@storybook/angular';
import { StatElement } from 'oc-ng-common-service';
import { OcAppListGridComponent, OcRatingComponent } from 'oc-ng-common-component/src/lib/market-components';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PricePipe } from 'oc-ng-common-component/src/lib/common-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const modules = {
  imports: [AngularSvgIconModule.forRoot(), NgbModule, HttpClientTestingModule],
  declarations: [OcRatingComponent, PricePipe]
};

const stat: StatElement = {
  '90day': 30,
  '30day': 10,
  total: 40
};

const app1 = {
  appId: '344gf-43s3j-gi3423',
  icon: '',
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
  icon: '',
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
  icon: '',
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
  icon: '',
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
