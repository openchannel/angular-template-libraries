import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Password component. Represents an input field to enter password data. Also possibility to change some data attributes like 'placeholder'.
 *
 * @example <oc-password [placeholder]="Placeholder" [disabled]="true" [inputType]="text" [value]="'password'" >
 *
 */
@Component({
    selector: 'oc-password',
    templateUrl: './oc-password.component.html',
    styleUrls: ['./oc-password.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcPasswordComponent),
            multi: true,
        },
    ],
})
export class OcPasswordComponent implements ControlValueAccessor {
    /**
     * Default value for input field.
     */
    @Input() set value(val) {
        this.inputValue = val;
        this.onChange(this.inputValue);
    }
    /**
     * Set `placeholder` for input field
     */
    @Input() placeholder: string;

    /**
     * Set `disable` state for input.
     *
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * Type of the input. Can be `text` or `email`.
     *
     * @default 'text'
     */
    @Input() inputType: 'text' | 'email' = 'text';
    /**
     * Value of password input. Can be set up via `value` component input.
     */
    inputValue;

    onTouched = () => {};

    /**
     * Function that called after input model value was changed
     */
    changeModelVal(): void {
        this.onChange(this.inputValue);
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
    writeValue(obj: any): void {
        this.inputValue = obj;
    }

    private onChange: (value: any) => void = () => {};
}
