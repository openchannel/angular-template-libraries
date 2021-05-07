import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcReviewListComponent} from './oc-review-list.component';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {MockButtonComponent, MockRatingComponent} from 'oc-ng-common-component/src/mock/mock';

describe('OcReviewListComponent', () => {
  let component: OcReviewListComponent;
  let fixture: ComponentFixture<OcReviewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcReviewListComponent, MockButtonComponent, MockRatingComponent],
      imports: [CommonModule]
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

  it('should show empty data message and heading', () => {
    component.noReviewMessage = 'No reviews has been written yet';
    component.reviewListTitle = 'Most Recent Reviews';

    fixture.detectChanges();

    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('.review-list__empty-result-heading')).nativeElement;
    const emptyData: HTMLHeadingElement = fixture.debugElement.query(By.css('.review-list__header-heading')).nativeElement;

    expect(heading.textContent).toContain('No reviews has been written yet');
    expect(emptyData.textContent).toContain('Most Recent Reviews');
  });

  it('should show reviews', () => {
    component.reviewsList = [
      {
        reviewOwnerName: 'John Doe',
        rating: 5,
        review: 'Cool App!'
      },
      {
        reviewOwnerName: 'Jane Doe',
        rating: 2,
        review: ''
      }
    ];
    fixture.detectChanges();
    const reviewName: HTMLHeadingElement = fixture.debugElement.query(By.css('.review-list__one-review-heading')).nativeElement;
    const reviewText: HTMLDivElement = fixture.debugElement.query(By.css('#reviewText')).nativeElement;

    expect(component.baseReviewsList.length).toBeGreaterThan(0);
    expect(reviewName.textContent).toContain('John Doe');
    expect(reviewText.textContent).toContain('Cool App!');
  });

  it('should emit on button click', () => {
    component.reviewListTitle = 'Most Recent Reviews';

    spyOn(component.writeAReview, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    expect(component.writeAReview.emit).toHaveBeenCalledTimes(1);
  });

  it('should toggle reviews', async () => {
    const oneReview = {
      reviewOwnerName: 'John Doe',
      rating: 5,
      review: 'Cool App!'
    };
    component.reviewListTitle = 'Most Recent Reviews';
    component.maxReviewDisplay = 2;
    component.reviewsList = [oneReview, oneReview, oneReview];
    component.totalReview = 3;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.review-list__drop-down')).nativeElement;
    button.click();

    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(button.textContent).toContain('Collapse');
    });
  });
});
