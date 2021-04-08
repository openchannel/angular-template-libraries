import {moduleMetadata} from '@storybook/angular';
import {
  OcAppShortInfoComponent,
  OcMarketComponentsModule
} from 'oc-ng-common-component/src/lib/market-components';
import {OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import {FullAppData} from 'oc-ng-common-service';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, OcMarketComponentsModule]
};

export default {
  title: 'Short Info [BEM]',
  component: OcAppShortInfoComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const statElement = {
  '90day': 10,
  '30day': 20,
  total: 30
};

const app1: FullAppData = {
  appId: '5f22dd91b5ad376fff8431a7',
  safeName: ['firstapp'],
  customData: {
    summary: 'Some Test summary',
    'website-url': null,
    'product-images': null,
    icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
    category: ['category'],
    'video-url': null
  },
  status: {
    value: 'approved',
    lastUpdated: 1432696823474,
    modifiedBy: 'developer',
    reason: ''
  },
  developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
  model: [{
    license: 'single',
    modelId: '5f22dd91b5ad376fff8431a6',
    price: 20,
    currency: 'USD',
    type: 'single',
    trial: 0
  }],
  name: 'FirstApp',
  lastUpdated: 1432696823474,
  isLive: true,
  version: 1,
  submittedDate: 1432696823474,
  created: 1432696823474,
  rating: 4.2,
  reviewCount: 10,
  statistics: {
    views: statElement,
    downloads: statElement,
    developerSales: statElement,
    totalSales: statElement,
    ownerships: statElement,
    reviews: statElement
  },
  children: [
    {
      appId: '5f22dd91b5ad376fff8431a7',
      safeName: ['firstapp'],
      customData: {
        summary: 'New Test Summary',
        'website-url': null,
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        category: ['category'],
        'video-url': null
      },
      status: {
        value: 'inDevelopment',
        lastUpdated: 1432696823474,
        modifiedBy: 'developer',
        reason: ''
      },
      developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
      model: [{
        license: 'single',
        modelId: '5f22dd91b5ad376fff8431a6',
        price: 0,
        currency: 'USD',
        type: 'free',
        trial: 0
      }],
      name: 'FirstApp',
      lastUpdated: 1432696823474,
      isLive: false,
      version: 1.2,
      submittedDate: 1432696823474,
      created: 1432956823474,
      rating: 4.2,
      reviewCount: 10,
      statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement
      }
    },
    {
      appId: '5f22dd91b5ad376fff8431a7',
      safeName: ['firstapp'],
      customData: {
        summary: 'New Test Summary',
        'website-url': null,
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        category: ['category'],
        'video-url': null
      },
      status: {
        value: 'suspended',
        lastUpdated: 1432696823474,
        modifiedBy: 'developer',
        reason: ''
      },
      developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
      model: [{
        license: 'single',
        modelId: '5f22dd91b5ad376fff8431a6',
        price: 0,
        currency: 'USD',
        type: 'free',
        trial: 0
      }],
      name: 'FirstApp',
      lastUpdated: 1432696823474,
      isLive: false,
      version: 1.1,
      submittedDate: 1432696823474,
      created: 1434796823474,
      rating: 4.2,
      reviewCount: 10,
      statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement
      }
    }
  ]
};

const ShortInfoComponent = (args: OcAppShortInfoComponent) => ({
  component: OcAppShortInfoComponent,
  moduleMetadata: modules,
  props: args
});


export const SimpleShortInfo = ShortInfoComponent.bind({});

SimpleShortInfo.args = {
  app: app1
};
