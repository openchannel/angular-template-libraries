import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcRatingComponent } from './oc-rating.component';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcRatingComponent', () => {
    let component: OcRatingComponent;
    let fixture: ComponentFixture<OcRatingComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcRatingComponent, MockSvgIconComponent],
                imports: [NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show rating and review data', () => {
        component.rating = 5;
        component.reviewCount = 10;
        component.label = 'reviews';
        fixture.detectChanges();

        const ratingInfo = fixture.debugElement.query(By.css('span')).nativeElement;
        expect(ratingInfo.textContent).toContain('5.0 (10 reviews)');
    });

    it('should render correct template depending on type', () => {
        component.type = 'single-star';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.oc-rating-single'))).toBeTruthy();

        component.type = 'multi-star';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.oc-rating-multi'))).toBeTruthy();
    });

    it('should call onChange, when ngb-rating emits rateChange', () => {
        const newRating = 5;

        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        component.type = 'multi-star';
        fixture.detectChanges();

        const ngbRatingDE = fixture.debugElement.query(By.directive(NgbRating));
        ngbRatingDE.triggerEventHandler('rateChange', newRating);

        expect(onChangeFunc).toHaveBeenCalledWith(newRating);
        expect(component.rating).toBe(newRating);
    });

    it('should not call onChange, when onRateChange called with rating < 0', () => {
        const oldRating = component.rating;

        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        component.type = 'multi-star';
        fixture.detectChanges();

        component.onRateChange(-1);

        expect(onChangeFunc).not.toHaveBeenCalled();
        expect(component.rating).toBe(oldRating);
    });

    it('should call onTouched, when ngb-rating emits leave', () => {
        const onTouchedFunc = jest.fn();
        component.registerOnTouched(onTouchedFunc);

        component.type = 'multi-star';
        fixture.detectChanges();

        const ngbRatingDE = fixture.debugElement.query(By.directive(NgbRating));
        ngbRatingDE.triggerEventHandler('leave', {});

        expect(onTouchedFunc).toHaveBeenCalled();
    });

    it('ngb-rating readonly property should depend on disabled component property', () => {
        component.type = 'multi-star';
        fixture.detectChanges();

        const ngbRating = fixture.debugElement.query(By.directive(NgbRating)).componentInstance;

        component.setDisabledState(false);
        fixture.detectChanges();
        expect(ngbRating.readonly).toBeFalsy();

        component.setDisabledState(true);
        fixture.detectChanges();
        expect(ngbRating.readonly).toBeTruthy();
    });

    it('writeValue should set rating component property', () => {
        const newRating = 5;

        component.type = 'multi-star';
        fixture.detectChanges();

        const ngbRating = fixture.debugElement.query(By.directive(NgbRating)).componentInstance;

        component.writeValue(newRating);
        fixture.detectChanges();
        expect(ngbRating.rate).toBe(newRating);
    });

    it('should set labelClass to label', () => {
        const labelClass = 'custom-label-class';

        component.labelClass = labelClass;
        component.type = 'single-star';
        fixture.detectChanges();

        const label = fixture.debugElement.query(By.css('.oc-rating-single__label'));
        expect(label.properties.className).toContain(labelClass);
    });
});
