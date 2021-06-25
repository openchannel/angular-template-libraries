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
