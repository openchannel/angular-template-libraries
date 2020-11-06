import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcRatingComponent} from './oc-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('OcRatingComponent', () => {
  let component: OcRatingComponent;
  let fixture: ComponentFixture<OcRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcRatingComponent],
      imports: [NgbModule]
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

  it('should show rating and review data', async () => {
    component.rating = 5;
    component.reviewCount = 10;
    component.label = 'reviews';

    const ratingInfo = fixture.debugElement.query(By.css('span')).nativeElement;
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(ratingInfo.textContent).toContain('5 (10 reviews)');
    });
  });
});
