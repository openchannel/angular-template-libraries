import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcImageGalleryComponent } from './oc-image-gallery.component';

describe('OcImageGalleryComponent', () => {
  let component: OcImageGalleryComponent;
  let fixture: ComponentFixture<OcImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcImageGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
