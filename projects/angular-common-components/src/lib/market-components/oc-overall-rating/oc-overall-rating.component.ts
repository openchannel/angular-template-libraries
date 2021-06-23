import { Component, Input } from '@angular/core';
import { OverallRatingSummary } from '../models/overall-rating-summary-model';

/**
 * Overall rating component. Based on ngb-rating component. Represents rating template and logic.
 *
 * Inputs: <br>
 * @param {string} overallReviewLabel
 * @param {OverallRatingSummary} allReviewSummary
 *
 * @example <oc-overall-rating [overallReviewLabel]="Custom Label" [allReviewSummary]="{rating: 5, reviewCount:1}">
 */
@Component({
    selector: 'oc-overall-rating',
    templateUrl: './oc-overall-rating.component.html',
    styleUrls: ['./oc-overall-rating.component.scss'],
})
export class OcOverallRatingComponent {
    /**
     * Rates data.
     *
     * Default:  `[5, 4, 3, 2, 1]`
     */
    rates: number[] = [5, 4, 3, 2, 1];

    /**
     * Label for overall review.
     */
    @Input() overallReviewLabel: string = 'Overall rating';

    /**
     * Review summary data.
     */
    @Input() allReviewSummary: OverallRatingSummary = new OverallRatingSummary();
}
