import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { OcMultiSelectListComponent } from 'oc-ng-common-component/src/lib/form-components';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Multi Select List',
  component: OcMultiSelectListComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const MultiSelectList = (args: OcMultiSelectListComponent) => ({
  component: OcMultiSelectListComponent,
  moduleMetadata: modules,
  props: args
});

export const BasicMultiSelectList = MultiSelectList.bind({});

BasicMultiSelectList.args = {
  label: 'Multi Select Items List',
  availableItemsList: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']
};
