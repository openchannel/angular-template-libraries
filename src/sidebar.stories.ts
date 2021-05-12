import { OcCommonLibModule, OcSidebarComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { moduleMetadata } from '@storybook/angular';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Sidebar [BEM]',
    component: OcSidebarComponent,
    decorators: [moduleMetadata(modules)],
};

const SidebarComponent = (args: OcSidebarComponent) => ({
    component: OcSidebarComponent,
    moduleMetadata: modules,
    props: args,
});

export const OneLevel = SidebarComponent.bind({});

OneLevel.args = {
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
                },
            ],
        },
        {
            label: 'Category 4',
            checked: true,
        },
    ],
};
