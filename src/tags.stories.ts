import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcTagsComponent } from '@openchannel/angular-common-components/src/lib/form-components';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Tags [BEM]',
    component: OcTagsComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { updatingTags: { action: 'Get Tags' } },
};

const TagsComponent = (args: OcTagsComponent) => ({
    component: OcTagsComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultTags = TagsComponent.bind({});

DefaultTags.args = {
    availableTags: [
        'default',
        'first',
        'second',
        '111111',
        '222222',
        '333333',
        '444444444444',
        '5555555555555555',
        '6666666',
        '777777',
        '888888',
        '999999999999',
        '000000000000',
    ],
    value: ['default'],
};

export const CustomTags = TagsComponent.bind({});
CustomTags.args = {};

CustomTags.args = {
    placeholder: 'Select MyTag',
    availableTags: ['1', '2', '3', '4', '5', '6', '7', 'default', 'default_second'],
    value: ['default', 'default_second'],
};

export const BooleanTags = TagsComponent.bind({});

BooleanTags.args = {
    availableTags: ['true', 'false'],
    tagsType: 'boolean',
};

export const NumberTags = TagsComponent.bind({});

NumberTags.args = {
    availableTags: ['1', '3', '45'],
    value: [45],
    tagsType: 'number',
};
