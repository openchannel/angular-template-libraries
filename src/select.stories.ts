import { moduleMetadata, storiesOf } from '@storybook/angular';
import {
  OcCommonLibModule,
  OcSelectComponent,
} from 'projects/oc-ng-common-component/src/public-api';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Select',
  component: OcSelectComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};


const SelectComponent = (args: OcSelectComponent) => ({
  component: OcSelectComponent,
  moduleMetadata: modules,
  props: args
});
export const SimpleSelect = SelectComponent.bind({});

SimpleSelect.args = {
  selectValArr: ['Assembly', 'Communication']
};

export const ObjectSelect = SelectComponent.bind({});

ObjectSelect.args = {
  selectValArr: [{first: 1}, {second: 2}],
  isObject: true
};
