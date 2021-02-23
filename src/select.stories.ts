import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcSelectComponent } from 'oc-ng-common-component';


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

export const SelectedObjectValue = SelectComponent.bind({});

SelectedObjectValue.args = {
  selectValArr: [{first: 1}, {second: 2}],
  isObject: true,
  value: 1
};
