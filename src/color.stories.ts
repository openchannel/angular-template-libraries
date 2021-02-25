import { moduleMetadata } from '@storybook/angular';
import { OcColorComponent, OcFormComponentsModule } from 'oc-ng-common-component/src/lib/form-components';

const modules = {
  imports: [OcFormComponentsModule]
};

export default {
  title: 'Color',
  component: OcColorComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const ChartComponent = (args: OcColorComponent) => ({
  component: OcColorComponent,
  moduleMetadata: modules,
  props: args
});

export const BasicColorComponent = ChartComponent.bind({});

BasicColorComponent.args = {
  placeholder: 'Enter color value here',
  colorPickerPosition: 'bottom-left'
};
