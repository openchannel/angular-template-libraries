import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * A rating component. Shows the application rate.
 * Can be a single- and a multi-star type.
 * Contains a rate in stars icons and a text label with numeric value.
 */
@Component({
    selector: 'oc-rating',
    templateUrl: './oc-rating.component.html',
    styleUrls: ['./oc-rating.component.css'],
})
export class OcRatingComponent {
    /**
     * Type of Rating to show. Can be `multi-star` or `multi-star`.
     * @type {string}.
     * @default 'single-star'.
     */
    @Input() type: 'single-star' | 'multi-star' = 'single-star';

    /**
     * The numeric value of rating to show in the rating label.
     * @type {number}.
     * @default 0.
     */
    @Input() rating: number = 0;

    /**
     * The number of the application reviews.
     * @type {number}.
     * @default 0.
     */
    @Input() reviewCount: number = 0;

    /**
     * Text that can be added near the review count.
     * @type {string}.
     * @default ''.
     */
    @Input() label: string = '';

    /**
     * List of the custom public classes that can be added to the label.
     * @type {string}.
     * @default 'medium md'.
     */
    @Input() labelClass: string = 'medium md';

    constructor(config: NgbRatingConfig) {
        config.max = 5;
        config.readonly = true;
    }
}
