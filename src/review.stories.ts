import { moduleMetadata } from '@storybook/angular';
import { OcRatingComponent, OcReviewComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OcFormComponentsModule } from '@openchannel/angular-common-components/src/lib/form-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [
        AngularSvgIconModule.forRoot(),
        NgbModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        OcFormComponentsModule,
        OcCommonLibModule,
    ],
    declarations: [OcRatingComponent],
};

export default {
    title: 'Review [BEM]',
    component: OcReviewComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { reviewFormData: { action: 'Review Data' } },
};

const ReviewComponent = (args: OcReviewComponent) => ({
    component: OcReviewComponent,
    moduleMetadata: modules,
    props: args,
});

export const SimpleReview = ReviewComponent.bind({});
SimpleReview.args = {};

export const FullReview = ReviewComponent.bind({});
FullReview.args = {
    heading: 'Write a review',
    enableButtons: true,
    cancelButtonText: 'Cancel',
    submitButtonText: 'Submit',
    hidCancelButton: false,
};

export const FilledReview = ReviewComponent.bind({});
FilledReview.args = {
    heading: 'Write a review',
    enableButtons: true,
    cancelButtonText: 'Cancel',
    submitButtonText: 'Submit',
    hidCancelButton: false,
    reviewData: {
        reviewId: '5463cee5e4b042e3e26f1e41',
        appId: '5565322ae4b0a70b13a4563b',
        appName: 'My App',
        userId: '6843gfu34783gfg',
        reportDate: 1432695338702,
        rating: 400,
        headline: 'Good App!',
        description: 'It works great and looks good too.',
        status: {
            value: 'approved',
            reason: '',
        },
    },
};
