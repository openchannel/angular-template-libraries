import { OcCommonLibModule, OcSelectExpandableComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { moduleMetadata } from '@storybook/angular';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Expandable Select [BEM]',
    component: OcSelectExpandableComponent,
    decorators: [moduleMetadata(modules)],
};

const SelectComponent = (args: OcSelectExpandableComponent) => ({
    component: OcSelectExpandableComponent,
    moduleMetadata: modules,
    props: args,
});

export const CollapsedSelect = SelectComponent.bind({});

CollapsedSelect.args = {
    title: 'App Category',
    selectModels: [
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
        },
        {
            label: 'Category 4',
            checked: true,
        },
    ],
};

export const ExpandedSelect = SelectComponent.bind({});

ExpandedSelect.args = {
    title: 'App Category',
    isCollapsed: false,
    collapsedOnInit: false,
    selectModels: [
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
        },
        {
            label: 'Category 4',
            checked: true,
        },
    ],
};
