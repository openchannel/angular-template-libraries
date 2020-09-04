import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcOverallRatingComponent
} from "projects/oc-ng-common-component/src/public-api";
import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {OverallRatingSummary} from 'oc-ng-common-service';

const modules = {
  imports: [OcCommonLibModule]
}

const overAllRatingSummaryEmpty = new OverallRatingSummary();
overAllRatingSummaryEmpty.overallRating = 0;
overAllRatingSummaryEmpty.reviewCount = 0;
overAllRatingSummaryEmpty.oneStarCount = 0;
overAllRatingSummaryEmpty.twoStarCount = 0;
overAllRatingSummaryEmpty.threeStarCount = 0;
overAllRatingSummaryEmpty.fourStarCount = 0;
overAllRatingSummaryEmpty.fiveStarCount = 0;


const overAllRatingSummary1 = new OverallRatingSummary();
overAllRatingSummary1.overallRating = 4.3;
overAllRatingSummary1.reviewCount = 12;
overAllRatingSummary1.oneStarCount = 0;
overAllRatingSummary1.twoStarCount = 0;
overAllRatingSummary1.threeStarCount = 1;
overAllRatingSummary1.fourStarCount = 3;
overAllRatingSummary1.fiveStarCount = 8;

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
      allReviewSummary: overAllRatingSummaryEmpty
    }
  })).add('Rating Summary', () => ({
  component: OcOverallRatingComponent,
  moduleMetadata: modules,
  props: {
    overallReviewLabel: 'Overall rating',
    allReviewSummary: overAllRatingSummary1
  }
}));
