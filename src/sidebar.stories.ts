import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import { OcSidebarComponent } from '../projects/oc-ng-common-component/src/lib/oc-sidebar/oc-sidebar.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Sidebar',
  component: OcSidebarComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const SelectComponent = (args: OcSidebarComponent) => ({
  component: OcSidebarComponent,
  moduleMetadata: modules,
  props: args
});

export const SimpleSelect = SelectComponent.bind({});

SimpleSelect.args = {
  title: 'App Category',
  sidebarModel: [
    {
      label: 'Category 1',
      checked: false,
    },
    {
      label: 'Category 2',
      checked: false,
    },
    {
      label: 'Category 3',
      checked: false,
      expanded: false,
      sublist: [
        {
          label: 'Subcategory 1',
          checked: false,
        },
        {
          label: 'Subcategory 2',
          checked: false,
        }
      ]
    },
    {
      label: 'Category 4',
      checked: true,
    }
  ]
};


