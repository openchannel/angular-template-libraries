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
  selectValArr: [{label: 1}, {label: 2}],
  labelField: 'label'
};

export const SelectedObjectValue = SelectComponent.bind({});

SelectedObjectValue.args = {
  selectValArr: [{label: 1}, {label: 2}],
  isObject: true,
  labelField: 'label',
  value: {label: 1}
};
