import { OcRatingComponent } from 'projects/oc-ng-common-component/src/public-api';
import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcMarketComponentsModule } from 'oc-ng-common-component/src/lib/market-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = {
  imports: [OcMarketComponentsModule, NgbModule],
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
  })).add('signle star', () => ({
  component: OcRatingComponent,
  moduleMetadata: modules,
  props: {
    type: 'single-star',
    rating: 4.5,
    reviewCount: 50,
  },
}));
