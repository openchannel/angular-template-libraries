import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {OcTagsComponent} from "oc-ng-common-component";
import {OcTagElementComponent} from "oc-ng-common-component";

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Tag element',
    component: OcTagElementComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const TagComponent = (args: OcTagsComponent) => ({
    component: OcTagElementComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultOneTag = TagComponent.bind({});

DefaultOneTag.args = {
    title: 'MyTag',
    width: '15%',
    closeMarker: true
};

export const CustomCloseMarker = TagComponent.bind({});
CustomCloseMarker.args = {
    title: 'MyTag',
    closeMarker: true,
    deleteTagImgUrl: 'assets/oc-ng-common-component/delete.svg'
};

export const WithoutCloseMarker = TagComponent.bind({});
WithoutCloseMarker.args = {
    title: 'MyTag',
    closeMarker: false,
};





