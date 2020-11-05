import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcOverallRatingComponent} from './oc-overall-rating.component';
import { OcLabelComponent } from '../oc-label/oc-label.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('OcOverallRatingComponent', () => {
  let component: OcOverallRatingComponent;
  let fixture: ComponentFixture<OcOverallRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcOverallRatingComponent, OcLabelComponent],
      imports: [NgbModule]
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
