import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'oc-ng-common-component';
import { OcTextSearchComponent } from 'oc-ng-common-component';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Search input [BEM]',
  component: OcTextSearchComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { enterSearch: { action: 'Search Text' }}
};

const TextSearchComponent = (args: OcTextSearchComponent) => ({
  component: OcTextSearchComponent,
  moduleMetadata: modules,
  props: args
});

export const SimpleSearch = TextSearchComponent.bind({});



