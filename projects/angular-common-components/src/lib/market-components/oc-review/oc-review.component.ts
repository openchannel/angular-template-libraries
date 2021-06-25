import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../models/oc-review-details-model';

@Component({
    selector: 'oc-review',
    templateUrl: './oc-review.component.html',
    styleUrls: ['./oc-review.component.scss'],
})
export class OcReviewComponent implements OnInit {
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
    /** Form for the review. */
    reviewForm: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.generateForm(this.reviewData);
    }

    generateForm(reviewData?: Review): void {
        this.reviewForm = this.fb.group({
            rating: [reviewData?.rating || null, [Validators.required]],
            headline: [reviewData?.headline || '', [Validators.required]],
            description: [reviewData?.description || '', [Validators.required]],
        });
    }
}
