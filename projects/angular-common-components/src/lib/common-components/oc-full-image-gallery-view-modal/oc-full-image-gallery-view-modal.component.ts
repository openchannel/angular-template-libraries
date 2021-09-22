import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GalleryItem, GalleryIconsAssets } from '../model/image-gallery.model';

@Component({
    selector: 'oc-full-image-gallery-view-modal',
    templateUrl: './oc-full-image-gallery-view-modal.component.html',
    styleUrls: ['./oc-full-image-gallery-view-modal.component.scss'],
})
export class OcFullImageGalleryViewModalComponent implements OnInit {
    @Input() galleryItems: GalleryItem[];

    @Input() activeItemIdx: number;

    @Input() showDetails: boolean = true;

    @Input() componentIconsPath: GalleryIconsAssets = {
        arrowLeft: 'assets/angular-common-components/arrow-left-analog.svg',
        arrowRight: 'assets/angular-common-components/arrow-right-analog.svg',
        closeIcon: 'assets/angular-common-components/close-icon.svg',
    };

    modalWidth: number = null;

    carouselOptions: OwlOptions = {
        loop: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: true,
        dots: false,
        autoWidth: true,
        navSpeed: 700,
        navText: ['', ''],
        nav: false,
        center: true,
        items: 1,
    };
    constructor() {}

    ngOnInit(): void {
        this.getImagesWidth();
    }

    getImagesWidth(): void {
        this.galleryItems.forEach(item => {
            if (item.image) {
                const img = new Image();
                img.src = item.image;

                img.onload = event => {
                    item.mediaWidth = (event.currentTarget as HTMLImageElement).width;
                };
            } else {
                item.mediaWidth = null;
            }
        });
        setTimeout(() => {
            this.modalWidth = this.galleryItems[0].mediaWidth;
        }, 0);
    }

    nextSlide(): void {
        if (this.activeItemIdx === this.galleryItems.length) {
            this.activeItemIdx = 0;
        } else {
            this.activeItemIdx++;
        }
    }

    prevSlide(): void {
        if (this.activeItemIdx === 0) {
            this.activeItemIdx = this.galleryItems.length - 1;
        } else {
            this.activeItemIdx--;
        }
    }
}
