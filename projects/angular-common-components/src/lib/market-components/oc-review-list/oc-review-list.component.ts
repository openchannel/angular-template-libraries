import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { OCReviewDetails } from '../models/oc-review-details-model';

@Component({
    selector: 'oc-review-list',
    templateUrl: './oc-review-list.component.html',
    styleUrls: ['./oc-review-list.component.scss'],
})
export class OcReviewListComponent implements OnChanges {
    baseReviewsList: OCReviewDetails[] = [];

    /**
     * Review list title.
     * @type {string}.
     * Default 'Most recent reviews'.
     */
    @Input() reviewListTitle = 'Most recent reviews';

    /**
     * The total review count of the list.
     * @type {number}.
     */
    @Input() totalReview: number;

    /**
     * The maximum number of reviews to display.
     * @type {number}.
     * Default 3.
     */
    @Input() maxReviewDisplay: number = 3;

    /**
     * Text showing when the review list is empty.
     * @type {string}.
     * Default 'There is no review for this app'.
     */
    @Input() noReviewMessage = 'There is no review for this app.';

    /**
     * Sets the baseReviewsList and displayedReviews arrays.
     * If not empty, calls toggleDisplay().
     * @type {OCReviewDetails[]}.
     */
    @Input() set reviewsList(list: OCReviewDetails[]) {
        if (list) {
            this.baseReviewsList = list;
            this.displayedReviews = [...list];
        }
        if (this.baseReviewsList && this.baseReviewsList.length > 0) {
            this.toggleDisplay();
        }
    }

    /**
     * Event emitter for writing a new review.
     * @type {*}.
     */
    @Output() readonly writeAReview = new EventEmitter<any>();

    displayedReviews: OCReviewDetails[] = [];

    constructor() {}

    /**
     * Checks for any changes in the component.
     * Updates displayedReviews to basic value.
     * Calls toggleDisplay().
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.maxReviewDisplay && this.maxReviewDisplay) {
            if (changes.maxReviewDisplay.previousValue !== changes.maxReviewDisplay.currentValue) {
                this.displayedReviews = [...this.baseReviewsList];
                this.toggleDisplay();
            }
        }
    }

    /**
     * Emits writeReview value to a parent component.
     */
    writeReview(): void {
        this.writeAReview.emit();
    }

    /**
     * Checks the displayReviews length.
     * If it equals maxReviewDisplay => updates displayedReviews to a basic value.
     * Else => changes the displayedReviews length.
     */
    toggleDisplay(): void {
        if (this.displayedReviews.length === this.maxReviewDisplay) {
            this.displayedReviews = [...this.baseReviewsList];
        } else {
            this.displayedReviews.splice(this.maxReviewDisplay);
        }
    }
}
