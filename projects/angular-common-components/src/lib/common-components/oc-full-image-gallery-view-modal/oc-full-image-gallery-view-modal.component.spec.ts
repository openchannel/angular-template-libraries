import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFullImageGalleryViewModalComponent } from './oc-full-image-gallery-view-modal.component';
import { MockSvgIconComponent, MockVideoComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem } from '@openchannel/angular-common-components/src/lib/common-components';
import { By } from '@angular/platform-browser';

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

    it('should hide details', () => {
        component.showDetails = false;
        fixture.detectChanges();
        const detailsBlock = fixture.debugElement.query(By.css('.full-image-gallery-modal__details'));
        expect(detailsBlock).toBeFalsy();
    });

    it('should show image and description', () => {
        const detailsBlock = fixture.debugElement.query(By.css('.full-image-gallery-modal__details')).nativeElement;
        const image = fixture.debugElement.query(By.css('.full-image-gallery-modal__item-image')).nativeElement;
        const title = fixture.debugElement.query(By.css('.full-image-gallery-modal__details-title')).nativeElement;
        const description = fixture.debugElement.query(By.css('.full-image-gallery-modal__details-description')).nativeElement;
        expect(detailsBlock).toBeTruthy();
        expect(image).toBeTruthy();
        expect(title.textContent).toEqual('Test App Image');
        expect(description.textContent).toEqual(' Improve and extend your experience right from your own UI ');
    });

    it('should change slide on click', () => {
        const arrowRight = fixture.debugElement.query(By.css('.full-image-gallery-modal__carousel-nav-right')).nativeElement;
        const arrowLeft = fixture.debugElement.query(By.css('.full-image-gallery-modal__carousel-nav-left')).nativeElement;
        arrowRight.click();

        fixture.detectChanges();
        expect(component.activeItemIdx).toEqual(1);

        arrowLeft.click();
        fixture.detectChanges();
        expect(component.activeItemIdx).toEqual(0);
    });

    it('should change slides be arrow key press', () => {
        const eventRight = new KeyboardEvent('keyup', {
            code: 'ArrowRight',
        });
        const eventLeft = new KeyboardEvent('keyup', {
            code: 'ArrowLeft',
        });
        window.dispatchEvent(eventRight);
        fixture.detectChanges();
        expect(component.activeItemIdx).toEqual(1);

        window.dispatchEvent(eventLeft);
        fixture.detectChanges();
        expect(component.activeItemIdx).toEqual(0);
    });
});
