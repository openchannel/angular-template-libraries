import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GalleryItem, GalleryIconsAssets } from '../model/image-gallery.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'oc-full-image-gallery-view-modal',
    templateUrl: './oc-full-image-gallery-view-modal.component.html',
    styleUrls: ['./oc-full-image-gallery-view-modal.component.scss'],
})
export class OcFullImageGalleryViewModalComponent implements OnInit {
    /**
     * Items of the gallery to be shown in this modal by navigation.
     * This is required parameter.
     */
    @Input() galleryItems: GalleryItem[];
    /**
     * Index of the item in array to be shown.
     * First slide will be shown by default.
     * @default 0
     */
    @Input() activeItemIdx: number = 0;
    /**
     * Display of title and description of the gallery item. Details are displayed by default.
     * @default true
     */
    @Input() showDetails: boolean = true;
    /**
     * Config for paths of the icons used in this component.
     * You can change icons by setting a new path in this config or create an `angular-common-components`
     * folder in your `assets`, and then add your icon with the name from this config.
     */
    @Input() componentIconsPath: GalleryIconsAssets = {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
        closeIcon: 'assets/angular-common-components/close-icon.svg',
    };
    /**
     * Control of the current modal actions.
     * @private
     * @ignore
     */
    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }

    ngOnInit(): void {
        this.setWidthOfMedia();
    }

    @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent): void {
        if (event.code === 'ArrowRight') {
            this.nextSlide();
        } else if (event.code === 'ArrowLeft') {
            this.prevSlide();
        }
    }

    /**
     * Changing media item to the next. If it was the last item - first item will be shown again.
     */
    nextSlide(): void {
        if (this.activeItemIdx === this.galleryItems.length - 1) {
            this.activeItemIdx = 0;
        } else {
            this.activeItemIdx++;
        }
    }

    /**
     * Changing media item to the previous. If it was the first item - last item will be shown again.
     */
    prevSlide(): void {
        if (this.activeItemIdx === 0) {
            this.activeItemIdx = this.galleryItems.length - 1;
        } else {
            this.activeItemIdx--;
        }
    }

    /**
     * Closing current modal.
     */
    closeModal(): void {
        this.modal.dismiss();
    }

    setWidthOfMedia(): void {
        this.galleryItems.forEach(item => {
            if (item.image && !item.mediaWidth) {
                const img = new Image();

                img.src = item.image;
                img.onload = event => {
                    item.mediaWidth = (event.target as HTMLImageElement).width;
                };
            }
        });
    }
}
