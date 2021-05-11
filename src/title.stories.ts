import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'oc-ng-common-component';
import {OcTitleComponent} from 'oc-ng-common-component';

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Title [BEM]',
    component: OcTitleComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const TitleComponent = (args: OcTitleComponent) => ({
    component: OcTitleComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultTitle = TitleComponent.bind({});
DefaultTitle.args = {
    title: 'Options',
    required: true,
    description: 'Description description description description'
};

export const WithoutRequiredTitle = TitleComponent.bind({});
WithoutRequiredTitle.args = {
    title: 'Options',
    required: false,
    description: 'Description description description description'
};

export const WithoutDescriptionTitle = TitleComponent.bind({});
WithoutDescriptionTitle.args = {
    title: 'Options',
    required: true,
};

export const CustomIconTitle = TitleComponent.bind({});
CustomIconTitle.args = {
    title: 'Options',
    required: true,
    infoTitleIconCsv: './assets/angular-common-components/delete.svg',
    description: 'Description description description description'
};
