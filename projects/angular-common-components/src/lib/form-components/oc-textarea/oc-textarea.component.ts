import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-textarea',
    templateUrl: './oc-textarea.component.html',
    styleUrls: ['./oc-textarea.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcTextareaComponent),
            multi: true,
        },
    ],
})
export class OcTextareaComponent implements ControlValueAccessor {
    /**
     * A text for textarea placeholder.
     * @type {string}.
     * Default empty.
     */
    @Input() set placeholder(placeholder: string) {
        if (placeholder) {
            this.placeholderValue = placeholder;
        }
    }

    /**
     * Add a custom class or class list to the textarea.
     * Classes can be separated by a space.
     * @type {string}.
     * Optional.
     * Default empty.
     */
    @Input() customClass: string = '';

    /**
     * A value that can enable/disable the field.
     * @type {boolean}.
     * Optional.
     * Default false.
     */
    @Input() disabled: boolean = false;

    /**
     * A value that shows whether the field is required or not.
     * @type {boolean}.
     * Optional.
     * Default false.
     */
    @Input() required: boolean = false;

    /**
     * The number of rows in textarea field.
     * @type {number}.
     * Optional.
     * Default '5'.
     */
    @Input() rows: number = 5;

    /**
     * Set initial textarea value to be shown.
     * @type {string}.
     * Optional.
     * Default empty.
     */
    @Input() set value(val: string) {
        this.textAreaValue = val;
        this.onChange(this.textAreaValue);
    }

    textAreaValue: string;
    placeholderValue: string = '';

    /**
     * Detects changes of the control value, and dynamically rewrites it.
     */
    changeModelVal(): void {
        this.onChange(this.textAreaValue);
    }

    /**
     * Registers touch action.
     */
    onFocus(): void {
        this.onTouched();
    }

    /**
     * Calls this function with new value. When user writes something in the component,
     * it needs to know that new data has entered the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this function when user leaves chosen component.
     * It needs for validation.
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * The method will be called by the control when the [disabled] state changes.
     * Optional.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * This method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        this.textAreaValue = obj;
    }

    // tslint:disable-next-line:prettier
    private onTouched = () => { // NOSONAR
    };
    // tslint:disable-next-line:prettier
    private onChange: (value: any) => void = () => { // NOSONAR
    };
}
