import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcRatingComponent} from './oc-rating.component';

describe('OcRatingComponent', () => {
  let component: OcRatingComponent;
  let fixture: ComponentFixture<OcRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcRatingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
