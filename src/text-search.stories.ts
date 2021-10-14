import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcTextSearchComponent } from '@openchannel/angular-common-components';
import { FormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, FormsModule],
};

const selectedFiltersMock = [
    {
        parentFilterId: 'collections',
        selectedFilterValue: {
            checked: false,
            id: 'featured',
            label: 'Featured',
            query: '{"status.value":"approved","attributes.featured":"yes"}',
            sort: '{"randomize":1}',
        },
    },
    {
        parentFilterId: 'categories',
        selectedFilterValue: {
            checked: false,
            description: 'Analytics Description',
            id: 'analytics',
            label: 'Analytics',
            query: '{"status.value":"approved","customData.categories":"Analytics"}',
        },
    },
];

export default {
    title: 'Search input [BEM]',
    component: OcTextSearchComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { enterSearch: { action: 'Search Text' } },
};

const TextSearchComponent = (args: OcTextSearchComponent) => ({
    component: OcTextSearchComponent,
    moduleMetadata: modules,
    props: args,
});

export const SimpleSearch = TextSearchComponent.bind({});

export const SearchWithTags = TextSearchComponent.bind({});

SearchWithTags.args = {
    selectedFilters: selectedFiltersMock,
    searchTermTag: 'Searched text example',
    clearAllButtonType: 'primary',
    isShowClearAllTagsButton: true,
};

export const SearchWithButtons = TextSearchComponent.bind({});

SearchWithButtons.args = {
    clearButtonText: 'Cancel',
    hasClearTextControl: true,
    hasMagnifier: false,
};

export const SearchWithTagsAndButtons = TextSearchComponent.bind({});

SearchWithTagsAndButtons.args = {
    clearButtonText: 'Cancel',
    hasClearTextControl: true,
    hasMagnifier: false,
    selectedFilters: selectedFiltersMock,
};
