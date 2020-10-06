import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcRichTextEditorComponent} from '../projects/oc-ng-common-component/src/lib/oc-rich-text-editor/oc-rich-text-editor.component';
import { OcNumberComponent } from '../projects/oc-ng-common-component/src/lib/oc-number/oc-number.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Number Input Component',
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
  autoFocus: true
};


