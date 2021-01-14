import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcReviewListComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {OCReviewDetails} from 'oc-ng-common-service';

const modules = {
  imports: [OcCommonLibModule]
};
const appReview1 = new OCReviewDetails();
appReview1.rating = 5;
appReview1.review = 'We love this app. very useful and easy to use!';
appReview1.reviewOwnerName = 'Jon from Sales CRM';

const appReview2 = new OCReviewDetails();
appReview2.rating = 3;
appReview2.review = 'Great Support, had a few problem first but they took '
  + 'care of everything and the whole team is running smuthly.';
appReview2.reviewOwnerName = 'Best Accounting';

const appReview3 = new OCReviewDetails();
appReview3.rating = 4;
appReview3.review = 'I have tried a lot of App. and this one has helped me communicate faster with my' +
  ' entire team. I would definitely recommend it.';
appReview3.reviewOwnerName = 'Marie A.';

const appReview4 = new OCReviewDetails();
appReview4.rating = 2;
appReview4.review = 'I tried app. The app is good. But not recommeded';
appReview4.reviewOwnerName = 'Gautam T.';


storiesOf('Review List', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcReviewListComponent,
  })
  .add('Empty', () => ({
    component: OcReviewListComponent,
    moduleMetadata: modules,
    props: {
      reviewListTitle: 'Most recent reviews',
      reviewsList: [],
      noReviewMessage: 'No Review for this app'
    }
  })).add('Some reviews', () => ({
  component: OcReviewListComponent,
  moduleMetadata: modules,
  props: {
    reviewsList: [appReview1],
    totalReview: 1,
    maxReviewDisplay: 3,
    canWriteReview: true,
  }
})).add('All', () => ({
  component: OcReviewListComponent,
  moduleMetadata: modules,
  props: {
    reviewsList: [appReview1, appReview2, appReview3, appReview4, appReview1, appReview2],
    totalReview: 7,
    maxReviewDisplay: 4,
    canWriteReview: true,
  }
}));
