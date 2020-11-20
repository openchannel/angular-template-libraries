import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcReviewListComponent} from './oc-review-list.component';

describe('OcReviewListComponent', () => {
  let component: OcReviewListComponent;
  let fixture: ComponentFixture<OcReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcReviewListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
