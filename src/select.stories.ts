import {storiesOf} from '@storybook/angular';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcSelectComponent,
  OcSelectExpandableComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};
const selectValArr = ['Assembly', 'Communication'];
storiesOf('Select', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcSelectComponent,
  })
  .add('Normal Select', () => ({
    component: OcSelectComponent,
    props: {
      defaultBlankValue: 'Select Category',
      selectValArr: selectValArr
    }
  })).add('expandable Select', () => ({
  component: OcSelectExpandableComponent,
  moduleMetadata: modules

}));
