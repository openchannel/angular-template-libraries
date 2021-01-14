import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcImageGalleryComponent } from './oc-image-gallery.component';
import { GalleryItem } from 'oc-ng-common-service';
import { By } from '@angular/platform-browser';
import { Component, SimpleChange } from '@angular/core';

describe('OcImageGalleryComponent', () => {
  let component: OcImageGalleryComponent;
  let fixture: ComponentFixture<OcImageGalleryComponent>;

  const imageItem: GalleryItem = {
    image: 'https://drive.google.com/u/0/uc?id=1AZ2zszice2XcGojhCLz1A2TideF_cev_&export=download',
    title: 'Test Image',
    description: 'Improve and extend your experience right from your own UI'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcImageGalleryComponent ]
    })
    .compileComponents();
  }));

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
      maxItems: new SimpleChange(3, component.maxItems, true)
    });
    fixture.detectChanges();

    expect(component.displayGallery.length).toEqual(5);
  });
});
