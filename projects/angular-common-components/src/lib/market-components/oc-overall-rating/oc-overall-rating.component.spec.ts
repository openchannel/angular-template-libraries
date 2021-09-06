import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcOverallRatingComponent } from './oc-overall-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { OcLabelComponent } from '@openchannel/angular-common-components/src/lib/common-components';

describe('OcOverallRatingComponent', () => {
    let component: OcOverallRatingComponent;
    let fixture: ComponentFixture<OcOverallRatingComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcOverallRatingComponent, OcLabelComponent],
                imports: [NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcOverallRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show data', async () => {
        component.allReviewSummary = {
            rating: 4.2,
            reviewCount: 10,
            5: 3,
            4: 4,
            3: 2,
            2: 1,
            1: 0,
        };
        component.overallReviewLabel = 'Test Rating';
        fixture.detectChanges();

        const showRating = fixture.debugElement.query(By.css('.overall-rating__rating-result')).nativeElement;
        const showLabel = fixture.debugElement.query(By.css('#reviewLabel')).nativeElement;
        const reviewCount = fixture.debugElement.query(By.css('#reviewCount')).nativeElement;

        await fixture.whenStable().then(() => {
            expect(showRating.textContent).toContain('4.2');
            expect(showLabel.textContent).toContain('Test Rating');
            expect(reviewCount.textContent).toContain('10 reviews');
        });
    });
});
