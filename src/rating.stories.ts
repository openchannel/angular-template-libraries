import { moduleMetadata } from '@storybook/angular';
import { OcRatingComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const modules = {
    imports: [AngularSvgIconModule.forRoot(), NgbModule, HttpClientTestingModule],
};

export default {
    title: 'Rating [BEM]',
    component: OcRatingComponent,
    decorators: [moduleMetadata(modules)],
};

const RatingComponent = (args: OcRatingComponent) => ({
    component: OcRatingComponent,
    moduleMetadata: modules,
    props: args,
});

export const MultiStar = RatingComponent.bind({});
MultiStar.args = {
    type: 'multi-star',
    rating: 4,
    disabled: true,
};

export const SingleStar = RatingComponent.bind({});
SingleStar.args = {
    type: 'single-star',
    rating: 4.5,
    reviewCount: 50,
};

export const InteractiveRating = RatingComponent.bind({});
InteractiveRating.args = {
    type: 'multi-star',
};
