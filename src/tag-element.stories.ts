import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcTagElementComponent } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Tag element [BEM]',
    component: OcTagElementComponent,
    decorators: [moduleMetadata(modules)],
};

const TagComponent = (args: OcTagElementComponent) => ({
    component: OcTagElementComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultOneTag = TagComponent.bind({});

DefaultOneTag.args = {
    title: 'MyTag',
    width: '15%',
    closeMarker: true,
};

export const CustomCloseMarker = TagComponent.bind({});
CustomCloseMarker.args = {
    title: 'MyTag',
    closeMarker: true,
    deleteTagImgUrl: 'assets/angular-common-components/delete.svg',
};

export const WithoutCloseMarker = TagComponent.bind({});
WithoutCloseMarker.args = {
    title: 'MyTag',
    closeMarker: false,
};
