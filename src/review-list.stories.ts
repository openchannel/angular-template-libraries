import {
    OcRatingComponent,
    OCReviewDetails,
    OcReviewListComponent,
} from '@openchannel/angular-common-components/src/lib/market-components';
import { OcButtonComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { moduleMetadata } from '@storybook/angular';

const modules = {
    imports: [NgbModule, AngularSvgIconModule.forRoot(), HttpClientTestingModule, NgxSpinnerModule],
    declarations: [OcRatingComponent, OcButtonComponent],
};
const appReview1 = new OCReviewDetails();
appReview1.rating = 5;
appReview1.review = 'We love this app. very useful and easy to use!';
appReview1.reviewOwnerName = 'Jon from Sales CRM';

const appReview2 = new OCReviewDetails();
appReview2.rating = 3;
appReview2.review = 'Great Support, had a few problem first but they took ' + 'care of everything and the whole team is running smuthly.';
appReview2.reviewOwnerName = 'Best Accounting';

const appReview3 = new OCReviewDetails();
appReview3.rating = 4;
appReview3.review =
    'I have tried a lot of App. and this one has helped me communicate faster with my' + ' entire team. I would definitely recommend it.';
appReview3.reviewOwnerName = 'Marie A.';

const appReview4 = new OCReviewDetails();
appReview4.rating = 2;
appReview4.review = 'I tried app. The app is good. But not recommended';
appReview4.reviewOwnerName = 'Gautam T.';

export default {
    title: 'Review List [BEM]',
    component: OcReviewListComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { writeAReview: { action: 'New Review button has been clicked' } },
};

const ReviewListComponent = (args: OcReviewListComponent) => ({
    component: OcReviewListComponent,
    moduleMetadata: modules,
    props: args,
});

export const Empty = ReviewListComponent.bind({});
Empty.args = {
    reviewListTitle: 'Most recent reviews',
    reviewsList: [],
    noReviewMessage: 'No Review for this app',
};

export const SomeReviews = ReviewListComponent.bind({});
SomeReviews.args = {
    reviewsList: [appReview1],
    totalReview: 1,
    maxReviewDisplay: 3,
};

export const All = ReviewListComponent.bind({});
All.args = {
    reviewsList: [appReview1, appReview2, appReview3, appReview4, appReview1, appReview2],
    totalReview: 7,
    maxReviewDisplay: 4,
};

export const CanNotWriteANewReview = ReviewListComponent.bind({});
CanNotWriteANewReview.args = {
    reviewsList: [appReview1],
    totalReview: 7,
    maxReviewDisplay: 4,
    allowWriteReview: false,
};
