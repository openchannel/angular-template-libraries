import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcTextSearchComponent } from '@openchannel/angular-common-components';
import { FormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, FormsModule],
};

const tagsTitles = ['collections', 'categories', 'search criteria'];

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
    tagsTitles,
    clearAllButtonType: 'primary',
    showClearAllTagsButton: true,
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
    tagsTitles,
};
