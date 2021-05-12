import { moduleMetadata } from '@storybook/angular';
import { OcColorComponent, OcFormComponentsModule } from '@openchannel/angular-common-components/src/lib/form-components';

const modules = {
  imports: [OcFormComponentsModule]
};

export default {
  title: 'Color [BEM]',
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
