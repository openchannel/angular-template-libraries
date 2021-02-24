import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {OcTagsComponent} from "oc-ng-common-component";

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Tags',
    component: OcTagsComponent,
    decorators: [
        moduleMetadata(modules),
    ],
    argTypes: { updatingTags: { action: 'Get Tags' }}
};

const TagsComponent = (args: OcTagsComponent) => ({
    component: OcTagsComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultTags = TagsComponent.bind({});

DefaultTags.args = {
    title: 'MyTag',
    required: true,
    description: 'Tag description description description description description',
    placeHolderInputName: 'Input text',
    placeHolderDropBoxName: 'Select text',
    availableTags: ['default', 'first', 'second',
        '111111', '222222', '333333', '444444444444', '5555555555555555', '6666666',
        '777777', '888888', '999999999999', '000000000000'],
    defaultTags: ['default'],
    minTagsCount: 2,
    maxTagsCount: 4,
    ignoreCase: true,
    minTagLength: 3,
    maxTagLength: 30,
};

export const CustomTags = TagsComponent.bind({});
CustomTags.args = {};

CustomTags.args = {
    title: 'MyTag',
    required: true,
    description: 'Tag description description description description description',
    placeHolderInputName: null,
    placeHolderDropBoxName: 'Select MyTag',
    availableTags: ['1', '2', '3', '4', '5', '6', '7', 'default', 'default_second'],
    defaultTags: ['default', 'default_second'],
    minTagsCount: 2,
    maxTagsCount: 3,
    ignoreCase: true,
    minTagLength: 3,
    maxTagLength: 30,
};


export const BooleanTags = TagsComponent.bind({});

BooleanTags.args = {
    title: 'Test Boolean Tags',
    required: true,
    description: null,
    placeHolderInputName: null,
    placeHolderDropBoxName: 'Select Boolean Tags',
    availableTags: ['true', 'false'],
    defaultTags: [],
    minTagsCount: 1,
    maxTagsCount: null,
    ignoreCase: true,
    minTagLength: null,
    maxTagLength: null,
    tagsType: 'boolean'
};

export const NumberTags = TagsComponent.bind({});

NumberTags.args = {
    title: 'Test number tags',
    required: true,
    description: null,
    placeHolderInputName: 'Add new number tags',
    placeHolderDropBoxName: 'Select Number Tags',
    availableTags: ['1', '3', '45'],
    defaultTags: [45],
    minTagsCount: 1,
    maxTagsCount: 2,
    ignoreCase: true,
    minTagLength: null,
    maxTagLength: null,
    tagsType: 'number'
};

