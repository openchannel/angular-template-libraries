import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppGalleryComponent} from './oc-app-galary.component';

describe('OcAppGalleryComponent', () => {
  let component: OcAppGalleryComponent;
  let fixture: ComponentFixture<OcAppGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppGalleryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
