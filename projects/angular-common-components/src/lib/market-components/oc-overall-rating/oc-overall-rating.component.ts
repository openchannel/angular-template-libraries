import { Component, Input } from '@angular/core';
import { OverallRatingSummary } from '../models/overall-rating-summary-model';

@Component({
    selector: 'oc-overall-rating',
    templateUrl: './oc-overall-rating.component.html',
    styleUrls: ['./oc-overall-rating.component.scss'],
})
export class OcOverallRatingComponent {
    rates: number[] = [5, 4, 3, 2, 1];

    @Input() overallReviewLabel = 'Overall rating';

    @Input() allReviewSummary: OverallRatingSummary = new OverallRatingSummary();

}
