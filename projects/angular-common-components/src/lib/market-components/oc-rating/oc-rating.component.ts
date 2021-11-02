import { Component, forwardRef, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * A rating component. Shows the application rate.
 * Can be a single- and a multi-star type.
 * Contains a rate in stars icons and a text label with numeric value.
 */
@Component({
    selector: 'oc-rating',
    templateUrl: './oc-rating.component.html',
    styleUrls: ['./oc-rating.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcRatingComponent),
            multi: true,
        },
    ],
})
export class OcRatingComponent implements ControlValueAccessor {
    /**
     * Type of Rating to show. Can be `multi-star` or `single-star`.
     * @type {string}.
     * @default 'single-star'.
     */
    @Input() type: 'single-star' | 'multi-star' = 'single-star';

    /**
     * The numeric value of rating to show in the rating label.
     * @type {number}.
     * @default 0.
     */
    @Input() rating: number;

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

    /**
     * Disabling the rating component. That the user can not interact with it.
     * Component will be used only for displaying
     */
    @Input() disabled: boolean = false;

    constructor(config: NgbRatingConfig) {
        config.max = 5;
        config.readonly = true;
    }

    onLeave(): void {
        this.onTouched();
    }

    /**
     * Calls this function with new value. When user wrote something in the component
     * It needs to know that new data has been entered in the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this function when user left chosen component.
     * It needs for validation
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * (Optional)
     * the method will be called by the control when the [disabled] state changes.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(value: number): void {
        this.rating = value;
    }

    /**
     * Catching rate changes and inform ngForm about value changes.
     */
    onRateChange(newRate: number): void {
        if (newRate > 0) {
            this.rating = newRate;
            this.onChange(this.rating);
        }
    }

    private onTouched = () => {};

    private onChange: (value: any) => void = () => {};
}
