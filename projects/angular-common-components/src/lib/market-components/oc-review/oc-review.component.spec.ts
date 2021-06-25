import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcReviewComponent } from './oc-review.component';

describe('OcReviewComponent', () => {
  let component: OcReviewComponent;
  let fixture: ComponentFixture<OcReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
