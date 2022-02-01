import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    GalleryItem,
    GalleryIconsAssets,
    GalleryMediaDimensions,
    OcFullImageGalleryViewModalComponent,
} from '@openchannel/angular-common-components/src/lib/common-components';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Image gallery component. Show list of images with title and description.
 *
 * @example
 * <oc-image-gallery [gallery]="[{image: "/img.png", title: "Image", description: "Description of image"}]"
 *                   [maxItems]="5" [displayDetails]="true"
 *                   [allowArrowControllers]="true"
 *                   [mediaDimensions]="{width: "auto", height: "192px"}"
 *                   [expandOnClick]="true">
 */
@Component({
    selector: 'oc-image-gallery',
    templateUrl: './oc-image-gallery.component.html',
    styleUrls: ['./oc-image-gallery.component.css'],
})
export class OcImageGalleryComponent implements AfterContentInit, OnChanges {
    /**
     * Array of the gallery images.
     */
    @Input() set gallery(value: GalleryItem[]) {
        this.mainGallery = [...value];
    }

    /** Quantity of images that will be shown */
    @Input() maxItems: number = 3;
    /**
     * Display of title and description of the gallery item. Details are displayed by default.
     *
     * @default true
     */
    @Input() displayDetails: boolean = true;
    /**
     * This parameter changes the gallery display. If arrow controllers are applied - gallery will be displayed as carousel.
     * Otherwise as grid. Default: grid.
     *
     * @default false
     */
    @Input() allowArrowControllers: boolean = false;

    /** Custom dimensions of the media content */
    @Input() mediaDimensions: GalleryMediaDimensions = {
        width: '100%',
        height: '192px',
    };
    /**
     * Allow opening full size of the media item by click.
     * This will call a modal window with slider. Disabled by default
     * @default false
     */
    @Input() expandOnClick: boolean = false;
    /**
     * Options for the carousel. You can rewrite this options or add new
     *
     * #### default
     * ```
     * { loop: true,
     *  mouseDrag: true,
     *  touchDrag: false,
     *  pullDrag: true,
     *  dots: false,
     *  autoWidth: true,
     *  navSpeed: 700,
     *  navText: ['', ''],
     *  responsive: {
     *       0: {
     *           items: 1,
     *       },
     *       400: {
     *           items: 1,
     *       },
     *       740: {
     *           items: 2,
     *       },
     *       940: {
     *           items: 3,
     *       },
     *   },
     *   nav: false,
     * }
     * ```
     */
    @Input() carouselOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: true,
        dots: false,
        autoWidth: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
            },
            400: {
                items: 1,
                touchDrag: true,
            },
            740: {
                items: 2,
                touchDrag: true,
            },
            940: {
                items: 3,
            },
        },
        nav: false,
    };
    /**
     * Config for paths of the icons used in this component.
     * You can change icons by setting a new path in this config or create an `angular-common-components`
     * folder in your `assets`, and then add your icon with the name from this config.
     */
    @Input() componentIconsPath: GalleryIconsAssets = {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
    };

    /** Main input gallery array */
    mainGallery: GalleryItem[] = [];

    /** Spliced array */
    displayGallery: GalleryItem[] = [];

    constructor(private modal: NgbModal) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.maxItems && this.maxItems) {
            if (changes.maxItems.previousValue !== changes.maxItems.currentValue) {
                this.changeMaxImagesView();
            }
        }
    }

    ngAfterContentInit(): void {
        this.changeMaxImagesView();
    }

    openMediaModal(index: number): void {
        if (this.expandOnClick) {
            const mediaModalRef = this.modal.open(OcFullImageGalleryViewModalComponent, {
                centered: true,
                size: 'auto',
                windowClass: 'media-modal',
            });
            mediaModalRef.componentInstance.galleryItems = this.displayGallery;
            mediaModalRef.componentInstance.activeItemIdx = index;
            mediaModalRef.componentInstance.showDetails = this.displayDetails;
        }
    }

    /**
     * Get data from main gallery and cut everything above the maximum value
     */
    private changeMaxImagesView(): void {
        this.displayGallery = [...this.mainGallery];

        if (this.allowArrowControllers) {
            return;
        }

        this.displayGallery.splice(this.maxItems);
    }
}
