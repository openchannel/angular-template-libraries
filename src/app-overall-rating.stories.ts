import { OcOverallRatingComponent } from 'projects/oc-ng-common-component/src/public-api';
import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcMarketComponentsModule } from 'oc-ng-common-component/src/lib/market-components';

const modules = {
  imports: [OcMarketComponentsModule],
};

const overAllRatingSummaryEmpty = {
  rating: 0,
  reviewCount: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const overAllRatingSummary1 = {
  rating: 4.3,
  reviewCount: 12,
  1: 0,
  2: 0,
  3: 1,
  4: 3,
  5: 8,
};

storiesOf('Overall Rating', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcOverallRatingComponent,
  })
  .add('Empty Rating', () => ({
    component: OcOverallRatingComponent,
    moduleMetadata: modules,
    props: {
      overallReviewLabel: 'Overall rating',
      allReviewSummary: overAllRatingSummaryEmpty,
    },
  })).add('Rating Summary', () => ({
  component: OcOverallRatingComponent,
  moduleMetadata: modules,
  props: {
    overallReviewLabel: 'Overall rating',
    allReviewSummary: overAllRatingSummary1,
  },
}));
