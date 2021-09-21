import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFullImageGalleryViewModalComponent } from './oc-full-image-gallery-view-modal.component';

describe('OcFullImageGalleryViewModalComponent', () => {
  let component: OcFullImageGalleryViewModalComponent;
  let fixture: ComponentFixture<OcFullImageGalleryViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcFullImageGalleryViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFullImageGalleryViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
