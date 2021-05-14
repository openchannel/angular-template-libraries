import {moduleMetadata} from '@storybook/angular';
import {
  OcCommonLibModule,
  OcLabelComponent,
  OcTooltipLabelComponent
} from '@openchannel/angular-common-components/src/public-api';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, NgbModule]
};

export default {
  title: 'Label [BEM]',
  component: OcLabelComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const LabelComponent = (args: OcLabelComponent) => ({
  component: OcLabelComponent,
  moduleMetadata: modules,
  props: args
});

export const DefaultLabel = LabelComponent.bind({});
DefaultLabel.args = {
  text: 'Name'
};

export const RequiredLabel = LabelComponent.bind({});
RequiredLabel.args = {
  text: 'Name',
  required: true
};

const TooltipLabelComponent = (args: OcTooltipLabelComponent) => ({
  component: OcTooltipLabelComponent,
  moduleMetadata: modules,
  props: args
});

export const TooltipLabel = TooltipLabelComponent.bind({});
TooltipLabel.args = {
  text: 'Name',
  description: 'Tooltip Text'
};
