import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppCategorySelectComponent, OcAppListGridComponent,
  OcCommonLibModule
} from 'projects/oc-ng-common-component/src/public-api';
import {action} from '@storybook/addon-actions';

const modules = {
  imports: [OcCommonLibModule]
};

storiesOf('Select App Categories', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcAppCategorySelectComponent,
  })
  .add('Empty', () => ({
    component: OcAppCategorySelectComponent,
    moduleMetadata: modules,
    props: {
      predefinedValArr: [{key: "cat1", value: "cat1"}, {key: "cat2", value: "cat2"}, {
        key: "cat3",
        value: "cat3"
      }],
      selectedValuesArr: [],
      predefinedValCahnge: action('Predefined Removed'),
      selectedValuesArrChange: action('Category Added')
    }
  })).add('With Data', () => ({
  component: OcAppCategorySelectComponent,
  moduleMetadata: modules,
  props: {
    predefinedValArr: ['Category1', 'Category2', 'Category3'],
    selectedValuesArr: ['Category4'],
    predefinedValCahnge: action('Predefined Removed'),
    selectedValuesArrChange: action('Category Added')
  }
}));
