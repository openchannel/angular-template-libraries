import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../models/oc-review-details-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'oc-review',
    templateUrl: './oc-review.component.html',
    styleUrls: ['./oc-review.component.scss'],
})
export class OcReviewComponent implements OnInit, OnDestroy {
    /**
     * (Optional)
     * Heading of the Review component. If not set - heading would not appear.
     */
    @Input() heading: string = '';
    /**
     * (Optional)
     * Shows the `cancel` and `submit` buttons of the component.
     * Buttons will not be shown by default.
     * @default false
     */
    @Input() enableButtons: boolean = false;
    /**
     * (Optional)
     * Text of the `cancel` button.
     * @default 'Cancel'
     */
    @Input() cancelButtonText: string = 'Cancel';
    /**
     * (Optional)
     * Text of the `submit` button.
     * @default 'Submit'
     */
    @Input() submitButtonText: string = 'Submit';
    /**
     * (Optional)
     * Hid only the `cancel` button.
     * @default false
     */
    @Input() hidCancelButton: boolean = false;
    /**
     * Data of the review from the user.
     */
    @Input() reviewData: Review;
    /**
     * Emits the fresh Review data to the parent component on `submit` button click or on form value changes.
     */
    @Output() readonly reviewFormData: EventEmitter<Review> = new EventEmitter<Review>();
    /**
     * Emits to the parent that `cancel` button was pressed and review has been canceled.
     */
    @Output() readonly cancelReview: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** Emits the form valid status to a parent */
    @Output() readonly isFormInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** Form for the review. */
    reviewForm: FormGroup;
    /**
     * Subject for control of the form subscription life cycle
     * @private
     */
    private destroy$: Subject<void> = new Subject();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.generateForm(this.reviewData);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Generating form with review data if it applied.
     * @param reviewData review data input. Necessary for the review editing
     */
    generateForm(reviewData?: Review): void {
        this.reviewForm = this.fb.group({
            rating: [reviewData?.rating ? reviewData.rating / 100 : null, [Validators.required]],
            headline: [reviewData?.headline, [Validators.required]],
            description: [reviewData?.description || '', [Validators.required]],
        });
        if (!this.enableButtons) {
            this.subscribeToForm();
        }
    }

    /**
     * Function for the `submit` button. Triggers on click,
     * checking form and emits review data if form is valid. Otherwise, invalid form fields will be highlighted.
     */
    submitReview(): void {
        if (this.reviewForm.valid) {
            this.reviewFormData.emit(this.fillReviewData());
        } else {
            this.reviewForm.markAllAsTouched();
        }
    }

    clearForm(): void {
        this.reviewForm.reset();
        this.cancelReview.emit(true);
    }

    /**
     * Fills review data from a previous data, new data from a form and parse rating.
     * @private
     * @return Review
     */
    private fillReviewData(): Review {
        let resultData: Review;
        resultData = {
            ...this.reviewForm.getRawValue(),
            rating: this.reviewForm.get('rating').value * 100,
        };
        return resultData;
    }

    /**
     * Listening to value changes of the form if buttons not applied.
     * @private
     */
    private subscribeToForm(): void {
        this.isFormInvalid.emit(this.reviewForm.valid);
        this.reviewFormData.emit(this.fillReviewData());

        this.reviewForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.isFormInvalid.emit(this.reviewForm.valid);
            this.reviewFormData.emit(this.fillReviewData());
        });
    }
}
