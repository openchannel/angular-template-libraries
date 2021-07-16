import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcMultiSelectCheckboxListComponent } from '@openchannel/angular-common-components/src/lib/form-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { action } from '@storybook/addon-actions';

const modules = {
    imports: [OcCommonLibModule, NgbModule],
};

export default {
    title: 'Multi Select Checkbox List [BEM]',
    component: OcMultiSelectCheckboxListComponent,
    decorators: [moduleMetadata(modules)],
};

const MultiSelectCheckboxList = (args: OcMultiSelectCheckboxListComponent) => ({
    component: OcMultiSelectCheckboxListComponent,
    moduleMetadata: modules,
    props: args,
});

export const BasicMultiSelectCheckboxList = MultiSelectCheckboxList.bind({});

BasicMultiSelectCheckboxList.args = {
    label: 'Multi select checkbox list',
    itemsArray: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
    defaultItemsArray: ['item1', 'item2'],
    resultFormData: action('resultFormData'),
};
