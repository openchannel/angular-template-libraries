import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import { OcImageGalleryComponent } from '../projects/oc-ng-common-component/src/lib/oc-image-gallery/oc-image-gallery.component';
import { GalleryItem } from 'oc-ng-common-service';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Image Gallery',
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
  image: 'https://drive.google.com/u/0/uc?id=1AZ2zszice2XcGojhCLz1A2TideF_cev_&export=download',
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


