import { moduleMetadata } from '@storybook/angular';
import {
    GalleryItem,
    OcCommonLibModule,
    OcFullImageGalleryViewModalComponent,
} from '@openchannel/angular-common-components/src/lib/common-components';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';

const modules = {
    imports: [OcCommonLibModule, CarouselModule, BrowserAnimationsModule, AngularSvgIconModule],
};

export default {
    title: 'Full Image Gallery View Modal [BEM]',
    component: OcFullImageGalleryViewModalComponent,
    decorators: [moduleMetadata(modules)],
    parameters: {
        layout: 'centered',
    },
};

const imageItem: GalleryItem = {
    image: 'https://static.zerochan.net/Yakkun.full.1531987.jpg',
    title: 'Test App Image',
    description: 'Improve and extend your experience right from your own UI',
};

const imageItem2: GalleryItem = {
    image: 'https://static.zerochan.net/Cola.Gotouryouta.full.1501202.jpg',
    title: 'Test App Image',
    description:
        'Improve and extend your experience right from your own UI.' +
        ' Improve and extend your experience right from your own UI. Improve and extend your experience right from your own UI.' +
        ' Improve and extend your experience right from your own UI',
};
const anotherImageItem: GalleryItem = {
    image: 'https://static.zerochan.net/Wenqing.Yan.full.2318589.jpg',
    title: 'Test App Image',
    description:
        'Improve and extend your experience right from your own UI. Improve and extend your experience right from your own UI.' +
        ' Improve and extend your experience right from your own UI. Improve and extend your experience right from your own UI',
};

const videoItem: GalleryItem = {
    video: 'https://youtu.be/L_LUpnjgPso',
    title: 'Test App Video',
    description: 'Improve and extend your experience right from your own UI',
};

const GalleryModal = (args: OcFullImageGalleryViewModalComponent) => ({
    component: OcFullImageGalleryViewModalComponent,
    moduleMetadata: modules,
    props: args,
});

export const OneImageView = GalleryModal.bind({});

OneImageView.args = {
    galleryItems: [imageItem, imageItem2, anotherImageItem, videoItem, imageItem],
    activeItemIdx: 2,
    showDetails: true,
    componentIconsPath: {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
        closeIcon: 'assets/angular-common-components/close-icon.svg',
    },
};
