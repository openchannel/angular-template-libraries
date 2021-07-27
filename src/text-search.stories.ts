import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcTextSearchComponent } from '@openchannel/angular-common-components';
import { FormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, FormsModule],
};

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

export const SearchWithButtons = TextSearchComponent.bind({});

SearchWithButtons.args = {
    clearButtonText: 'Cancel',
    hasClearTextControl: true,
    hasMagnifier: false,
};
