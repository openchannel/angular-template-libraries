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
    checkboxItemsArray: [
        {
            label: 'checkbox 1',
        },
        {
            label: 'checkbox 2',
        },
        {
            label: 'checkbox 3',
        },
    ],
    resultFormData: action('resultFormData'),
};
