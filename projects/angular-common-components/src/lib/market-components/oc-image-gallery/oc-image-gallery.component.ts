import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GalleryItem } from '@openchannel/angular-common-components/src/lib/common-components';

/**
 * Image gallery component. Show list of images with title and description.
 *
 * Inputs:
 * @param {GalleryItem[]} gallery
 * @param {number} maxItems
 * <br>
 * @example <oc-image-gallery [gallery]="[{image: '/img.png', title: 'Image', descriptiom: 'Description of image'}]" [maxItems]="5">
 */
@Component({
    selector: 'oc-image-gallery',
    templateUrl: './oc-image-gallery.component.html',
    styleUrls: ['./oc-image-gallery.component.scss'],
})
export class OcImageGalleryComponent implements AfterContentInit, OnChanges {
    /**
     * Array of the gallery images. Must contain a values:
     * 'image', 'title', 'description'
     */
    @Input() set gallery(value: GalleryItem[]) {
        this.mainGallery = [...value];
    }

    /** Quantity of images that will be shown */
    @Input() maxItems: number = 3;

    /** Main input gallery array */
    mainGallery: GalleryItem[] = [];

    /** Spliced array */
    displayGallery: GalleryItem[] = [];

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

    /**
     * Get data from main gallery and cut everything above the maximum value
     */
    private changeMaxImagesView(): void {
        this.displayGallery = [...this.mainGallery];
        this.displayGallery.splice(this.maxItems);
    }
}
