import {OcCommonLibModule} from 'oc-ng-common-component';
import {moduleMetadata} from '@storybook/angular';
import { OcNumberComponent } from 'oc-ng-common-component/src/lib/form-components';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Number Input Component [BEM]',
  component: OcNumberComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const NumberInputComponent = (args: OcNumberComponent) => ({
  component: OcNumberComponent,
  moduleMetadata: modules,
  props: args
});

export const SimpleNumberInput = NumberInputComponent.bind({});

SimpleNumberInput.args = {
  autoFocus: true,
  placeholder: 'Write any number here'
};


