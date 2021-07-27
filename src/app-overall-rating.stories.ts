import { moduleMetadata } from '@storybook/angular';
import { OcOverallRatingComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = {
    imports: [OcCommonLibModule, NgbModule],
};

export default {
    title: 'Overall Rating [BEM]',
    component: OcOverallRatingComponent,
    decorators: [moduleMetadata(modules)],
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

const OverallRatingComponent = (args: OcOverallRatingComponent) => ({
    component: OcOverallRatingComponent,
    moduleMetadata: modules,
    prop: args,
});

export const EmptyRating = OverallRatingComponent.bind({});
EmptyRating.args = {
    overallReviewLabel: 'Overall rating',
    allReviewSummary: overAllRatingSummaryEmpty,
};

export const RatingSummary = OverallRatingComponent.bind({});
RatingSummary.args = {
    overallReviewLabel: 'Overall rating',
    allReviewSummary: overAllRatingSummary1,
};
