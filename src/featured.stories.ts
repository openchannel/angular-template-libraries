import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { OcFeaturedAppsComponent } from 'oc-ng-common-component/src/lib/market-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {FullAppData, StatElement} from 'oc-ng-common-component/src/lib/common-components';

const modules = {
  imports: [OcCommonLibModule, BrowserAnimationsModule, RouterTestingModule]
};

export default {
  title: 'Featured Apps [BEM]',
  component: OcFeaturedAppsComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const FeaturedAppsComponent = (args: OcFeaturedAppsComponent) => ({
  component: OcFeaturedAppsComponent,
  moduleMetadata: modules,
  props: args
});

const statElement: StatElement = {
  '90day': 20,
  '30day': 10,
  total: 20
};

const featuredApp: FullAppData = {
  appId: '34343-jjo-sgs-353-fgi-3423',
  icon: './assets/angular-common-components/get-started.svg',
  logo: './assets/angular-common-components/get-started.svg',
  name: 'Test App 1',
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
  summary: '',
  description: 'With this plugin you can collaborate with teammates at any time.',
  lastUpdated: new Date(),
  version: 1.1,
  safeName: ['test-app'],
  developerId: '44555-3232gvdfdf',
  submittedDate: new Date(),
  created: new Date().getMonth() - 2,
  status: {
    value: 'approved',
    lastUpdated: 1.1,
    modifiedBy: '',
    reason: ''
  },
  statistics: {
    views: statElement,
    downloads: statElement,
    developerSales: statElement,
    totalSales: statElement,
    ownerships: statElement,
    reviews: statElement
  },
  isLive: true
};

export const Empty = FeaturedAppsComponent.bind({});

Empty.args = {
  data: [],
  label: 'Featured',
  emptyDataMessage: 'No Featured App'
};

export const SingleApp = FeaturedAppsComponent.bind({});

SingleApp.args = {
  data: [featuredApp],
  label: 'Featured',
  emptyDataMessage: 'No Featured App'
};

export const SomeApps = FeaturedAppsComponent.bind({});

SomeApps.args = {
  data: [featuredApp, featuredApp],
  label: 'Featured',
  emptyDataMessage: 'No Featured App'
};

export const MaxApps = FeaturedAppsComponent.bind({});

MaxApps.args = {
  data: [featuredApp, featuredApp, featuredApp, featuredApp],
  label: 'Featured',
  emptyDataMessage: 'No Featured App'
};
