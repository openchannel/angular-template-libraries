import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFullImageGalleryViewModalComponent } from './oc-full-image-gallery-view-modal.component';
import { MockSvgIconComponent, MockVideoComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem } from '@openchannel/angular-common-components/src/lib/common-components';

const imageItem: GalleryItem = {
    image: 'https://static.zerochan.net/Yakkun.full.1531987.jpg',
    title: 'Test App Image',
    description: 'Improve and extend your experience right from your own UI',
};

describe('OcFullImageGalleryViewModalComponent', () => {
    let component: OcFullImageGalleryViewModalComponent;
    let fixture: ComponentFixture<OcFullImageGalleryViewModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcFullImageGalleryViewModalComponent, MockSvgIconComponent, MockVideoComponent],
            providers: [NgbActiveModal],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcFullImageGalleryViewModalComponent);
        component = fixture.componentInstance;
        component.galleryItems = [imageItem, imageItem, imageItem];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
