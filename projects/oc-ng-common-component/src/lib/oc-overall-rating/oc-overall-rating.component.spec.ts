import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcOverallRatingComponent} from './oc-overall-rating.component';

describe('OcOverallRatingComponent', () => {
  let component: OcOverallRatingComponent;
  let fixture: ComponentFixture<OcOverallRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcOverallRatingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcOverallRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
