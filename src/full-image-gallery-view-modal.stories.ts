import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcFullImageGalleryViewModalComponent } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Full Image Gallery View Modal [BEM]',
    component: OcFullImageGalleryViewModalComponent,
    decorators: [moduleMetadata(modules)],
};

const GalleryModal = (args: OcFullImageGalleryViewModalComponent) => ({
    component: OcFullImageGalleryViewModalComponent,
    moduleMetadata: modules,
    props: args,
});

export const OneImageView = GalleryModal.bind({});

OneImageView.args = {
};
