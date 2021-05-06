import {moduleMetadata} from '@storybook/angular';
import {OcImageGalleryComponent} from 'oc-ng-common-component/src/lib/market-components';
import {GalleryItem, OcCommonLibModule} from 'oc-ng-common-component/src/lib/common-components';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Image Gallery [BEM]',
  component: OcImageGalleryComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const ImageGalleryComponent = (args: OcImageGalleryComponent) => ({
  component: OcImageGalleryComponent,
  moduleMetadata: modules,
  props: args
});

const imageItem: GalleryItem = {
  image: './assets/img/get-started.svg',
  title: 'Test App Image',
  description: 'Improve and extend your experience right from your own UI'
};

export const SmallGallery = ImageGalleryComponent.bind({});

SmallGallery.args = {
  gallery: [imageItem, imageItem, imageItem],
  maxItems: 3
};

export const ExtendedGallery = ImageGalleryComponent.bind({});

ExtendedGallery.args = {
  gallery: [imageItem, imageItem, imageItem, imageItem, imageItem, imageItem],
  maxItems: 5
};


