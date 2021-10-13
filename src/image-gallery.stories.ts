import { moduleMetadata } from '@storybook/angular';
import { OcImageGalleryComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { GalleryItem, OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule, CarouselModule, BrowserAnimationsModule],
};

export default {
    title: 'Image Gallery [BEM]',
    component: OcImageGalleryComponent,
    decorators: [moduleMetadata(modules)],
};

const ImageGalleryComponent = (args: OcImageGalleryComponent) => ({
    component: OcImageGalleryComponent,
    moduleMetadata: modules,
    props: args,
});

const imageItem: GalleryItem = {
    image: 'https://static.zerochan.net/Cola.Gotouryouta.full.1501202.jpg',
    title: 'Test App Image',
    description: 'Improve and extend your experience right from your own UI',
};

const anotherImageItem: GalleryItem = {
    image: 'https://static.zerochan.net/Yakkun.full.1531987.jpg',
    title: 'Test App Image',
    description: 'Improve and extend your experience right from your own UI',
};

const imageItem2: GalleryItem = {
    image: 'https://static.zerochan.net/Wenqing.Yan.full.2318589.jpg',
    title: 'Test App Image',
    description: 'Improve and extend your experience right from your own UI',
};

const videoItem: GalleryItem = {
    video: 'https://youtu.be/L_LUpnjgPso',
    title: 'Test App Video',
    description: 'Improve and extend your experience right from your own UI',
};

export const SmallGallery = ImageGalleryComponent.bind({});

SmallGallery.args = {
    gallery: [imageItem, imageItem, imageItem],
    maxItems: 3,
    displayDetails: true,
    mediaDimensions: { width: '100%', height: '192px' },
};

export const ExtendedGallery = ImageGalleryComponent.bind({});

ExtendedGallery.args = {
    gallery: [imageItem, imageItem2, anotherImageItem, imageItem, videoItem, imageItem, anotherImageItem, anotherImageItem],
    displayDetails: true,
    maxItems: 8,
    mediaDimensions: { width: '100%', height: '192px' },
    expandOnClick: true,
    componentIconsPath: {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
    },
};

export const CarouselGallery = ImageGalleryComponent.bind({});

CarouselGallery.args = {
    gallery: [imageItem, imageItem2, anotherImageItem, imageItem, videoItem, imageItem, anotherImageItem, anotherImageItem],
    displayDetails: true,
    allowArrowControllers: true,
    mediaDimensions: { width: '100%', height: '192px' },
    componentIconsPath: {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
    },
};
