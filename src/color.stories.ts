import { moduleMetadata } from '@storybook/angular';
import {
  OcColorComponent,
  OcCommonLibModule,
} from 'projects/oc-ng-common-component/src/public-api';

const modules = {
  imports: [OcCommonLibModule]
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
