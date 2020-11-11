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

const app: FullAppData = {
  appId: '344gf-43s3j-gi3423',
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
app2.description = 'Integrate directly with your account and make customer updates a breeze';
app2.summary = 'Integrate directly with your account and make customer updates a breeze';
app2.icon = 'https://drive.google.com/u/0/uc?id=1vDDzbS--o_UIgXFE_LmMfVmSAKuprCyb&export=download';
app2.name = 'Application';
app2.model[0].price = 11.99;
app2.rating = 2.4;
app2.reviewCount = 2;

const app3 = {...app};
app3.description = 'With this plugin you can communicate with your teammates any time';
app3.summary = 'With this plugin you can communicate with your teammates any time';
app3.icon = 'https://drive.google.com/u/0/uc?id=1fWkPPXp3tmkYRBy-GtCm_9PkP7fmConE&export=download';
app3.name = 'Plugin';
app3.model[0].type = 'free';
app3.rating = 3.5;
app3.reviewCount = 12;

const app4 = {...app};
app4.description = 'Improve and extend your experience right from your own UI';
app4.summary = 'Improve and extend your experience right from your own UI';
app4.icon = 'https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download';
app4.name = 'Integration';
app4.model[0].price = 5.99;
app4.rating = 4.9;
app4.reviewCount = 87;

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
