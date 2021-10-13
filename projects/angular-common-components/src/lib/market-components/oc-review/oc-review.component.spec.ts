import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcReviewComponent } from './oc-review.component';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockRatingComponent,
    MockTextareaComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('OcReviewComponent', () => {
    let component: OcReviewComponent;
    let fixture: ComponentFixture<OcReviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                OcReviewComponent,
                MockRatingComponent,
                MockButtonComponent,
                MockInputComponent,
                MockTextareaComponent,
                MockErrorComponent,
                MockLabelComponent,
            ],
            imports: [FormsModule, ReactiveFormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcReviewComponent);
        component = fixture.componentInstance;
        component.enableButtons = true;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show heading', () => {
        fixture.detectChanges();
        component.heading = 'Test Heading';
        fixture.detectChanges();
        const heading = fixture.debugElement.query(By.css('.review__heading')).nativeElement;
        expect(heading.textContent).toEqual('Test Heading');
    });

    it('should clear form on Cancel', () => {
        fixture.detectChanges();
        component.reviewForm.get('rating').setValue(300);
        component.reviewForm.get('headline').setValue('Test Review');
        component.reviewForm.get('description').setValue('Test');

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.review__button-cancel')).nativeElement.click();

        expect(component.reviewForm.getRawValue()).toEqual({ rating: null, headline: null, description: null });
    });

    it('should submit the review', () => {
        fixture.detectChanges();
        jest.spyOn(component.reviewFormData, 'emit');
        component.reviewForm.get('rating').setValue(300);
        component.reviewForm.get('headline').setValue('Test Review');
        component.reviewForm.get('description').setValue('Test');

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.review__button-submit')).nativeElement.click();

        expect(component.reviewFormData.emit).toHaveBeenCalledTimes(1);
        expect(component.reviewForm.getRawValue()).toEqual({ rating: 300, headline: 'Test Review', description: 'Test' });
    });

    it('should submit the review with disabled buttons', () => {
        component.enableButtons = false;
        fixture.detectChanges();
        jest.spyOn(component.reviewFormData, 'emit');
        component.reviewForm.get('rating').setValue(500);
        component.reviewForm.get('headline').setValue('Test Review2');
        component.reviewForm.get('description').setValue('Test2');

        fixture.detectChanges();

        expect(component.reviewFormData.emit).toHaveBeenCalledTimes(3);
    });
});
