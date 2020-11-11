import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcReviewListComponent} from './oc-review-list.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oc-button',
  template: ''
})
export class ButtonMockComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() class: string;
  @Input() style: string;
  @Input() process: string;
}

@Component({
  selector: 'oc-rating',
  template: ''
})
export class RatingMockComponent {
  @Input() type: 'single-star' | 'multi-star' = 'single-star';
  @Input() rating: number = 0;
  @Input() reviewCount: number = 0;
  @Input() label: string = '';
  @Input() labelClass: string = 'font-m font-med';
}
describe('OcReviewListComponent', () => {
  let component: OcReviewListComponent;
  let fixture: ComponentFixture<OcReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcReviewListComponent, ButtonMockComponent, RatingMockComponent],
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

    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    const emptyData: HTMLHeadingElement = fixture.debugElement.query(By.css('h1')).nativeElement;

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

    const reviewName: HTMLHeadingElement = fixture.debugElement.query(By.css('h4')).nativeElement;
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

    const button = fixture.debugElement.query(By.css('.drop-down')).nativeElement;
    button.click();

    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(button.textContent).toContain('Collapse');
    });
  });
});
