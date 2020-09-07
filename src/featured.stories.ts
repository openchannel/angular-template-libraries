import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcFeaturedAppsComponent
} from 'projects/oc-ng-common-component/src/public-api';

const modules = {
  imports: [OcCommonLibModule]
};

const featuredApp = {
  logoUrl: '//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5f045efec800a4175058b649.png',
  appName: 'Test App 1',
  appDescription: 'With this plugin you can collaborate with teammates at any time.'
};

storiesOf('Featured Apps', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcFeaturedAppsComponent,
  })
  .add('Empty', () => ({
    component: OcFeaturedAppsComponent,
    moduleMetadata: modules,
    props: {
      data: [],
      label: 'Featured',
      emptyDataMessage: 'No Featured App'
    }
  })).add('Single App', () => ({
  component: OcFeaturedAppsComponent,
  moduleMetadata: modules,
  props: {
    data: [featuredApp],
    label: 'Featured',
    emptyDataMessage: 'No Featured App'
  }
})).add('Some Apps', () => ({
  component: OcFeaturedAppsComponent,
  moduleMetadata: modules,
  props: {
    data: [featuredApp, featuredApp],
    label: 'Featured',
    emptyDataMessage: 'No Featured App'
  }
})).add('Max Apps', () => ({
  component: OcFeaturedAppsComponent,
  moduleMetadata: modules,
  props: {
    data: [featuredApp, featuredApp, featuredApp, featuredApp],
    label: 'Featured',
    emptyDataMessage: 'No Featured App'
  }
}));
