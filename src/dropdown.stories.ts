import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcDropdownComponent} from '../projects/oc-ng-common-component/src/lib/oc-dropdown/oc-dropdown.component';
import { OcDropdownButtonComponent } from '../projects/oc-ng-common-component/src/lib/oc-dropdown-button/oc-dropdown-button.component';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Dropdown',
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

const DropdownButtonComponent = (args: OcDropdownButtonComponent) => ({
    component: OcDropdownButtonComponent,
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
            label: 'featured'
        }
    ],
};

export const DropdownButton = DropdownButtonComponent.bind({});

DropdownButton.args = {
    title: 'Chose item',
    options: [
        {
            label: 'Developer',
            value: 'developer'
        },
        {
            label: 'Reviewer',
            value: 'reviewer'
        },
        {
            label: 'Designer',
            value: 'designer'
        }
    ],
    selected: {
        label: 'Developer',
        value: 'developer'
    }
};
