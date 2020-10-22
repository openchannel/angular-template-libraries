import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcDropdownComponent} from '../projects/oc-ng-common-component/src/lib/oc-dropdown/oc-dropdown.component';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Dropdown component',
    component: OcDropdownComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const DropdownComponent = (args: OcDropdownComponent) => ({
    component: OcDropdownComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultDropdown = DropdownComponent.bind({});

DefaultDropdown.args = {
    selected: {
        label: 'popular'
    },
    options: [
        {
            label: 'popular'
        },
        {
            label: 'newest'
        },
        {
            label: 'fetured'
        }
    ],
};
