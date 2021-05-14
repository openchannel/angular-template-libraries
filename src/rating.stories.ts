import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcRatingComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const modules = {
    imports: [AngularSvgIconModule.forRoot(), NgbModule, HttpClientTestingModule],
};
storiesOf('Rating [BEM]', module)
    .addDecorator(withA11y)
    .addParameters({
        component: OcRatingComponent,
    })
    .add('multi star', () => ({
        component: OcRatingComponent,
        moduleMetadata: modules,
        props: {
            type: 'multi-star',
            rating: 4,
        },
    }))
    .add('signle star', () => ({
        component: OcRatingComponent,
        moduleMetadata: modules,
        props: {
            type: 'single-star',
            rating: 4.5,
            reviewCount: 50,
        },
    }));
