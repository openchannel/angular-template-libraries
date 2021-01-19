import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { OcTextSearchComponent } from 'projects/oc-ng-common-component/src/lib/oc-text-search/oc-text-search.component';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Search input',
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



