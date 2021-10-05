import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcImageGalleryComponent } from './oc-image-gallery.component';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { GalleryItem } from '@openchannel/angular-common-components/src/lib/common-components';
import { MockVideoComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { CarouselModule } from 'ngx-owl-carousel-o';

describe('OcImageGalleryComponent', () => {
    let component: OcImageGalleryComponent;
    let fixture: ComponentFixture<OcImageGalleryComponent>;

    const imageItem: GalleryItem = {
        image: '',
        title: 'Test Image',
        description: 'Improve and extend your experience right from your own UI',
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcImageGalleryComponent, MockVideoComponent],
                imports: [CarouselModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcImageGalleryComponent);
        component = fixture.componentInstance;
        component.gallery = [imageItem, imageItem, imageItem, imageItem, imageItem, imageItem];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show images', () => {
        const imageTitle: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
        const imageDescription: HTMLSpanElement = fixture.debugElement.query(By.css('span')).nativeElement;

        expect(imageTitle.textContent).toContain('Test Image');
        expect(imageDescription.textContent).toContain('Improve and extend your experience right from your own UI');
    });

    it('should splice images', () => {
        component.maxItems = 5;
        component.ngOnChanges({
            maxItems: new SimpleChange(3, component.maxItems, true),
        });
        fixture.detectChanges();

        expect(component.displayGallery.length).toEqual(5);
    });
});
