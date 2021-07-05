import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcReviewComponent } from './oc-review.component';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockRatingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { MockTextareaComponent } from '@openchannel/angular-common-components/src/lib/form-components/oc-form/oc-form.component.spec';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
